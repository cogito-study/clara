import Quill from "quill";
import Module from 'quill/core/module';
import Delta from 'quill-delta';

let Parchment = Quill.import("parchment")
let Inline = Quill.import("blots/inline")

class Mark extends Inline {
    static create(value) {
      let node = super.create(value);
      node.setAttribute('data-mark-id', value);
      node.setAttribute('class', 'ql-mark ql-mark-' + value);
      return node;
    }

    static formats(domNode) {
      return domNode.getAttribute('data-mark-id');
    }

}
Mark.blotName = 'mark';
Mark.tagName = 'span';

class TextMarking extends Module {
    constructor(quill, options) {
        super(quill, options);

        this.marks = {}

        Quill.register(Mark, true);

        this.quill.on(Quill.events.EDITOR_CHANGE, (eventName, delta, oldDelta, source) => {
            if (eventName === Quill.events.TEXT_CHANGE && source === Quill.sources.USER) {
                delta.ops.forEach(function(op) {
                    // Remove any text marks so it doesn't appear on the Delta
                    if (op.attributes && op.attributes.mark) {
                        delete op.attributes.mark
                    }
                });
            }
        });
    }

    mark(markId, range = this.quill.selection.savedRange) {
        if (!range) {
            return
        }

        let curSelection = this.quill.getSelection(),
            delta = new Delta().retain(range.index).retain(range.length, {mark: markId})

        this.marks[markId] = true
        this.quill.updateContents(delta, Quill.sources.SILENT);
        this.quill.setSelection(curSelection)

        // Return the markId given or generated so the developer has the markId to call clear() with
        return markId
    }

    find(markId = null) {
        if (!markId) {
            return null
        }

        let markElem = this.quill.scroll.domNode.querySelector('.ql-mark-' + markId)

        if (!markElem) {
            return null
        }

        let markBlot = Parchment.find(markElem)

        if (!markBlot) {
            return null
        }

        return {
            index: markBlot.offset(this.quill.scroll),
            length: markBlot.length()
        }
    }

    clear(markId = null) {
        if (!markId) {
            return false
        }

        let curMark = this.find(markId);

        if (!curMark) {
            return false
        }

        let curSelection = this.quill.getSelection(),
            delta = new Delta().retain(curMark.index).retain(curMark.length, { mark: false });

        this.quill.updateContents(delta, Quill.sources.SILENT);
        this.quill.setSelection(curSelection)
        delete this.marks[markId]
    }

    clearAll() {
        Object.keys(this.marks).forEach(function(markId) {
            this.clear(markId)
        }.bind(this))
    }
}

TextMarking.DEFAULTS = {
    enabled: true
};

Quill.register("modules/text-marking", TextMarking)
Quill.import("modules/text-marking")


let options = {
    theme: "snow",
    debug: "warn",
    modules: {
        toolbar: '#toolbar',
        "text-marking": true,
        keyboard: {
            bindings: {
                // backspace: {
                //     key: 'backspace',
                //     collapsed: true,
                //     handler: function (range, context) {
                //         this.quill.getModule("text-marking").mark("deleted", { index: range.index - 1, length: 1 });
                //         this.quill.setSelection(range.index - 1, 0, Quill.sources.SILENT)
                //         return false;
                //     }
                // },
                // backspaceSelection: {
                //     key: 'backspace',
                //     collapsed: false,
                //     handler: function (range, context) {
                //         this.quill.getModule("text-marking").mark("deleted", range);
                //         return false;
                //     }
                // }
            }
        }
    },

};

const createEditor = () => new Quill(".collab-quill-editor", options);

const configureEditor = (editor) => {
    editor.on('text-change', function (delta, oldDelta, source) {
        const selection = editor.getSelection()
        selection && editor.getModule("text-marking").mark('added', {index: selection.index - 1, length: 1})
    });
    editor.on('selection-change', function(range, oldRange, source) {
    console.log("selection-change")
    });
}

export const createQuillEditor = () => {
    const editor = createEditor()
    configureEditor(editor);
    return editor;
}