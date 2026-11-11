
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
    buttons.forEach(btn=>btn.addEventListener("click",()=>{
      buttons.forEach(b=>b.classList.toggle("active",b===btn));
      const val=btn.dataset.filter;
      cards.forEach(card=>card.classList.toggle("hidden",val!=="all"&&!card.dataset.category.split(" ").includes(val)));
    }));
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


async function initPortfolioGalleries(){
 const modal=$("#portfolio-gallery"), modalGrid=$("#gallery-modal-grid"), modalTitle=$("#gallery-modal-title"), allGrid=$("#media-gallery");
 if(!modal||!allGrid)return;
 let data={galleries:[]}, videos={videos:[]};
 try{[data,videos]=await Promise.all([fetch('data/portfolio-galleries.json').then(r=>r.json()),fetch('data/videos.json').then(r=>r.json())]);}catch(e){return;}
 const videoMap=new Map((videos.videos||[]).map(v=>[v.id,v]));
 const tile=(item)=>{if(item.type==='video'&&item.videoId){const title=item.title||videoMap.get(item.videoId)?.title||'Taylor video';return `<article class="media-tile"><iframe src="https://player.vimeo.com/video/${encodeURIComponent(item.videoId)}?title=0&byline=0&portrait=0" title="${escapeAttr(title)}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><div class="media-caption">${escapeAttr(title)}</div></article>`;}if(item.image&&!item.image.includes('gallery-placeholder'))return `<article class="media-tile"><img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title||'Taylor Success Enterprise portfolio image')}" loading="lazy"><div class="media-caption">${escapeAttr(item.title||'Project image')}</div></article>`;return `<article class="media-tile media-placeholder"><div><strong>${escapeAttr(item.title||'Gallery image placeholder')}</strong><span>Replace image path in data/portfolio-galleries.json</span></div></article>`;};
 const allItems=(data.galleries||[]).flatMap(g=>(g.items||[]).map(i=>({...i,category:g.title})));
 allGrid.innerHTML=allItems.map(i=>tile(i)).join('');
 $$('#gallery-filters [data-gallery-filter]').forEach(btn=>btn.addEventListener('click',()=>{ $$('#gallery-filters .filter-btn').forEach(b=>b.classList.toggle('active',b===btn)); const f=btn.dataset.galleryFilter; allGrid.innerHTML=allItems.filter(i=>f==='all'||i.type===f).map(i=>tile(i)).join('');}));
 $$('[data-gallery-category]').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();const g=(data.galleries||[]).find(x=>x.id===card.dataset.galleryCategory);if(!g)return;modalTitle.textContent=g.title;modalGrid.innerHTML=(g.items||[]).map(tile).join('');modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}));
 $$('[data-gallery-close]').forEach(el=>el.addEventListener('click',()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');modalGrid.innerHTML='';document.body.classList.remove('modal-open');}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open')){$('[data-gallery-close]').click();}});
}

document.addEventListener("DOMContentLoaded",()=>{initNavigation();initReveal();initCounters();initServiceModals();initFilters();initContactForm();initCmsImages();initCmsContent();initBrandCarousel();initPortfolioGalleries()});
