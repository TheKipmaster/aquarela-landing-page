var flkty = new Flickity('.gallery', {
  autoPlay: true,
  wrapAround: true,
  imagesLoaded: true,
  lazyLoad: 2
});

window.addEventListener('load', (event) => {
  flkty.resize();
  console.log("resized");
});