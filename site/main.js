document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===button));const filter=button.dataset.filter;document.querySelectorAll('.tiles > [data-category], #collection > section[data-category]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter)}));
const translations={
es:{browse:"Ver colección",eyebrow:"LA SELECCIÓN · ROPA Y BELLEZA",headline:"Encuentra algo<br><em>que te encante.</em>",intro:"Descubre ropa, productos de belleza y accesorios. ¿Te gusta algo? Contáctanos para consultar disponibilidad.",explore:"Explorar colección <span>↗</span>",shopBy:"COMPRA POR CATEGORÍA",collection:"La colección",selection:"Explora nuestra selección de moda y belleza.",all:"Todos",clothing:"Ropa",beauty:"Belleza",accessories:"Accesorios",fashion:"MODA",clothingTitle:"Ropa",clothingDesc:"Camisas, vestidos, pantalones y más",beautyLabel:"BELLEZA",beautyTitle:"Productos de belleza",beautyDesc:"Maquillaje, cuidado de la piel y personal",details:"LOS DETALLES",accessoriesTitle:"Accesorios",accessoriesDesc:"Bolsos, joyería y complementos",coming:"PRÓXIMAMENTE",adding:"Estamos agregando productos.",preview:"Esta es una vista previa de la tienda. Pronto aparecerán fotos, precios y disponibilidad de cada producto.",footerDesc:"Moda, belleza y accesorios seleccionados.",footerContact:"Próximamente: contacto y consultas sobre productos.",brand:"ROPA <span>Y BELLEZA</span>",art:"PRODUCTOS SELECCIONADOS<br>ESTILO PARA CADA DÍA"},
en:{browse:"Browse collection",eyebrow:"THE EDIT · CLOTHING & BEAUTY",headline:"Find something<br><em>you love.</em>",intro:"Discover clothing, beauty essentials and accessories. See something you like? Get in touch to ask about availability.",explore:"Explore collection <span>↗</span>",shopBy:"SHOP BY CATEGORY",collection:"The collection",selection:"Browse our selection of fashion and beauty finds.",all:"All products",clothing:"Clothing",beauty:"Beauty",accessories:"Accessories",fashion:"FASHION",clothingTitle:"Clothing",clothingDesc:"Shirts, dresses, pants and more",beautyLabel:"BEAUTY",beautyTitle:"Beauty essentials",beautyDesc:"Makeup, skincare and personal care",details:"THE DETAILS",accessoriesTitle:"Accessories",accessoriesDesc:"Bags, jewelry and everyday extras",coming:"COMING SOON",adding:"Products are being added.",preview:"This is a storefront preview. Individual product photos, prices and availability will appear here once inventory is published.",footerDesc:"Curated fashion, beauty and accessories.",footerContact:"Contact details and product inquiries coming soon.",brand:"CLOTHING <span>& BEAUTY</span>",art:"CURATED FINDS<br>EVERYDAY STYLE"}};
const bindings={brand:'.brand',art:'.art-label',eyebrow:'.hero .eyebrow',headline:'.hero h1',intro:'.hero-inner>p:not(.eyebrow)',explore:'.cta',shopBy:'.section-heading .eyebrow',collection:'.section-heading h2',selection:'.section-heading>p',all:'[data-filter="all"]',clothing:'[data-filter="clothing"]',beauty:'[data-filter="beauty"]',accessories:'[data-filter="accessories"]',fashion:'.tile[data-category="clothing"] .label',clothingTitle:'.tile[data-category="clothing"] h3',clothingDesc:'.tile[data-category="clothing"] p',beautyLabel:'.tile[data-category="beauty"] .label',beautyTitle:'.beauty-category-link span',beautyDesc:'.tile[data-category="beauty"] p',details:'.tile[data-category="accessories"] .label',accessoriesTitle:'.tile[data-category="accessories"] h3',accessoriesDesc:'.tile[data-category="accessories"] p',coming:'.notice .eyebrow',adding:'.notice h2',preview:'.notice p:last-child',footerDesc:'footer div p',footerContact:'footer>p',browse:'[data-i18n="browse"]'};
const caseCopy = {
  es: {
    name: 'Estuche de maquillaje Lancôme', condition: 'Nuevo, sin uso',
    description: 'Estuche negro de exterior acanalado con asa, cierre y una rosa de tela en el frente. El interior tiene forro rojo y un bolsillo fruncido. Se vende vacío.',
    price: 'US$26', inquiry: 'Solicitar compra',
    photoNote: 'Fotos editadas con IA a partir de las imágenes del estuche.',
    collage: 'Collage', front: 'Frente', top: 'Desde arriba', interior: 'Interior y etiqueta', views: 'Vistas del estuche',
    alt: {
      collage: 'Estuche Lancôme de frente, desde arriba y con detalle de la etiqueta interior',
      front: 'Estuche Lancôme cerrado, con cierre y rosa de tela en el frente',
      top: 'Vista superior de la tapa acanalada y el asa del estuche Lancôme',
      interior: 'Forro rojo, bolsillo fruncido y etiqueta Lancôme Paris dentro del estuche'
    }
  },
  en: {
    name: 'Lancôme Makeup Case', condition: 'New, unused',
    description: 'Black ribbed makeup case with a carrying handle, zip closure and a fabric rose on the front. The red lining has a gathered pocket. Sold empty.',
    price: 'US$26', inquiry: 'Request to buy',
    photoNote: 'Catalog photos edited with AI from photos of this case.',
    collage: 'Collage', front: 'Front', top: 'From above', interior: 'Interior and label', views: 'Case views',
    alt: {
      collage: 'Lancôme case from the front and above with a close-up of the interior brand label',
      front: 'Closed Lancôme case with zipper and fabric rose on the front',
      top: 'Overhead view of the ribbed lid and handle of the Lancôme case',
      interior: 'Red lining, gathered pocket and Lancôme Paris label inside the case'
    }
  }
};
const redTrimCopy = {
  es: {
    name: 'Estuche Lancôme con ribete rojo',
    price: 'US$28',
    description: 'Estuche negro con motivos tejidos, ribete rojo y dos tiradores en forma de torre Eiffel. El interior rojo tiene un bolsillo fruncido y una etiqueta que dice «Designed Exclusively For Lancôme».',
    base: 'Base', reverse: 'Reverso',
    alt: {collage: 'Estuche con ribete rojo, tiradores de torre Eiffel y etiqueta interior', front: 'Frente con cierre rojo continuo', top: 'Tapa estampada con asa negra y costuras rojas', interior: 'Forro rojo, bolsillo y etiqueta diseñada para Lancôme', base: 'Base estampada con borde rojo', reverse: 'Reverso con dos tiradores de torre Eiffel'}
  },
  en: {
    name: 'Lancôme Red-Trim Makeup Case',
    price: 'US$28',
    description: 'Black patterned case with red piping and two Eiffel Tower zipper pulls. The red lining has a gathered pocket and a label reading “Designed Exclusively For Lancôme”.',
    base: 'Base', reverse: 'Back',
    alt: {collage: 'Red-trim case, Eiffel Tower pulls and interior brand label', front: 'Front with continuous red zipper', top: 'Patterned lid with black handle and red stitching', interior: 'Red lining, pocket and Designed Exclusively For Lancôme label', base: 'Patterned base with red piping', reverse: 'Back with two Eiffel Tower zipper pulls'}
  }
};
const caseSections = document.querySelectorAll('.beauty-product');
function galleryCopy(section, language) {
  return section.id === 'lancome-ribete-rojo' ? {...caseCopy[language], ...redTrimCopy[language]} : caseCopy[language];
}
function translateCase(language) {
  for (const section of caseSections) {
    const copy = galleryCopy(section, language);
    section.querySelector('[data-step="-1"]').ariaLabel = language === 'es' ? 'Foto anterior' : 'Previous photo';
    section.querySelector('[data-step="1"]').ariaLabel = language === 'es' ? 'Foto siguiente' : 'Next photo';
    section.querySelectorAll('[data-case-copy]').forEach(el => { el.textContent = copy[el.dataset.caseCopy]; });
    section.querySelector('.case-views').setAttribute('aria-label', copy.views);
    const current = section.querySelector('[data-case-view][aria-current]');
    section.querySelector('.case-gallery img').alt = copy.alt[current.dataset.caseView];
  }
}
for (const section of caseSections) {
  const links = Array.from(section.querySelectorAll('[data-case-view]'));
  function advance(step) {
    const index = links.findIndex(link => link.hasAttribute('aria-current'));
    links[(index + step + links.length) % links.length].click();
  }
  section.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => advance(Number(button.dataset.step)));
  });
  const photo = section.querySelector('.case-stage > a');
  let start;
  photo.addEventListener('touchstart', event => {
    start = event.touches.length === 1 ? event.touches[0] : null;
  }, {passive: true});
  photo.addEventListener('touchcancel', () => { start = null; });
  photo.addEventListener('touchend', event => {
    const origin = start;
    start = null;
    if (!origin || event.touches.length) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - origin.clientX;
    if (Math.abs(dx) < 40 || Math.abs(dx) < 1.3 * Math.abs(end.clientY - origin.clientY)) return;
    event.preventDefault();
    advance(dx < 0 ? 1 : -1);
  }, {passive: false});
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const image = section.querySelector('.case-gallery img');
    image.src = link.href;
    image.alt = galleryCopy(section, lang).alt[link.dataset.caseView];
    image.parentElement.href = link.href;
    links.forEach(view => view.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'true');
  }));
}
function setLanguage(lang){translateCase(lang);const strings=translations[lang];for(const [key,selector] of Object.entries(bindings)){const el=document.querySelector(selector);if(el)el.innerHTML=strings[key]}document.documentElement.lang=lang;document.querySelector('#language-toggle').textContent=lang==='es'?'EN':'ES';document.querySelector('#language-toggle').setAttribute('aria-label',lang==='es'?'Switch language to English':'Cambiar idioma a español');try{localStorage.setItem('store-language',lang)}catch{}}
let lang='es';try{lang=localStorage.getItem('store-language')||'es'}catch{}if(!translations[lang])lang='es';setLanguage(lang);document.querySelector('#language-toggle').addEventListener('click',()=>{lang=lang==='es'?'en':'es';setLanguage(lang)});
