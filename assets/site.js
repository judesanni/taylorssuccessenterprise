
const TSE = {
  eventbrite: "https://www.eventbrite.com/o/taylors-enterprise-28628068455",
  contactEmail: "tsenterprisesatlanta@gmail.com",
  services: {
    "pr-media": {title:"Public Relations & Media Strategy", icon:"✳", intro:"Shape the story people hear about your brand, then put that story in front of the right audiences.", body:"From press releases and media pitching to narrative development, editorial outreach and publicity planning, Taylor Success Enterprise helps clients build visibility with intention. Every campaign begins with the story, the audience and the outcome you want to create. Services can include media strategy, press materials, blog and editorial outreach, interview coordination and publicity support for film, television, music, entrepreneurs and organizations.", images:[{key:"services_pr_media_gallery_1",fallback:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85"},{key:"services_pr_media_gallery_2",fallback:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85"},{key:"services_pr_media_gallery_3",fallback:"https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=900&q=85"}]},
    "events": {title:"Event Production & Management", icon:"◉", intro:"Big energy on the floor. Calm, considered execution behind the scenes.", body:"From intimate dinners and red-carpet moments to conferences, brand activations and large-scale celebrations, Taylor Success Enterprise helps bring events from idea to experience. Support can include concept development, planning, vendor coordination, timelines, talent liaison, on-site production, guest experience and post-event storytelling. Each event is shaped around its audience, objectives and atmosphere.", images:[{key:"services_event_production_gallery_1",fallback:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85"},{key:"services_event_production_gallery_2",fallback:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85"},{key:"services_event_production_gallery_3",fallback:"https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85"}]},
    "branding": {title:"Branding & Marketing Campaigns", icon:"✦", intro:"A clear identity. A sharper message. A campaign that gives people a reason to care.", body:"Taylor Success Enterprise connects brand positioning, campaign planning and audience engagement to help organizations communicate consistently. Engagements may include campaign concepts, creative direction, brand messaging, social media growth strategy, promotional partnerships, street-team activations, billboard planning and marketing support tailored to a client's audience and goals.", images:[{key:"services_brand_marketing_gallery_1",fallback:"https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85"},{key:"services_brand_marketing_gallery_2",fallback:"https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=85"},{key:"services_brand_marketing_gallery_3",fallback:"https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85"}]},
    "partnerships": {title:"Sponsorships & Partnerships", icon:"↗︎", intro:"Connect the right people, brands and opportunities around a shared win.", body:"Partnership strategy is about more than putting logos together. We help clients shape sponsorship opportunities, identify potential brand alignment, prepare outreach materials and coordinate conversations that can create value for both sides. Final partnerships depend on fit, availability and agreement between the parties.", images:[{key:"services_partnerships_gallery_1",fallback:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"},{key:"services_partnerships_gallery_2",fallback:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85"},{key:"services_partnerships_gallery_3",fallback:"https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=85"}]},
    "talent": {title:"Talent & Entertainment Relations", icon:"✺", intro:"Thoughtful coordination for artists, public figures, productions and live experiences.", body:"From talent liaison and promotional appearances to electronic press kits, red-carpet coordination and entertainment publicity, the work is designed to help projects show up professionally and connect with relevant audiences. Specific deliverables are scoped to each production, talent team or campaign.", images:[{key:"services_talent_entertainment_gallery_1",fallback:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85"},{key:"services_talent_entertainment_gallery_2",fallback:"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85"},{key:"services_talent_entertainment_gallery_3",fallback:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85"}]},
    "business": {title:"Business Development & Consulting", icon:"⌁", intro:"Turn a good idea into a clearer plan, stronger relationships and next steps you can act on.", body:"For entrepreneurs, small businesses and organizations, Taylor Success Enterprise can support growth planning, opportunity identification, business introductions, campaign direction and partnership development. Real estate or investment introductions, where appropriate, are exploratory and subject to due diligence and independent professional advice.", images:[{key:"services_business_consulting_gallery_1",fallback:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85"},{key:"services_business_consulting_gallery_2",fallback:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85"},{key:"services_business_consulting_gallery_3",fallback:"https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=85"}]}
  }
};

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];

