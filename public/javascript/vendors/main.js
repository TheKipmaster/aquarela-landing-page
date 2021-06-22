const galleryElems = document.querySelectorAll('.gallery');

for (let i = 0, len = galleryElems.length; i < len; i++) {
  const galleryElem = galleryElems[i];
  new Flickity(galleryElem, {
    autoPlay: true,
    wrapAround: true,
    imagesLoaded: true,
    lazyLoad: 2
  });
}

document.querySelector('.sidebarMenuInner').addEventListener('click', (event) => {
  document.querySelector('#openSidebarMenu').checked = false;
});

window.addEventListener('load', (event) => {
  flkty.resize();
  console.log('resized');
});

document.querySelectorAll('#\\31, #\\32, #\\33').forEach((button) => {
  button.addEventListener('click', (event) => {
    // Static bits of link
    const linkTemplateHead = 'https://api.whatsapp.com/send?l=pt_br&phone=556191875504&text=Olá,%20meu%20nome%20é%20';
    const linkTemplateTail = '%20e%20gostaria%20de%20uma%20avaliação%20para%20';

    // Id of form user clicked
    const formId = event.target.id;
    // Values of relevant fields formatted by replacing spaces with '%20'
    const treatment = document.querySelector(`#treatment${formId}`).value.replace(/\s/g, '%20');
    const nome = document.querySelector(`#name${formId}`).value.replace(/\s/gi, '%20');

    // Complete link
    const link = `${linkTemplateHead}${nome}${linkTemplateTail}${treatment}`;

    // Redirects to link on click
    window.location.href = link;
  });
});
