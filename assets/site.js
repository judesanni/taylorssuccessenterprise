/* Taylor Success Enterprise - site behaviour (vanilla JS, no dependencies) */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- navigation: parent / child menu + mobile menu ---------- */
function initNav(){
  const toggle=$('.menu-toggle'),menu=$('#menu');
  const setMenu=open=>{
    if(!toggle||!menu)return;
    menu.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    document.body.classList.toggle('modal-open',open);
  };
  if(toggle&&menu){
    toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
    $$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
    matchMedia('(min-width:1040px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
  }
  const subs=$$('.has-sub');
  const shut=s=>{s.classList.remove('open');s.querySelector('.nav-btn').setAttribute('aria-expanded','false');};
  const open=s=>{subs.forEach(o=>{if(o!==s)shut(o);});s.classList.add('open');s.querySelector('.nav-btn').setAttribute('aria-expanded','true');};
  subs.forEach(s=>{
    const btn=s.querySelector('.nav-btn');
    btn.addEventListener('click',e=>{
      /* mouse users already opened it by hovering: a click keeps it open; keyboard and touch toggle */
      if(FINE&&e.detail>0){open(s);return;}
      s.classList.contains('open')?shut(s):open(s);
    });
    if(FINE){
      let t;
      s.addEventListener('mouseenter',()=>{clearTimeout(t);open(s);});
      s.addEventListener('mouseleave',()=>{t=setTimeout(()=>shut(s),180);});
    }
    s.addEventListener('focusout',e=>{if(!s.contains(e.relatedTarget))shut(s);});
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.has-sub'))subs.forEach(shut);});
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    const openSub=subs.find(s=>s.classList.contains('open'));
    if(openSub){shut(openSub);openSub.querySelector('.nav-btn').focus();}
    else if(menu&&menu.classList.contains('open')){setMenu(false);toggle.focus();}
  });
}

/* ---------- cursor: soft ring that turns into a label ---------- */
function initCursor(){
  if(!FINE||REDUCE)return;
  const c=document.createElement('div');
  c.className='cursor';c.setAttribute('aria-hidden','true');c.innerHTML='<span class="t"></span>';
  document.body.appendChild(c);
  const label=$('.t',c);
  let x=-200,y=-200,cx=x,cy=y,raf=0;
  const loop=()=>{
    cx+=(x-cx)*.24;cy+=(y-cy)*.24;
    c.style.transform=`translate3d(${cx}px,${cy}px,0)`;
    raf=(Math.abs(x-cx)>.15||Math.abs(y-cy)>.15)?requestAnimationFrame(loop):0;
  };
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;c.classList.add('on');if(!raf)raf=requestAnimationFrame(loop);},{passive:true});
  document.documentElement.addEventListener('mouseleave',()=>c.classList.remove('on'));
  document.addEventListener('pointerover',e=>{
    const el=e.target.closest&&e.target.closest('[data-cursor]');
    if(el){label.textContent=el.dataset.cursor;c.classList.add('big');}else c.classList.remove('big');
  });
}

/* ---------- hero: paparazzi flash trail made of Taylor's own photos ---------- */
function initTrail(){
  const hero=$('[data-trail]');
  if(!hero||!FINE||REDUCE)return;
  const pool=shuffle((hero.dataset.trail||'').split(',').map(s=>s.trim()).filter(Boolean));
  if(!pool.length)return;
  const layer=document.createElement('div');
  layer.className='trail';layer.setAttribute('aria-hidden','true');
  hero.prepend(layer);
  (window.requestIdleCallback||(fn=>setTimeout(fn,700)))(()=>pool.forEach(src=>{const i=new Image();i.src=src;}));
  let last=null,idx=0,live=0;
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    if(last&&Math.hypot(x-last.x,y-last.y)<130)return;
    last={x,y};
    if(live>=9)return;
    live++;
    const el=document.createElement('div');
    el.className='snap';
    el.style.left=x+'px';el.style.top=y+'px';
    el.style.setProperty('--r',(Math.random()*18-9).toFixed(1)+'deg');
    const img=new Image();img.alt='';img.src=pool[idx++%pool.length];
    el.appendChild(img);layer.appendChild(el);
    setTimeout(()=>{el.remove();live--;},1300);
  },{passive:true});
}