function initNavigation(){
  const toggle=$(".menu-toggle"), mobile=$(".mobile-nav");
  if(toggle && mobile){
    toggle.addEventListener("click",()=>{
      const opened=mobile.classList.toggle("open");
      toggle.setAttribute("aria-expanded",String(opened));
      toggle.innerHTML=opened?'<span aria-hidden="true">×</span>':'<span aria-hidden="true">☰</span>';
    });
    $$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>{mobile.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.innerHTML='<span aria-hidden="true">☰</span>';}));
  }

  // Get clean current path (e.g., "/about" instead of "/about.html")
  const currentPath = location.pathname.replace(/\.html$/, '').toLowerCase();

  $$("[data-nav]").forEach(a => {
    // Get the absolute link path relative to the domain root
    const linkPath = a.pathname.replace(/\.html$/, '').toLowerCase();
    
    // Check if it's the home page or a matching subpage
    const isCurrent = (currentPath === '/' || currentPath === '/index') 
      ? (linkPath === '/' || linkPath === '/index')
      : (linkPath === currentPath);

    a.classList.toggle("active", isCurrent);
    if(isCurrent) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}
function initReveal(){
  const els=$$(".reveal");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("is-visible"));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(e=>io.observe(e));
}
function initCounters(){
  $$("[data-count]").forEach(el=>{
    const target=Number(el.dataset.count); let done=false;
    const start=()=>{if(done)return;done=true;const startTime=performance.now(),duration=1200;function tick(now){const p=Math.min((now-startTime)/duration,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3)))+"+";if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)};
    if(!("IntersectionObserver" in window)){start();return;}
    const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){start();io.disconnect()}},{threshold:.4});io.observe(el);
  });
}

let CMS_IMAGES = {};
function getNested(obj,path){return path.split('.').reduce((value,key)=>value && value[key]!==undefined?value[key]:undefined,obj)}
function resolveImage(key,fallback=''){const value=getNested(CMS_IMAGES,key);return (typeof value==='string' && value.trim())?value:fallback}
function escapeAttr(value){return String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
async function initCmsImages(){
  try{const response=await fetch('data/site-images.json',{cache:'no-store'});if(!response.ok)return;CMS_IMAGES=await response.json();
    $$('[data-cms-image]').forEach(img=>{const path=img.dataset.cmsImage;const value=resolveImage(path);if(value)img.src=value;});
    $$('[data-cms-bg-image]').forEach(el=>{const value=resolveImage(el.dataset.cmsBgImage);if(value)el.style.setProperty('--cta-image',`url("${value.replace(/"/g,'\\"')}")`);});
  }catch(error){/* Keep the bundled default images if the CMS file is unavailable. */}
}

function openService(key){
  const data=TSE.services[key]; if(!data)return;
  const backdrop=$("#service-modal"); if(!backdrop)return;
  backdrop.querySelector(".modal-title").textContent=data.title;
  backdrop.querySelector(".modal-intro").textContent=data.intro;
  backdrop.querySelector(".modal-copy").textContent=data.body;
  const gallery=backdrop.querySelector(".modal-gallery");
  gallery.innerHTML=data.images.map((item,i)=>{const src=resolveImage(item.key,item.fallback);return `<img src="${escapeAttr(src)}" alt="${data.title} image ${i+1}" loading="lazy">`}).join("")+
  `<div class="gallery-controls"><span class="muted">A closer look at the work.</span><button type="button" data-modal-inquire>Discuss this service ↗︎</button></div>`;
  backdrop.classList.add("open");document.body.classList.add("modal-open");
  backdrop.setAttribute("aria-hidden","false");history.replaceState(null,"",`#service=${encodeURIComponent(key)}`);
  backdrop.querySelector("[data-modal-inquire]").addEventListener("click",()=>location.href=`contact.html?service=${encodeURIComponent(data.title)}`);
  backdrop.querySelector(".modal-close").focus();
}
function closeService(){
  const backdrop=$("#service-modal");if(!backdrop)return;
  backdrop.classList.remove("open");document.body.classList.remove("modal-open");backdrop.setAttribute("aria-hidden","true");
  if(location.hash.startsWith("#service="))history.replaceState(null,"",location.pathname+location.search);
}
function initServiceModals(){
  $$("[data-service]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();openService(el.dataset.service)}));
  const backdrop=$("#service-modal");
  if(backdrop){backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeService()});backdrop.querySelector(".modal-close").addEventListener("click",closeService)}
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeService()});
  const params=new URLSearchParams(location.search);const requested=params.get("service")|| (location.hash.startsWith("#service=")?decodeURIComponent(location.hash.slice(9)):"");
  if(requested){const key=TSE.services[requested]?requested:Object.keys(TSE.services).find(k=>TSE.services[k].title.toLowerCase()===requested.toLowerCase());if(key)setTimeout(()=>openService(key),120)}
}
function initFilters(){
  $$("[data-filter-group]").forEach(group=>{
    const buttons=$$(".filter-btn",group),cards=$$("[data-category]",group.parentElement);
    const apply=btn=>{
      buttons.forEach(b=>b.classList.toggle("active",b===btn));
      const val=btn.dataset.filter;
      cards.forEach(card=>card.classList.toggle("hidden",val!=="all"&&!card.dataset.category.split(" ").includes(val)));
    };
    buttons.forEach(btn=>btn.addEventListener("click",()=>apply(btn)));
    const wanted=new URLSearchParams(location.search).get("category");
    const match=wanted&&buttons.find(b=>b.dataset.filter===wanted);
    if(match)apply(match);
  });
}


