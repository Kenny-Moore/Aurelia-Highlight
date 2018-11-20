# Text Highlight Custom Attribute Plugin for Aurelia Apps 

Any element that contains text can use this attribute to select and add CSS classes or inline styles to substrings within the text content that match a query. 

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Using the Custom Element
The `highlight` binding has 5 bindable options:
 * `@bindable active;` The `active` property takes a `boolean` value and controls whether the highlighting logic is used     
 * `@bindable({ primaryProperty: true }) match;` The `match` property takes a `string` or `RegExp` value and is used to select the substring to be highlighted
 * `@bindable({ defaultBindingMode: bindingMode.twoWay }) matched;` The `matched` property takes a `boolean` and is updated to `true` when matching text is found
 * `@bindable css;` The `css` property takes a `string` value which is added as a css class around matching text 
 * `@bindable style;` The `style` property takes a `string` value which is added as an inline-style around matching text (if no css or style values are set then style is set to  `font-weight: bold;` by default)


### The Basics
Using the default option passing in a string to match
```javascript
//viewmodel
this.description = "this is example text content";
this.query = "example ";
```

```html
<!-- view -->
<span textcontent.bind="description" highlight.bind="query"></span>
```

```html
<!-- rendered html -->
<span textcontent.bind="description" highlight.bind="query">
    this is <span style="font-weight: bold;">example</span> text content 
</span>
```


### Using the bindable options 
```javascript
//viewmodel
this.description = "this is example text content";
this.query = "example ";
this.hasMatch = false;
```

```html
<!-- view -->
<span textcontent.bind="description" highlight="match.bind: query; css:'highlight'; matched.bind: hasMatch"></span>
<span>${hasMatch ? "The above text has matching content!" : "No Matching Text."}</span>
```

```html
<!-- rendered html -->
<span textcontent.bind="description" highlight.bind="query">
    this is <span class="highlight">example</span> text content 
</span>
<span>The above text has matching content!</span>
```