/* ---------- services: photo follows the pointer over a row ---------- */
function initPeek(){
  const rows=$$('[data-peek]');
  if(!rows.length||!FINE)return;
  const peek=document.createElement('div');
  peek.className='peek';peek.setAttribute('aria-hidden','true');peek.innerHTML='<img alt="">';
  document.body.appendChild(peek);
  const img=peek.firstElementChild;
  rows.forEach(r=>{
    const src=r.dataset.peek;
    const pre=new Image();
    r.addEventListener('mouseenter',()=>{if(!pre.src)pre.src=src;img.src=src;peek.classList.add('on');});
    r.addEventListener('mouseleave',()=>peek.classList.remove('on'));
    r.addEventListener('mousemove',e=>{
      const px=Math.min(e.clientX+34,innerWidth-270),py=Math.max(12,Math.min(e.clientY-160,innerHeight-330));
      peek.style.transform=`translate(${px}px,${py}px)`;
    },{passive:true});
  });
}

/* ---------- numbers count up once ---------- */
function initCounters(){
  $$('[data-count]').forEach(el=>{
    const target=Number(el.dataset.count),suffix=el.dataset.suffix||'';
    if(REDUCE||!('IntersectionObserver' in window)){el.textContent=target+suffix;return;}
    let done=false;
    const run=()=>{
      if(done)return;done=true;
      const t0=performance.now(),dur=1100;
      const tick=now=>{const p=Math.min((now-t0)/dur,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(tick);};
      requestAnimationFrame(tick);
    };
    const io=new IntersectionObserver(en=>{if(en[0].isIntersecting){run();io.disconnect();}},{threshold:.5});
    io.observe(el);
  });
}

/* ---------- Decap CMS hooks: image slots and editable text ---------- */
let CMS_IMAGES={};
async function initCmsImages(){
  try{
    const r=await fetch('data/site-images.json',{cache:'no-store'});
    if(!r.ok)return;
    CMS_IMAGES=await r.json();
    $$('[data-cms-image]').forEach(img=>{const v=CMS_IMAGES[img.dataset.cmsImage];if(typeof v==='string'&&v.trim())img.src=v;});
  }catch(e){/* the bundled photos stay in place */}
}
async function initCmsContent(){
  try{
    const r=await fetch('data/event-content.json',{cache:'no-store'});
    if(!r.ok)return;
    const content=await r.json();
    $$('[data-cms-text]').forEach(el=>{const v=content[el.dataset.cmsText];if(typeof v==='string'&&v.trim())el.textContent=v;});
  }catch(e){/* the built-in copy stays in place */}
}

/* ---------- contact form: preselect the service from ?service= ---------- */
function initContactForm(){
  $$('[data-contact-form]').forEach(form=>{
    const service=new URLSearchParams(location.search).get('service');
    if(service&&form.elements.service){
      const sel=form.elements.service;
      const opt=[...sel.options].find(o=>o.text.toLowerCase()===service.toLowerCase()||o.value.toLowerCase()===service.toLowerCase());
      if(opt)sel.value=opt.value;
    }
    /* Netlify Forms handles the submit unless an external endpoint is configured (Formspree, Web3Forms, etc.) */
    const endpoint=(form.dataset.endpoint||'').trim();
    if(!endpoint)return;
    const status=$('.form-status',form),btn=$('[type=submit]',form);
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      if(!form.checkValidity()){form.reportValidity();return;}
      const label=btn.innerHTML;btn.disabled=true;btn.textContent='Sending...';if(status)status.textContent='';
      try{
        const fd=new FormData(form);
        const key=(form.dataset.accessKey||'').trim();
        if(key)fd.append('access_key',key);
        const r=await fetch(endpoint,{method:'POST',body:fd,headers:{Accept:'application/json'}});
        if(!r.ok)throw new Error('send failed');
        location.href='thank-you.html';
      }catch(err){
        if(status)status.textContent='That did not send. Please call or email directly using the details on this page.';
        btn.disabled=false;btn.innerHTML=label;
      }
    });
  });
}