async function initCmsContent(){
  try{
    const response=await fetch('data/event-content.json',{cache:'no-store'});
    if(!response.ok)return;
    const content=await response.json();
    $$('[data-cms-text]').forEach(el=>{
      const key=el.dataset.cmsText;
      if(typeof content[key]==='string' && content[key].trim())el.textContent=content[key];
    });
  }catch(error){/* Keep the built-in event copy if CMS content is unavailable. */}
}

function initBrandCarousel(){
  const track=$(".brand-marquee-track"), viewport=$(".brand-marquee"), toggle=$(".brand-motion-toggle");
  if(!track||!viewport)return;
  // Duplicate the logo sequence once so the animation loops continuously.
  if(!track.dataset.cloned){
    const originals=[...track.children];
    originals.forEach(item=>{
      const copy=item.cloneNode(true);
      copy.setAttribute("aria-hidden","true");
      copy.querySelectorAll("img").forEach(img=>img.alt="");
      track.appendChild(copy);
    });
    track.dataset.cloned="true";
  }
  $$(".brand-logo-item img",track).forEach(img=>{
    img.addEventListener("error",()=>img.parentElement.classList.add("logo-fallback-active"),{once:true});
    if(img.complete && img.naturalWidth===0)img.parentElement.classList.add("logo-fallback-active");
  });
  if(toggle){
    toggle.addEventListener("click",()=>{
      const paused=viewport.classList.toggle("is-paused");
      toggle.setAttribute("aria-pressed",String(paused));
      toggle.textContent=paused?"Resume logos":"Pause logos";
    });
  }
}

function initContactForm(){
  $$('[data-contact-form]').forEach(form=>{
    const params=new URLSearchParams(location.search),service=params.get('service');
    if(service && form.elements.service){
      const select=form.elements.service;
      const option=[...select.options].find(o=>o.text.toLowerCase()===service.toLowerCase()||o.value.toLowerCase()===service.toLowerCase());
      if(option)select.value=option.value;
    }
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
    if(/^https?:\/\/images\.unsplash\.com\//.test(url)){const u=new URL(url);u.searchParams.set('w','800');u.searchParams.set('q','80');return u.toString();}
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
    return `<button class="media-tile is-video" type="button" data-index="${index}" data-video="${escapeText(item.videoId)}" aria-label="Play video"><span class="media-poster"></span><span class="media-play" aria-hidden="true"></span></button>`;
  }
  return `<button class="media-tile is-image" type="button" data-index="${index}" aria-label="View photo"><img src="${escapeText(thumbUrl(item.image))}" data-original="${escapeText(item.image)}" alt="" loading="lazy" decoding="async" onerror="if(this.dataset.original&&this.src!==this.dataset.original){this.src=this.dataset.original;}"></button>`;
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

document.addEventListener("DOMContentLoaded",()=>{initNavigation();initReveal();initCounters();initServiceModals();initFilters();initContactForm();initCmsImages();initCmsContent();initBrandCarousel();initPortfolioGalleries()});
