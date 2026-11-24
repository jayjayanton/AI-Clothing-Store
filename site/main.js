const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  document.querySelectorAll('#collection > [data-category]').forEach(section => {
    section.hidden = button.dataset.filter !== 'all' && section.dataset.category !== button.dataset.filter;
  });
}));
document.querySelector('#mens-nav').addEventListener('click', () => {
  document.querySelector('[data-filter="men"]').click();
});
document.querySelector('#current-collection').addEventListener('click', () => {
  const all = document.querySelector('[data-filter="all"]');
  all.click();
  all.focus({preventScroll: true});
});
const translations = {
  "es": {
    "browse": "Colección",
    "how": "Cómo comprar",
    "intro": "Moda, fragancias y accesorios nuevos. Hay una unidad de cada artículo, salvo el estuche Lancôme con ribete rojo, del que tenemos dos.",
    "headline": "Moda y",
    "accent": "belleza.",
    "explore": "Explorar la colección",
    "feature": "Top de lentejuelas 2b bebe y estuche Lancôme",
    "all": "Todo",
    "clothing": "Mujer",
    "men": "Hombre",
    "menswear": "Ropa de hombre",
    "mensSoon": "Estamos preparando la primera selección de ropa de hombre.",
    "beauty": "Belleza",
    "wear": "Ropa de mujer",
    "garmentStock": "Nueva · 1 disponible",
    "cases": "Belleza y accesorios",
    "allStyles": "Todas",
    "tees": "Camisetas",
    "skirts": "Faldas",
    "note": "Fotografías de catálogo editadas con IA a partir de las prendas originales.",
    "howText": "Abre la pieza que te interesa y selecciona «Solicitar compra». Copia la solicitud para compartirla con la tienda. El precio final y la disponibilidad se confirman antes del pago.",
    "back": "Volver a la colección",
    "importer": "Importador de imágenes",
    "catalog": "Catálogo",
    "soon": "Próximamente",
    "current": "Ver la colección disponible",
    "beautyRange": "Splash corporales de Victoria’s Secret, bálsamos, brillos labiales, maquillaje y estuches Lancôme."
  },
  "en": {
    "browse": "Collection",
    "how": "How to buy",
    "intro": "New clothing, fragrance and accessories. Each item is available as a single piece, except for the red-trim Lancôme case. We have two.",
    "headline": "Fashion &",
    "accent": "beauty.",
    "explore": "Explore the collection",
    "feature": "2b bebe sequin top and Lancôme makeup case",
    "all": "All",
    "clothing": "Women",
    "men": "Men",
    "menswear": "Men’s clothing",
    "mensSoon": "Our first selection of menswear is in the works.",
    "beauty": "Beauty",
    "wear": "Women’s clothing",
    "garmentStock": "New · 1 available",
    "cases": "Beauty & accessories",
    "allStyles": "All",
    "tees": "T-shirts",
    "skirts": "Skirts",
    "note": "Catalog photos edited with AI from photographs of the garments.",
    "howText": "Open an item and select “Request to buy.” Copy the request to share it with the shop. Final price and availability are confirmed before payment.",
    "back": "Back to collection",
    "importer": "Image importer",
    "catalog": "Catalog",
    "soon": "Coming soon",
    "current": "Browse the current collection",
    "beautyRange": "Victoria’s Secret body mists, lip balms, and Lancôme lip glosses, makeup and cases."
  }
};
const caseCopy = {
  es: {
    name: 'Estuche de maquillaje Lancôme', condition: 'Nuevo · 1 disponible',
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
    name: 'Lancôme Makeup Case', condition: 'New · 1 available',
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
    name: 'Estuche Lancôme con ribete rojo', condition: 'Nuevo · 2 disponibles',
    price: 'US$28',
    description: 'Estuche negro con motivos tejidos, ribete rojo y dos tiradores en forma de torre Eiffel. El interior rojo tiene un bolsillo fruncido y una etiqueta que dice «Designed Exclusively For Lancôme».',
    base: 'Base', reverse: 'Reverso',
    alt: {collage: 'Estuche con ribete rojo, tiradores de torre Eiffel y etiqueta interior', front: 'Frente con cierre rojo continuo', top: 'Tapa estampada con asa negra y costuras rojas', interior: 'Forro rojo, bolsillo y etiqueta diseñada para Lancôme', base: 'Base estampada con borde rojo', reverse: 'Reverso con dos tiradores de torre Eiffel'}
  },
  en: {
    name: 'Lancôme Red-Trim Makeup Case', condition: 'New · 2 available',
    price: 'US$28',
    description: 'Black patterned case with red piping and two Eiffel Tower zipper pulls. The red lining has a gathered pocket and a label reading “Designed Exclusively For Lancôme”.',
    base: 'Base', reverse: 'Back',
    alt: {collage: 'Red-trim case, Eiffel Tower pulls and interior brand label', front: 'Front with continuous red zipper', top: 'Patterned lid with black handle and red stitching', interior: 'Red lining, pocket and Designed Exclusively For Lancôme label', base: 'Patterned base with red piping', reverse: 'Back with two Eiffel Tower zipper pulls'}
  }
};
const cosmeticsCopy = {
  'lancome-set-maquillaje': {
    es: {
      name: 'Set de maquillaje Lancôme de 2 piezas',
      condition: 'Nuevo, sin uso · 1 set',
      description: 'Incluye una paleta de cuatro sombras y un dúo para mejillas. Los estuches tienen leves marcas superficiales. La paleta de sombras se entrega sin brocha ni aplicador. El precio ya refleja ese detalle.',
      price: 'US$35',
      photoNote: 'Galería editada con IA a partir de fotos del set. El detalle original muestra el compartimento sin aplicador.',
      collage: 'Set abierto', front: 'Estuches cerrados', angle: 'Vista en ángulo', original: 'Detalle original',
      alt: {
        collage: 'Ambos compactos Lancôme abiertos con cuatro sombras y dos tonos para mejillas',
        front: 'Dos compactos Lancôme negros cerrados con el emblema de la rosa',
        angle: 'Vista en ángulo de los dos compactos abiertos',
        original: 'Foto original de las cuatro sombras y el compartimento vacío del aplicador'
      }
    },
    en: {
      name: 'Lancôme 2-Piece Makeup Set',
      condition: 'New, unused · 1 set',
      description: 'Includes a four-shade eyeshadow palette and a cheek duo. The cases have minor surface marks. The eyeshadow palette comes without a brush or applicator, and the price reflects that.',
      price: 'US$35',
      photoNote: 'Gallery images edited with AI from photos of this set. The original close-up shows the empty applicator slot.',
      collage: 'Open set', front: 'Closed cases', angle: 'Angled view', original: 'Original close-up',
      alt: {
        collage: 'Both Lancôme compacts open, showing four eyeshadows and two cheek shades',
        front: 'Two closed black Lancôme compacts showing the rose emblem',
        angle: 'Angled view of both open compacts',
        original: 'Original photo of four eyeshadows and the empty applicator compartment'
      }
    }
  },
  'lancome-juicy-tubes': {
    es: {
      name: 'Dúo de brillos labiales Lancôme Juicy Tubes',
      condition: 'Nuevos, sin uso · 1 dúo',
      description: 'Dos brillos labiales de 15 mL cada uno. Bolole es un rojo con destellos y Hallucination es un nude durazno con destellos. Precio por el dúo.',
      price: 'US$25',
      photoNote: 'Fotos de frente editadas con IA a partir de las fotos de los tubos. Las etiquetas se muestran en fotos originales recortadas.',
      collage: 'Ambos tonos', bolole: 'Bolole', hallucination: 'Hallucination',
      'bolole-label': 'Etiqueta Bolole', 'hallucination-label': 'Etiqueta Hallucination',
      alt: {
        collage: 'Frente de los dos brillos Lancôme Juicy Tubes: Bolole rojo y Hallucination nude durazno',
        bolole: 'Vista frontal del brillo labial Bolole en rojo con destellos',
        hallucination: 'Vista frontal del brillo labial Hallucination en nude durazno con destellos',
        'bolole-label': 'Foto original de la etiqueta Bolole de 15 mL',
        'hallucination-label': 'Foto original de la etiqueta Hallucination de 15 mL'
      }
    },
    en: {
      name: 'Lancôme Juicy Tubes Lip Gloss Duo',
      condition: 'New, unused · 1 duo',
      description: 'Two 15 mL lip glosses. Bolole is a shimmery red and Hallucination is a shimmery peach nude. Price is for both tubes.',
      price: 'US$25',
      photoNote: 'Front views edited with AI from photos of these tubes. The label photos are cropped originals.',
      collage: 'Both shades', bolole: 'Bolole', hallucination: 'Hallucination',
      'bolole-label': 'Bolole label', 'hallucination-label': 'Hallucination label',
      alt: {
        collage: 'Front view of both Lancôme Juicy Tubes glosses, red Bolole and peach-nude Hallucination',
        bolole: 'Front view of shimmery red Bolole lip gloss',
        hallucination: 'Front view of shimmery peach-nude Hallucination lip gloss',
        'bolole-label': 'Original photo of the 15 mL Bolole label',
        'hallucination-label': 'Original photo of the 15 mL Hallucination label'
      }
    }
  }
};
const cosmeticsSharedCopy = {
  es: {views: 'Fotos del producto', inquiry: 'Consultar disponibilidad', shelfLife: 'Vigencia por verificar antes de la compra.'},
  en: {views: 'Product photos', inquiry: 'Ask about availability', shelfLife: 'Shelf life to be verified before purchase.'}
};
const caseSections = document.querySelectorAll('.beauty-product');
function galleryCopy(section, language) {
  const cosmetics = cosmeticsCopy[section.id];
  if (cosmetics) return {...cosmeticsSharedCopy[language], ...cosmetics[language]};
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
function setLanguage(lang){translateCase(lang);document.querySelectorAll('[data-text]').forEach(el => { el.textContent = translations[lang][el.dataset.text]; });
document.title = 'Trama & Charol | ' + (lang === 'es' ? 'Moda y belleza' : 'Fashion & Beauty');
document.documentElement.lang=lang;document.querySelector('#language-toggle').textContent=lang==='es'?'EN':'ES';document.querySelector('#language-toggle').setAttribute('aria-label',lang==='es'?'Switch language to English':'Cambiar idioma a español');try{localStorage.setItem('store-language',lang)}catch{}}
let lang='es';try{lang=localStorage.getItem('store-language')||'es'}catch{}if(!translations[lang])lang='es';setLanguage(lang);document.querySelector('#language-toggle').addEventListener('click',()=>{lang=lang==='es'?'en':'es';setLanguage(lang)});
