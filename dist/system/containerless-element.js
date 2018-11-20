'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var processContent, TargetInstruction, customElement, containerless, ViewSlot, Container, inject, noView, _dec, _dec2, _dec3, _class, containerlessElement;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function compileContentInstruction(compiler, resources, node, instruction) {
    var fragment = document.createDocumentFragment();


    while (node.firstChild) {
      fragment.appendChild(node.firstChild);
    }

    instruction.contentFactory = compiler.compile(fragment, resources);
  }
  return {
    setters: [function (_aureliaFramework) {
      processContent = _aureliaFramework.processContent;
      TargetInstruction = _aureliaFramework.TargetInstruction;
      customElement = _aureliaFramework.customElement;
      containerless = _aureliaFramework.containerless;
      ViewSlot = _aureliaFramework.ViewSlot;
      Container = _aureliaFramework.Container;
      inject = _aureliaFramework.inject;
      noView = _aureliaFramework.noView;
    }],
    execute: function () {
      _export('containerlessElement', containerlessElement = (_dec = customElement('void'), _dec2 = processContent(compileContentInstruction), _dec3 = inject(ViewSlot, Container, TargetInstruction), _dec(_class = _dec2(_class = containerless(_class = noView(_class = _dec3(_class = function () {
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
      }()) || _class) || _class) || _class) || _class) || _class));

      _export('containerlessElement', containerlessElement);
    }
  };
});