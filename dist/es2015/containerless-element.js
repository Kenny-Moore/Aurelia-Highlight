var _dec, _dec2, _dec3, _class;

import { processContent, TargetInstruction, customElement, containerless, ViewSlot, Container, inject, noView } from 'aurelia-framework';

export let containerlessElement = (_dec = customElement('void'), _dec2 = processContent(compileContentInstruction), _dec3 = inject(ViewSlot, Container, TargetInstruction), _dec(_class = _dec2(_class = containerless(_class = noView(_class = _dec3(_class = class containerlessElement {

  constructor(ViewSlot, Container, TargetInstruction) {
    this.viewSlot = ViewSlot;
    this.container = Container;
    this.contentFactory = TargetInstruction.elementInstruction.contentFactory;
  }

  created(parent, view) {
    this.parent = parent;
    this.view = view;
  }

  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    this.render();
    if (this.view && this.isActive && this.isBound) {
      this.view.bind(this.bindingContext, this.overrideContext);
    }
  }

  unbind(bindingContext, overrideContext) {
    if (this.view) {
      this.view.unbind();
    }
  }

  attached() {
    this.viewSlot.attached();
  }

  render() {
    this.view = this.contentFactory.create(this.container);
    this.viewSlot.removeAll();
    this.viewSlot.add(this.view);
  }
}) || _class) || _class) || _class) || _class) || _class);

function compileContentInstruction(compiler, resources, node, instruction) {
  let fragment = document.createDocumentFragment();


  while (node.firstChild) {
    fragment.appendChild(node.firstChild);
  }

  instruction.contentFactory = compiler.compile(fragment, resources);
}