/* ------------------------------------------------------------------
   Gallery: square cover thumbnails, one lightbox for photos and videos
------------------------------------------------------------------- */
const escapeText=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=arr=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* Thumbnail URL: smaller copy for grids, original for the viewer. */
function thumbUrl(url){
  try{
    const m=url.match(/^\/uploads\/taylor\/([^\/]+\.jpg)$/i);
    if(m)return '/uploads/taylor/t/'+m[1];
    if(url.startsWith('/uploads/'))return '/.netlify/images?url='+encodeURIComponent(url)+'&w=800';
  }catch(e){}
  return url;
}

/* Vimeo: thumbnail and aspect ratio via the public oEmbed endpoint (cached per tab). */
const vimeoMeta=new Map();
function loadVimeoMeta(id){
  if(vimeoMeta.has(id))return vimeoMeta.get(id);
  const job=(async()=>{
    try{const c=JSON.parse(sessionStorage.getItem('tse-vm-'+id)||'null');if(c&&c.thumb)return c;}catch(e){}
    try{
      const r=await fetch('https://vimeo.com/api/oembed.json?width=800&url='+encodeURIComponent('https://vimeo.com/'+id));
      if(!r.ok)throw new Error('oembed');
      const j=await r.json();
      const meta={thumb:j.thumbnail_url||'',w:Number(j.width)||0,h:Number(j.height)||0};
      if(meta.thumb){try{sessionStorage.setItem('tse-vm-'+id,JSON.stringify(meta));}catch(e){}}
      return meta;
    }catch(e){return {thumb:'',w:0,h:0};}
  })();
  vimeoMeta.set(id,job);
  return job;
}
function hydratePosters(root){
  const tiles=$$('.media-tile.is-video',root);
  const paint=async tile=>{
    if(tile.dataset.painted)return;
    tile.dataset.painted='1';
    const id=tile.dataset.video;
    const meta=await loadVimeoMeta(id);
    const poster=tile.querySelector('.media-poster');
    if(!poster||poster.firstChild)return;
    const sources=[meta.thumb,'https://vumbnail.com/'+encodeURIComponent(id)+'.jpg'].filter(Boolean);
    const img=new Image();
    img.alt='';img.decoding='async';
    let n=0;
    img.onerror=()=>{n++;if(n<sources.length)img.src=sources[n];else{img.remove();tile.classList.add('no-poster');}};
    img.src=sources[0];
    poster.appendChild(img);
  };
  if(!('IntersectionObserver' in window)){tiles.forEach(paint);return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);paint(e.target);}}),{rootMargin:'400px'});
  tiles.forEach(t=>io.observe(t));
  setTimeout(()=>tiles.forEach(t=>{if(t.isConnected)paint(t);}),2500);
}

function renderTile(item,index){
  if(item.type==='video'){
    return `<button class="media-tile is-video" data-cursor="Play" type="button" data-index="${index}" data-video="${escapeText(item.videoId)}" aria-label="Play video"><span class="media-poster"></span><span class="media-play" aria-hidden="true"></span></button>`;
  }
  return `<button class="media-tile is-image" data-cursor="View" type="button" data-index="${index}" aria-label="View photo"><img src="${escapeText(thumbUrl(item.image))}" data-original="${escapeText(item.image)}" alt="" loading="lazy" decoding="async" onerror="if(this.dataset.original&&this.src!==this.dataset.original){this.src=this.dataset.original;}"></button>`;
}
function renderGrid(container,list){
  container.__list=list;
  container.innerHTML=list.map(renderTile).join('');
  hydratePosters(container);
}

