'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerlessElement = undefined;

var _dec, _dec2, _dec3, _class;

var _aureliaFramework = require('aurelia-framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var containerlessElement = exports.containerlessElement = (_dec = (0, _aureliaFramework.customElement)('void'), _dec2 = (0, _aureliaFramework.processContent)(compileContentInstruction), _dec3 = (0, _aureliaFramework.inject)(_aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.TargetInstruction), _dec(_class = _dec2(_class = (0, _aureliaFramework.containerless)(_class = (0, _aureliaFramework.noView)(_class = _dec3(_class = function () {
  function containerlessElement(ViewSlot, Container, TargetInstruction) {
    _classCallCheck(this, containerlessElement);

    this.viewSlot = ViewSlot;
    this.container = Container;
    this.contentFactory = TargetInstruction.elementInstruction.contentFactory;
  }

  containerlessElement.prototype.created = function created(parent, view) {
    this.parent = parent;
    this.view = view;
  };

  containerlessElement.prototype.bind = function bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.render();
    if (this.view && this.isActive && this.isBound) {
      this.view.bind(this.bindingContext, this.overrideContext);
    }
  };

  containerlessElement.prototype.unbind = function unbind(bindingContext, overrideContext) {
    if (this.view) {
      this.view.unbind();
    }
  };

  containerlessElement.prototype.attached = function attached() {
    this.viewSlot.attached();
  };

  containerlessElement.prototype.render = function render() {
    this.view = this.contentFactory.create(this.container);
    this.viewSlot.removeAll();
    this.viewSlot.add(this.view);
  };

  return containerlessElement;
}()) || _class) || _class) || _class) || _class) || _class);


function compileContentInstruction(compiler, resources, node, instruction) {
  var fragment = document.createDocumentFragment();


  while (node.firstChild) {
    fragment.appendChild(node.firstChild);
  }

  instruction.contentFactory = compiler.compile(fragment, resources);
}