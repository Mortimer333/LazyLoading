class LazyLoading extends HTMLImageElement {
  constructor() {
    super();

    // when there is no support for IntersectionObserver then we do nothing and img will just load
    if ( ( 'IntersectionObserver' in window ) ) {

      this.observer   = false   ;
      this._lazy_src  = this.src;                       // saving correct url
      this.src        = ''      ;                       // removing src before parser will start downloading
      this._old_style = this.getAttribute('style');     // saving old styles

      // observer settings
      this.options = {
        root       : null ,
        rootMargin : '0px',
        threshold  : .1
      }

      this.setAttribute('style','padding-bottom:50%;'); // my try to represent ratio 1:2

      this.attachObserver();

    }

  }

  _updateRendering () { // required function }

  static get observedAttributes() { return ["lazy-src"]; }

  attributeChangedCallback( name, oldValue, newValue ) {
    this._lazy_src = newValue;
    this._updateRendering();
  }

  connectedCallback () {
    this.addEventListener( 'load', this.onImageLoaded.bind( this ) );
    this._updateRendering();
  }

  get lazy_src () {
    return this._lazy_src;
  }

  set lazy_src ( v ) {
    this.setAttribute( "src", v );
  }

  onImageLoaded () {
    this.setAttribute( 'style', this._old_style );
  }

  attachObserver () {
    if ( this.observer ) this.removeObserver();
    this.observer = new IntersectionObserver( this.handleIntersection.bind( this ), this.options );
    this.observer.observe( this );
  }

  handleIntersection ( entries, observer ) {
    entries.forEach( entry => {
      // if at least 10% of image is visible then load it
      if ( entry.intersectionRatio >= .1 ) {
        this.loadImage     ();
        this.removeObserver();
      }
    });
  }

  removeObserver() {
    this.observer.unobserve( this );
    this.observer = false;
  }

  loadImage () {
    this.src = this._lazy_src;
  }
}

customElements.define("lazy-img", LazyLoading, { extends:'img' } );