/* Lightbox */
const LB={el:null,stage:null,count:null,list:[],i:0,trigger:null,token:0};
const ICON_CLOSE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const ICON_PREV='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_NEXT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
function buildLightbox(){
  if(LB.el)return;
  const el=document.createElement('div');
  el.className='lb';el.id='tse-lightbox';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Media viewer');el.setAttribute('aria-hidden','true');
  el.innerHTML=`<div class="lb-stage" tabindex="-1"></div><button class="lb-btn lb-close" type="button" aria-label="Close viewer">${ICON_CLOSE}</button><button class="lb-btn lb-prev" type="button" aria-label="Previous">${ICON_PREV}</button><button class="lb-btn lb-next" type="button" aria-label="Next">${ICON_NEXT}</button><div class="lb-count" aria-live="polite"></div>`;
  document.body.appendChild(el);
  LB.el=el;LB.stage=el.querySelector('.lb-stage');LB.count=el.querySelector('.lb-count');
  el.querySelector('.lb-close').addEventListener('click',closeLightbox);
  el.querySelector('.lb-prev').addEventListener('click',()=>stepLightbox(-1));
  el.querySelector('.lb-next').addEventListener('click',()=>stepLightbox(1));
  LB.stage.addEventListener('click',e=>{if(e.target===LB.stage)closeLightbox();});
  let sx=0,sy=0,tracking=false;
  LB.stage.addEventListener('touchstart',e=>{if(e.touches.length!==1){tracking=false;return;}tracking=true;sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});
  LB.stage.addEventListener('touchend',e=>{
    if(!tracking)return;tracking=false;
    const t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6)stepLightbox(dx<0?1:-1);
  },{passive:true});
  document.addEventListener('keydown',e=>{
    if(!LB.el.classList.contains('is-open'))return;
    if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();closeLightbox();return;}
    if(e.key==='ArrowRight'&&LB.list.length>1){e.preventDefault();stepLightbox(1);return;}
    if(e.key==='ArrowLeft'&&LB.list.length>1){e.preventDefault();stepLightbox(-1);return;}
    if(e.key==='Tab'){
      e.stopImmediatePropagation();
      const f=[...LB.el.querySelectorAll('button')].filter(b=>b.offsetParent!==null);
      if(!f.length)return;
      const first=f[0],last=f[f.length-1];
      if(e.shiftKey&&(document.activeElement===first||!LB.el.contains(document.activeElement))){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&(document.activeElement===last||!LB.el.contains(document.activeElement))){e.preventDefault();first.focus();}
    }
  },true);
}
async function renderLightboxItem(){
  const item=LB.list[LB.i];
  const token=++LB.token;
  const stage=LB.stage;
  stage.innerHTML='';stage.scrollTop=0;stage.classList.add('is-loading');
  LB.count.textContent=LB.list.length>1?`${LB.i+1} / ${LB.list.length}`:'';
  const multi=LB.list.length>1;
  LB.el.querySelector('.lb-prev').hidden=!multi;
  LB.el.querySelector('.lb-next').hidden=!multi;
  if(!item)return;
  if(item.type==='video'){
    const meta=await Promise.race([loadVimeoMeta(item.videoId),sleep(900).then(()=>null)]);
    if(token!==LB.token)return;
    const ratio=(meta&&meta.w&&meta.h)?meta.w/meta.h:16/9;
    const wrap=document.createElement('div');
    wrap.className='lb-video';
    wrap.style.setProperty('--arn',ratio.toFixed(4));
    wrap.style.aspectRatio=ratio.toFixed(4);
    const frame=document.createElement('iframe');
    frame.src='https://player.vimeo.com/video/'+encodeURIComponent(item.videoId)+'?autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1&playsinline=1&color=ffffff';
    frame.title='Video player';
    frame.allow='autoplay; fullscreen; picture-in-picture';
    frame.setAttribute('allowfullscreen','');
    wrap.appendChild(frame);
    stage.appendChild(wrap);
    stage.classList.remove('is-loading');
  }else{
    const img=new Image();
    img.alt='Project photo';img.className='lb-img';img.decoding='async';
    img.onload=()=>{if(token===LB.token)stage.classList.remove('is-loading');};
    img.onerror=()=>{
      if(token!==LB.token)return;
      stage.classList.remove('is-loading');
      img.remove();
      const msg=document.createElement('p');msg.className='lb-error';msg.textContent='This image could not be loaded.';stage.appendChild(msg);
    };
    img.src=item.image;
    stage.appendChild(img);
  }
  [LB.i+1,LB.i-1].forEach(n=>{const nb=LB.list[(n+LB.list.length)%LB.list.length];if(nb&&nb.type==='image'&&nb!==item){const pre=new Image();pre.src=nb.image;}});
}
function openLightbox(list,index,trigger){
  if(!list||!list.length)return;
  buildLightbox();
  LB.list=list;LB.i=Math.max(0,Math.min(index,list.length-1));LB.trigger=trigger||null;
  LB.el.classList.add('is-open');LB.el.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  renderLightboxItem();
  LB.el.querySelector('.lb-close').focus({preventScroll:true});
}
function stepLightbox(d){
  if(LB.list.length<2)return;
  LB.i=(LB.i+d+LB.list.length)%LB.list.length;
  renderLightboxItem();
}
function closeLightbox(){
  if(!LB.el||!LB.el.classList.contains('is-open'))return;
  LB.token++;
  LB.stage.innerHTML='';
  LB.el.classList.remove('is-open');LB.el.setAttribute('aria-hidden','true');
  if(!$('#portfolio-gallery.is-open'))document.body.classList.remove('modal-open');
  const t=LB.trigger;LB.trigger=null;
  if(t&&document.contains(t))t.focus({preventScroll:true});
}

