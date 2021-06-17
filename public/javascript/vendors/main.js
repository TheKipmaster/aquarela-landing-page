var galleryElems = document.querySelectorAll('.gallery');

for ( var i=0, len = galleryElems.length; i < len; i++ ) {
  var galleryElem = galleryElems[i];
  new Flickity( galleryElem, {
    autoPlay: true,
    wrapAround: true,
    imagesLoaded: true,
    lazyLoad: 2
  });
}

// var flkty = new Flickity('.gallery', {
//   autoPlay: true,
//   wrapAround: true,
//   imagesLoaded: true,
//   lazyLoad: 2
// });

window.addEventListener('load', (event) => {
  flkty.resize();
  console.log("resized");
});