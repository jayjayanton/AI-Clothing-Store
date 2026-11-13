// Women's clothing catalog: images hosted in the existing Google Drive Clothes folder.
// Order: collage, front, back, side. Price deliberately unset.
const womensProducts=[{"name":"PINK Nation V-neck T-shirt","brand":"Victoria's Secret PINK","category":"tshirts","size":"L","color":"White / Blanco","ids":["1Ry1AuaFmsZMQFxFAtQY2tiAP2u1ib1IL","1DUuQDE-LwBQOOAFrobOZnT_CP-odj53C","1HU06Y12TiZZGtUl4C9n-TROpxNB7NExw","1JtNUpoeNHiMReZy7-iwop90Meo4LgGi3"]},{"name":"Snakeskin Sequin Mini Skirt","brand":"2b bebe","category":"skirts","size":"S","color":"Gray / Gris","ids":["1iB-8EvnzRV1ewJFVqlCCYczFWDHuqrFQ","1wjULNJZ_qEc9J-t3zW8I-dxO-xMFbLnO","1l1KLmkeojG2rDF8A6aL7EYRIp1rw3ZpD","1dB-dpsNCu3blsri7TOBYVP3B-YsGlkWt"]},{"name":"Strapless Sequin Tube Top","brand":"2b bebe","category":"tops","size":"S","color":"Red / Rojo","ids":["14hDoJoi9qafjW4qzZJQE206ZLYVeS1g1","1pUCNk8BSjjzKGa_v3UiMt8uuGZjNcBxD","1ZNvYUfjcCk_2Jc3Izr7KdDRPhInqyBN6","1MNkw31h2j0niql__MPfo11gKsGNuG8_n"]},{"name":"Metallic Polka Dot Peplum Top","brand":"Papaya","category":"tops","size":"S","color":"Coral red / Rojo coral","ids":["14mn2tL9vXlyJXw7nmBpj3b5m6BPJZFZI","1U0eSQMpgFtANrok0LF57ZKLqR7mojIMG","1bgkXIwL24LCcxCDf04rZ5kCtN-FmAS2j","1BQ7alf8SFV4tnVhYB1W0K5jnm4f5CUzc"]},{"name":"Ruched Animal-Print Camisole Top","brand":"XOXO","category":"tops","size":"M","color":"Red and black / Rojo y negro","ids":["1MqXXThMHjmK0dy1UrGHW33DxLrrPy1Vw","1E3KasSf0MeBWVo_KikRChEmobfi2Tzq2","1f5IWosnHuy7DjiyM-rXoZsvY00dqoHsx","11zeJLGjNO_IdOXRCJ3CkKL9KCjNUpBOq"]}];
const womenGrid=document.querySelector('#women-product-grid');
const viewLabels=['Collage','Front / Frente','Back / Espalda','Side / Lado'];
const driveLink=id=>'https://drive.google.com/file/d/'+id+'/view';
const thumb=id=>'https://drive.google.com/thumbnail?id='+id+'&sz=w1000';
function renderWomen(filter='all'){
 womenGrid.replaceChildren();
 womensProducts.filter(p=>filter==='all'||p.category===filter).forEach(p=>{
  const card=document.createElement('article');card.className='women-card';card.dataset.category=p.category;
  const photo=document.createElement('a');photo.href=driveLink(p.ids[0]);photo.target='_blank';photo.rel='noopener noreferrer';photo.className='women-photo';photo.setAttribute('aria-label','Open '+p.name+' collage in Google Drive');
  const img=document.createElement('img');img.src=thumb(p.ids[0]);img.alt=p.name+' product collage';img.loading='lazy';img.onerror=()=>{img.style.display='none';photo.textContent='View collage in Google Drive'};photo.append(img);
  const info=document.createElement('div');info.className='women-info';
  const heading=document.createElement('h3');heading.textContent=p.name;info.append(heading);
  const meta=document.createElement('p');meta.textContent=p.brand+' · Size '+p.size+' · '+p.color;info.append(meta);
  const price=document.createElement('p');price.className='women-price';price.textContent='Precio por confirmar / Price pending';info.append(price);
  const gallery=document.createElement('div');gallery.className='women-gallery';
  let selected=0;const updateSlide=()=>{img.src=thumb(p.ids[selected]);img.alt=p.name+' — '+viewLabels[selected];photo.href=driveLink(p.ids[selected]);photo.setAttribute('aria-label','Open '+viewLabels[selected]+' in Google Drive');gallery.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===selected);b.setAttribute('aria-pressed',String(i===selected))})};
  p.ids.forEach((id,i)=>{const b=document.createElement('button');b.type='button';b.textContent=viewLabels[i];b.addEventListener('click',()=>{selected=i;updateSlide()});gallery.append(b)});
  const controls=document.createElement('div');controls.className='women-slide-controls';
  const prev=document.createElement('button');prev.type='button';prev.textContent='‹';prev.setAttribute('aria-label','Previous image');
  const next=document.createElement('button');next.type='button';next.textContent='›';next.setAttribute('aria-label','Next image');
  prev.addEventListener('click',()=>{selected=(selected+3)%4;updateSlide()});next.addEventListener('click',()=>{selected=(selected+1)%4;updateSlide()});controls.append(prev,next);
  photo.after(controls);info.append(gallery);card.append(info);womenGrid.append(card);updateSlide();
 });
}
document.querySelectorAll('[data-women-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-women-filter]').forEach(x=>x.classList.toggle('active',x===b));renderWomen(b.dataset.womenFilter)}));
renderWomen();
