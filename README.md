# LazyLoading

Normal library for image lazy loading based on observers.

# Usage

As this library extends `HTMLImageElement` you have to define `<img>` as an instance of extension `LazyLoading` by adding `is='lazy-img'` as an attribute to `<img>`.

```html
<img src='./img.png' is='lazy-img'>
```

The class will then remove `src` and add it back when image is visible at least 10% by calling its observer. Image constructor attaches observer to it, and is removed when the image has started loading. 

For better support between browsers I recommend this polyfill - [custom-elements](https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements)
