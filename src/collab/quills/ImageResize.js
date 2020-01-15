import Quill from 'quill';
import { Resize } from './Resize';

const DefaultOptions = {
  modules: ['Resize'],
  overlayStyles: {
    position: 'absolute',
    boxSizing: 'border-box',
    border: '1px dashed #444',
  },
  handleStyles: {
    position: 'absolute',
    height: '12px',
    width: '12px',
    backgroundColor: 'white',
    border: '1px solid #777',
    boxSizing: 'border-box',
    opacity: '0.80',
  },
  displayStyles: {
    position: 'absolute',
    font: '12px/1.0 Arial, Helvetica, sans-serif',
    padding: '4px 8px',
    textAlign: 'center',
    backgroundColor: 'white',
    color: '#333',
    border: '1px solid #777',
    boxSizing: 'border-box',
    opacity: '0.80',
    cursor: 'default',
  },
  toolbarStyles: {
    position: 'absolute',
    top: '-12px',
    right: '0',
    left: '0',
    height: '0',
    minWidth: '100px',
    font: '12px/1.0 Arial, Helvetica, sans-serif',
    textAlign: 'center',
    color: '#333',
    boxSizing: 'border-box',
    cursor: 'default',
  },
  toolbarButtonStyles: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    background: 'white',
    border: '1px solid #999',
    verticalAlign: 'middle',
  },
  toolbarButtonSvgStyles: {
    fill: '#444',
    stroke: '#444',
    strokeWidth: '2',
  },
};

const knownModules = { Resize };

export class ImageResize {
  constructor(quill, options = {}) {
    // save the quill reference and options
    this.quill = quill;

    // Apply the options to our defaults, and stash them for later
    // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
    let moduleClasses = false;
    if (options.modules) {
      moduleClasses = options.modules.slice();
    }

    // Apply options to default options
    this.options = DefaultOptions;

    // (see above about moduleClasses)
    if (moduleClasses !== false) {
      this.options.modules = moduleClasses;
    }

    // disable native image resizing on firefox
    document.execCommand('enableObjectResizing', false, 'false');

    // respond to clicks inside the editor
    this.quill.root.addEventListener('click', this.handleClick, false);
    this.quill.root.addEventListener('mscontrolselect', this.handleClick, false); //IE 11 support
    this.quill.root.addEventListener('scroll', this.handleScroll, false);

    this.quill.root.parentNode.style.position =
      this.quill.root.parentNode.style.position || 'relative';

    // setup modules
    this.moduleClasses = this.options.modules;

    this.modules = [];
  }

  initializeModules = () => {
    this.removeModules();

    this.modules = this.moduleClasses.map(
      (ModuleClass) => new (knownModules[ModuleClass] || ModuleClass)(this),
    );

    this.modules.forEach((module) => {
      module.onCreate(this.options);
    });

    this.onUpdate();
  };

  onUpdate = () => {
    this.repositionElements();
    this.modules.forEach((module) => {
      module.onUpdate();
    });
  };

  removeModules = () => {
    this.modules.forEach((module) => {
      module.onDestroy();
    });

    this.modules = [];
  };

  handleClick = (evt) => {
    if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
      if (this.img === evt.target) {
        // we are already focused on this image
        return;
      }
      if (this.img) {
        // we were just focused on another image
        this.hide();
      }
      // clicked on an image inside the editor
      this.show(evt.target);
      evt.preventDefault(); //Prevent IE 11 drag handles appearing
    } else if (this.img) {
      // clicked on a non image
      this.hide();
    }
  };

  handleScroll = (evt) => {
    //Hide the overlay when the editor is scrolled,
    //otherwise image is no longer correctly aligned with overlay
    this.hide();
  };

  show = (img) => {
    // keep track of this img element
    this.img = img;

    this.showOverlay();

    this.initializeModules();
  };

  showOverlay = () => {
    if (this.overlay) {
      this.hideOverlay();
    }

    this.quill.setSelection(null);

    // prevent spurious text selection
    this.setUserSelect('none');

    // listen for the image being deleted or moved
    document.addEventListener('keyup', this.checkImage, true);
    this.quill.root.addEventListener('input', this.checkImage, true);

    // Create and add the overlay
    this.overlay = document.createElement('div');
    Object.assign(this.overlay.style, this.options.overlayStyles);

    this.quill.root.parentNode.appendChild(this.overlay);

    this.repositionElements();
  };

  hideOverlay = () => {
    if (!this.overlay) {
      return;
    }

    // Remove the overlay
    this.quill.root.parentNode.removeChild(this.overlay);
    this.overlay = undefined;

    // stop listening for image deletion or movement
    document.removeEventListener('keyup', this.checkImage);
    this.quill.root.removeEventListener('input', this.checkImage);

    // reset user-select
    this.setUserSelect('');
  };

  repositionElements = () => {
    if (!this.overlay || !this.img) {
      return;
    }

    // position the overlay over the image
    const parent = this.quill.root.parentNode;
    const imgRect = this.img.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
      top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
    });
  };

  hide = () => {
    this.hideOverlay();
    this.removeModules();
    this.img = undefined;
  };

  setUserSelect = (value) => {
    ['userSelect', 'mozUserSelect', 'webkitUserSelect', 'msUserSelect'].forEach((prop) => {
      // set on contenteditable element and <html>
      this.quill.root.style[prop] = value;
      document.documentElement.style[prop] = value;
    });
  };

  checkImage = (evt) => {
    if (this.img) {
      if (evt.keyCode == 46 || evt.keyCode == 8) {
        (window.Quill || Quill).find(this.img).deleteAt(0);
      }
      this.hide();
    }
  };
}

if (window.Quill) {
  //BEGIN allow image alignment styles
  const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

  const BaseImageFormat = window.Quill.import('formats/image');
  class ImageFormat extends BaseImageFormat {
    static formats(domNode) {
      return ImageFormatAttributesList.reduce(function(formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
    format(name, value) {
      if (ImageFormatAttributesList.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        super.format(name, value);
      }
    }
  }

  window.Quill.register(ImageFormat, true);
  //END allow image alignment styles

  //Add support for IE 11
  if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        if (source != null) {
          for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }

  window.Quill.register('modules/imageResize', ImageResize);
}
