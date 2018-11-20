import {inject, BindingEngine, customAttribute, bindable, bindingMode, TargetInstruction} from 'aurelia-framework';

@customAttribute('highlight')
@inject(Element, BindingEngine, TargetInstruction)
export class Highlight {
  @bindable active;
  @bindable({ primaryProperty: true }) match;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) matched;
  @bindable css;
  @bindable style;

  constructor(element, BindingEngine, TargetInstruction){
    this.element = element;
    this.bindingEngine = BindingEngine;
    this.bindingExpression = TargetInstruction.expressions.find((b)=> {
      return b.targetProperty === 'textContent';
    });
  }
  
  activeChanged(newValue, oldValue){
    this.update();
  }
  
  matchChanged(newValue, oldValue){
    this.update();
  }

  bind(binding, source) {
    let bindingExpression = this.bindingExpression;
    if (bindingExpression) {
      this.textcontentSub = this.bindingEngine.propertyObserver(binding, bindingExpression.sourceExpression.name).subscribe((value)=> {
        this.update(value);
      });
    }
    this.update();
  }

  unbind(binding, source) {
    if (this.textcontentSub) {
      this.textcontentSub.dispose();
    }
  }

  created(owningView, view) {
    this.view = view || owningView;
  }

  get text() {
    let bindingExpression = this.bindingExpression;
    if (bindingExpression) {
      return bindingExpression.sourceExpression.evaluate(this.view, bindingExpression.lookupFunctions);
    } else if (this.element) {
      return this.element.innerHTML;
    } else {
      return "";
    }
  }
  update(text){
    if(this.active !== false) {
      text = text || this.text
      let regex;
      let match = this.match;
      if (match instanceof RegExp) {
        regex = match;
      } else {      
        let matchString = match;

        matchString = matchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        matchString = matchString.replace(/[a-zA-Z0-9\?\&\=\%\#]+s\=(\w+)(\&.*)?/, "$1");
        matchString = matchString.replace(/\%20|\+/g, "\|");

        regex = new RegExp("(" + matchString + ")(?=[^>]*(<|$))", "ig");
      }
      let highlightCss = this.css;
      let highlightStyle = this.style;
      let highlightedText;

      highlightedText = highlightText(text, regex, highlightCss, highlightStyle);
      let isTextHighlighted = highlightedText !== false;
      if (typeof this.matched !== "undefined") {
        this.matched = isTextHighlighted;
      }
      if (isTextHighlighted) {
        this.element.innerHTML = highlightedText;
      }
    }
  }
}

function highlightText(text, regex, css, style) {
  var tempText;
  var attrText;
  var matched;

  matched = false;
  tempText = text;

  if (typeof css === "string" && css.length > 0) {
    attrText = ' class="' + css + '"';
  }
  if (typeof style === "string" && style.length > 0) {
    attrText = ' style="' + css + '"';
  }
  if (typeof attrText === "string" && attrText.length > 0) { } else {
    attrText = ' style="font-weight: bold;"';
  }
  // Do regex replace
  // Inject span with class and styles set with the binding

  text = tempText.replace(regex, function (match, p1, p2, offset, stringArg) {//p1, p2 Corresponds to $1, $2
    var returnReplace;
    if (typeof match === "string" && match.length > 0) {
      matched = true;
      returnReplace = '<span' + attrText + '>' + p1 + '</span>' + p2;
    } else {
      returnReplace = p1 + p2;
    }
    return returnReplace;
  });

  return matched ? text : false; //return false if nothing was changed
}
