import Quill, { Sources } from 'quill';
import Delta from 'quill-delta';
import Module from 'quill/core/module';

const Parchment = Quill.import('parchment');
const Inline = Quill.import('blots/inline');

class Mark extends Inline {
  static create(value: string) {
    const node = super.create(value);
    node.setAttribute('data-mark-id', value);
    node.setAttribute('class', 'ql-mark ql-mark-' + value);
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.getAttribute('data-mark-id');
  }
}
Mark.blotName = 'mark';
Mark.tagName = 'span';

export class TextMarking extends Module {
  marks: Record<string, boolean>;
  quill: Quill;
  static DEFAULTS: object;

  constructor(quill: Quill, options: object) {
    super(quill, options);
    this.quill = quill;
    this.marks = {};

    Quill.register(Mark, true);

    this.quill.on(
      'editor-change',
      (eventName: 'text-change', delta: Delta, _oldState: Delta, source: Sources) => {
        if (eventName === 'text-change' && source === 'user') {
          delta.ops.forEach(function(op) {
            delete op?.attributes?.mark;
          });
        }
      },
    );
  }

  mark(markId, range = this.quill.getSelection()) {
    if (!range) {
      return;
    }

    const curSelection = this.quill.getSelection();
    const delta = new Delta().retain(range.index).retain(range.length, { mark: markId });

    this.marks[markId] = true;
    this.quill.updateContents(delta, 'silent');
    if (curSelection) {
      this.quill.setSelection(curSelection);
    }

    // Return the markId given or generated so the developer has the markId to call clear() with
    return markId;
  }

  find(markId: string) {
    if (!markId) {
      return null;
    }

    const markElem = this.quill.root.querySelector('.ql-mark-' + markId);

    if (!markElem) {
      return null;
    }

    const markBlot = Parchment.find(markElem);

    if (!markBlot) {
      return null;
    }

    return {
      index: markBlot.offset(this.quill.scroll),
      length: markBlot.length(),
    };
  }

  clear(markId: string) {
    if (!markId) {
      return false;
    }

    const curMark = this.find(markId);

    if (!curMark) {
      return false;
    }

    const curSelection = this.quill.getSelection(),
      delta = new Delta().retain(curMark.index).retain(curMark.length, { mark: false });

    this.quill.updateContents(delta, 'silent');
    if (curSelection) {
      this.quill.setSelection(curSelection);
    }
    delete this.marks[markId];
    return true;
  }

  clearAll() {
    Object.keys(this.marks).forEach((markId) => this.clear(markId));
  }
}

TextMarking.DEFAULTS = {
  enabled: true,
};