async function initPortfolioGalleries(){
  const modal=$("#portfolio-gallery");
  const modalGrid=$("#gallery-modal-grid");
  const modalTitle=$("#gallery-modal-title");
  const modalDescription=$("#gallery-modal-description");
  const modalLink=$("#gallery-modal-link");
  const allGrid=$("#media-gallery");
  const categoryFilter=$("#gallery-category-filters");
  if(!allGrid&&!modal)return;

  let data;
  try{
    const response=await fetch('data/portfolio-galleries.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Gallery data could not be loaded');
    data=await response.json();
    if(!Array.isArray(data.galleries))throw new Error('Gallery data is incomplete');
  }catch(error){
    if(allGrid)allGrid.innerHTML='<p class="gallery-empty">The gallery is temporarily unavailable. Please try again shortly.</p>';
    return;
  }

  const usable=item=>item&&((item.type==='video'&&item.videoId)||(item.type==='image'&&item.image));
  const keyOf=item=>item.type==='video'?'v:'+item.videoId:'i:'+String(item.image).split('?')[0];

  /* One random order per page view, kept stable while the visitor browses. */
  const galleries=data.galleries.map(g=>({id:g.id,title:g.title,description:g.description,items:shuffle((g.items||[]).filter(usable))}));
  const seen=new Set();
  const everything=shuffle(galleries.flatMap(g=>g.items).filter(item=>{const k=keyOf(item);if(seen.has(k))return false;seen.add(k);return true;}));

  let activeType='all';
  let activeCategory=new URLSearchParams(location.search).get('category')||'all';
  if(!galleries.some(g=>g.id===activeCategory))activeCategory='all';

  const updateGrid=()=>{
    if(!allGrid)return;
    const base=activeCategory==='all'?everything:(galleries.find(g=>g.id===activeCategory)||{items:[]}).items;
    const filtered=base.filter(item=>activeType==='all'||item.type===activeType);
    if(filtered.length)renderGrid(allGrid,filtered);
    else{allGrid.__list=[];allGrid.innerHTML='<p class="gallery-empty">Nothing here yet. Check back soon.</p>';}
    const count=$("#gallery-result-count");
    if(count)count.textContent=`${filtered.length} ${filtered.length===1?'item':'items'}`;
    if(categoryFilter)$$('[data-gallery-category-filter]',categoryFilter).forEach(btn=>btn.classList.toggle('active',btn.dataset.galleryCategoryFilter===activeCategory));
    $$('#gallery-filters [data-gallery-filter]').forEach(btn=>btn.classList.toggle('active',btn.dataset.galleryFilter===activeType));
  };
  if(allGrid){
    updateGrid();
    allGrid.addEventListener('click',e=>{const tile=e.target.closest('.media-tile');if(tile)openLightbox(allGrid.__list,Number(tile.dataset.index),tile);});
  }
  $$('#gallery-filters [data-gallery-filter]').forEach(btn=>btn.addEventListener('click',()=>{activeType=btn.dataset.galleryFilter||'all';updateGrid();}));
  if(categoryFilter)$$('[data-gallery-category-filter]',categoryFilter).forEach(btn=>btn.addEventListener('click',()=>{
    activeCategory=btn.dataset.galleryCategoryFilter||'all';
    const url=new URL(location.href);
    if(activeCategory==='all')url.searchParams.delete('category');else url.searchParams.set('category',activeCategory);
    history.replaceState({},'',url);
    updateGrid();
  }));

  /* Work page: category cards open a gallery panel. */
  if(!modal||!modalGrid)return;
  const closeModal=()=>{
    modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');
    modalGrid.innerHTML='';modalGrid.__list=[];
    if(window.__tseGalleryTrigger&&document.contains(window.__tseGalleryTrigger))window.__tseGalleryTrigger.focus({preventScroll:true});
  };
  const openModal=(category,trigger)=>{
    const g=galleries.find(item=>item.id===category);
    if(!g)return false;
    window.__tseGalleryTrigger=trigger;
    if(modalTitle)modalTitle.textContent=g.title;
    if(modalDescription)modalDescription.textContent=g.description||`A selection of ${g.title.toLowerCase()} moments, campaign work and project highlights.`;
    if(modalLink)modalLink.href=`gallery.html?category=${encodeURIComponent(g.id)}`;
    renderGrid(modalGrid,g.items);
    const panel=modal.querySelector('.gallery-modal-panel');if(panel)panel.scrollTop=0;
    modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
    const close=modal.querySelector('.gallery-close');
    if(close)close.focus({preventScroll:true});
    return true;
  };
  modalGrid.addEventListener('click',e=>{const tile=e.target.closest('.media-tile');if(tile)openLightbox(modalGrid.__list,Number(tile.dataset.index),tile);});
  document.addEventListener('click',e=>{
    const card=e.target.closest('[data-gallery-category]');
    if(!card)return;
    if(openModal(card.dataset.galleryCategory,card))e.preventDefault();
  });
  $$('[data-gallery-close]',modal).forEach(el=>el.addEventListener('click',closeModal));
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  document.addEventListener('keydown',e=>{
    if(!modal.classList.contains('is-open'))return;
    if(e.key==='Escape'){closeModal();return;}
    if(e.key==='Tab'){
      const focusable=[...modal.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.offsetParent!==null&&!el.classList.contains('gallery-modal-backdrop'));
      if(!focusable.length)return;
      const first=focusable[0],last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  initNav();initCursor();initTrail();initPeek();initCounters();initContactForm();
  initCmsImages();initCmsContent();initPortfolioGalleries();
});
