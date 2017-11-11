# Affixes an element on the screen based on a relative element
Unlike other plugins, this Vue2 component will make it easy to affix any element.

 - Affixes an element based on a relative element as you scroll
 - Only needs 3 super simple configuration steps
 - Dispatches events
 - No dependencies
 - Vue2
 - Uses pure JS!

Make sure to check the <a href="https://eddiemf.github.io/vue-affix/examples/example-1.html" target="_blank">demo</a> to see how it works!

## Installation
Install via npm and use it as a vue plugin in your app.

```bash
npm install -S vue-affix
```
```js
var Affix = require('vue-affix');
Vue.use(Affix);
```

## Usage
 - Wrap the element in an `<affix>` tag
 - Set an element selector in a `relative-element-selector` property
 - Set a width value for the `.vue-affix` class in your CSS (that is the element which the affix will be applied to)

Example below:

```html
<affix class="sidebar-menu" relative-element-selector="#example-content">
  <a href="#markup-1">Markup 1</a>
  <a href="#markup-2">Markup 2</a>
  <a href="#markup-3">Markup 3</a>
</affix>
<section id="example-content">
  <p>This is the #example-content section which the sidebar will be relatively affixed!</p>
</section>
```

This will make the `.sidebar-menu` element stay fixed while in the `#example-content` element viewport. Simple as that.

## How the plugin works
It works similar to Bootstrap's Affix plugin, it will add 3 classes (`.affix-top`, `.affix` and `.affix-bottom`) to the affixed element while you scroll the page.

Unlike Bootstrap's Affix, all you need to do in vue-affix is set a width value for the class `.vue-affix` (that's because when the `position: fixed` property is applied, it will lose it's relative width value) and add an element in the `relative-element-selector` property.

vue-affix will calculate when to start/stop affixing relatively to the element you provide in the `relative-element-selector` property, that means you don't have to do any calculation, just set the relative element and that will be all done automatically.

You can also set an offset object with the top and bottom values that will be used as a threshold to start/stop affixing the element, but that is optional.

## Configuration
The only configuration you need to do in CSS is setting a width for the `.vue-affix` class, the rest will be applied through props as in the example below:
``` html
<affix class="sidebar-menu" relative-element-selector="#example-content" :offset="{ top: 40, bottom: 40 }">
  <a href="#markup-1">Markup 1</a>
  <a href="#markup-2">Markup 2</a>
  <a href="#markup-3">Markup 3</a>
</affix>
```

### Props
These are all the props you can pass to the component:
``` javascript
/**
 * The relative element selector string. The relative element is
 * the element you want your affix to be related to, as it will
 * not be related to the window. The element will be affixed when
 * the window reaches the relative element.
 *
 * @example '#contact'
 * @type {String}
 */
relativeElementSelector: {
  type: String,
  required: true
},

/**
 * This is the offset margin between the top/bottom of the window
 * before the affix is applied.
 *
 * @type {Object}
 */
offset: {
  type: Object,
  default: () => {
    return {
      top: 40,
      bottom: 40
    }
  }
},

/**
 * Checks if the plugin should be enabled/disabled based
 * on true/false, good for mobile when you need to disable it.
 *
 * @type {Boolean}
 */
enabled: {
  type: Boolean,
  default: true
},

/**
 * Sets if the affix should be 'scrollable' when it is
 * taller than the viewport or if it should always be
 * affixed to the top until it reaches the end of the
 * relative element. Check the demo to understand better.
 *
 * @type {Boolean}
 */
scrollAffix: {
  type: Boolean,
  default: false
}
```

## Events
vue-affix will dispatch 3 different events if `scroll-affix` prop is set to false:
 - `affixtop` will be dispatched when the `.affix-top` class is applied, that is when you scroll above the relative element.
 - `affix` will be dispatched when the `.affix` class is applied, that is while you scroll inside the relative element.
 - `affixbottom` will be dispatched when the `.affix-bottom` class is applied, that is when you scroll below the relative element.

If `scroll-affix` prop is set to true, it will fire 5 different events:
 - `scrollaffixscrolling` will be dispatched when the affixed element is being scrolled (not fixed).
 - `scrollaffixup` will be dispatched when the affixed element gets fixed to the top of the screen.
 - `scrollaffixdown` will be dispatched when the affixed element gets fixed to the bottom of the screen.
 - `scrollaffixtop` will be dispatched when the affixed element reaches the top of the relative element.
 - `scrollaffixbottom` will be dispatched when the affixed element reaches the bottom of the relative element.

Those can be catched as I show in the example below:
```html
<affix class="sidebar-menu" relative-element-selector="#example-content" v-on:affixbottom="yourFunction()">
  <a href="#markup-1">Markup 1</a>
  <a href="#markup-2">Markup 2</a>
  <a href="#markup-3">Markup 3</a>
</affix>
```
