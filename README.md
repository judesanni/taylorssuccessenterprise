# Taylor Success Enterprise: website (redesign v4)

Static site: plain HTML, CSS and JavaScript. No build step, no framework, no monthly software fees. Content lives in GitHub, images and the gallery are edited in Decap CMS at `/admin/`.

## 1. Hosting: fix the Netlify "tokens used up" problem

**What is happening.** Netlify moved to credit-based plans. The Free plan includes 300 credits a month. As of this build, a production deploy costs 15 credits (about 20 deploys a month) and bandwidth costs 20 credits per GB (about 15 GB a month). Two things drain that quickly: every CMS save and every upload to GitHub triggers a deploy, and photo-heavy pages use bandwidth. When the credits run out, the site is paused until the next cycle. Check Netlify's pricing page for the current numbers before deciding.

**Recommended: move the site to Cloudflare Pages (free).** The free plan has unlimited bandwidth and requests for static files, 500 builds a month and free HTTPS with custom domains. Nothing else about the setup changes: GitHub stays the source of truth, the GoDaddy domain stays, Decap CMS keeps working (its login does not depend on Netlify).

1. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > choose the repository.
2. Build settings: framework preset **None**, build command empty, build output directory `/` (or `.`). Deploy.
3. Custom domains > add `taylorssuccessenterprise.com` and `www`. Follow Cloudflare's DNS instructions at GoDaddy (changing the nameservers to Cloudflare is the simplest route). Set the root domain as primary and redirect `www` to it.
4. **Contact form.** Netlify Forms only works on Netlify, so on Cloudflare the form needs a free form service. Easiest: create a free Web3Forms (or Formspree) form that emails `tsenterprisesatlanta@gmail.com`, then in `contact.html` set on the `<form>` tag:
   - `data-endpoint="https://api.web3forms.com/submit"` and `data-access-key="YOUR_KEY"` (Web3Forms), or
   - `data-endpoint="https://formspree.io/f/YOUR_ID"` (Formspree, leave `data-access-key` empty).
   The site already handles the submit, the redirect to the thank-you page and a friendly error message. Leave both attributes empty to keep using Netlify Forms.
5. Turn off the old Netlify site once the new one works.

**If you stay on Netlify instead:** publish in batches (collect several edits, then deploy once), turn off deploy previews and branch deploys you do not need, use "Stop auto publishing" and publish manually, and keep photos small (see section 3). The site is built to be light: gallery tiles use small copies of each photo, videos only load on click, and fonts are self-hosted. Even so, 20 deploys a month is the ceiling on the Free plan.

`_headers` (caching and security headers) works on both Netlify and Cloudflare Pages.

## 2. What is on the site

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero with the faded Resource Center photo and logo carousel, Resource Center funding feature, Meet Taylor, services, press pass, photo collage, FAQ |
| Resource Center | `resource-center.html` | The funding case: opportunity, five service areas, the $150,000 ask, growth targets, three ways to get involved, founder, FAQ |
| About | `about.html` | Story, Business. People. Impact., what Taylor is building next, at-a-glance facts, FAQ |
| Services | `services.html` | Six services with anchors, FAQ |
| Work / Gallery | `work.html`, `gallery.html` | Category tiles that open galleries; the full filterable gallery (28 Vimeo videos and 27 photos) |
| Events | `events.html` | Grammy season gathering and past event posters |
| Contact | `contact.html` | Inquiry form (includes Resource Center funding and early-interest options) |
| Legal | `privacy.html`, `terms.html`, `cookies.html` | Policies |

**Navigation:** About, Services, Work (dropdown: Highlights, Full gallery, with the current page marked), Events, Resource Center, plus a "Work with Taylor" button.

**Look and feel:** warm cream and near-black with cobalt night gradients, champagne gold and a rose-pink accent. Bricolage Grotesque and Instrument Serif, self-hosted. Motion: a slow drift on the hero photo, a logo carousel that fades at the edges, marquees, a spotlight cursor ring with labels, a paparazzi-flash photo trail in the hero (desktop only) and a photo that follows the pointer over service rows. All motion switches off for visitors who prefer reduced motion, and cursor effects do not run on touch devices.

**Logos ("As featured on").** NBC, Tubi, CBS and iHeartRadio are bundled in `assets/logos/` (from the open Simple Icons set). BET and MTV load from Wikimedia Commons, which always serves the current version of each logo. Any logo that fails to load is skipped automatically. To change the lineup, edit the `LOGOS` list in the page or drop SVG files into `assets/logos/` and add an `<img>` to the strip in `index.html`. Logos are shown in white and belong to their owners.

## 3. Editing content

**Photos.** Upload to `uploads/` in GitHub (or the CMS media library), then open `/admin/` > Website Images and choose the new file for any placement (each is labelled, for example "Home: faded hero background"). Gallery photos and videos are under Portfolio Galleries. Keep each photo under about 400 KB: every extra megabyte on the page costs bandwidth. Gallery tiles use the small copies in `uploads/taylor/t/`; photos uploaded through the CMS are resized automatically on Netlify and shown at full size elsewhere.

**Videos.** Upload to Vimeo, allow embedding for `taylorssuccessenterprise.com`, copy the numeric ID and add a `video` item to one or more galleries. Thumbnails load automatically. Vimeo's own logo and buttons are controlled in each video's Embed settings on Vimeo (paid plans).

**Grammy section text.** `/admin/` > Website Content > Grammy season event.

**Everything else** (copy, services, FAQs) is in the HTML files.

## 4. SEO, AEO and GEO built in

- Unique title, description, canonical URL and share image on every page.
- JSON-LD: ProfessionalService/Organization, Person (Taylor Frucel, also Taylor Stubbs Frucel), WebSite, Services, FAQPage on home, about, services and the Resource Center page, breadcrumbs.
- Answer-first FAQs written as questions with short factual answers, different on each page.
- Consistent entity facts and `sameAs` links to Instagram, Facebook, LinkedIn, YouTube and Eventbrite; `llms.txt`, `robots.txt` and `sitemap.xml`.
- One H1 per page, descriptive alt text, skip link, keyboard-friendly menus, visible focus states.

**After launch:** add the site to Google Search Console and Bing Webmaster Tools and submit `https://taylorssuccessenterprise.com/sitemap.xml`; claim a Google Business Profile with the same name, phone and email; link the site from every social profile; link the Resource Center page from any funding application, press mention or partner page, since that page is written to stand on its own.

## 5. Confirmed and still worth a quick check

Confirmed by Taylor: 5-time award-winning publicist, 280+ blogs and media outlets, phone number (443) 347-3239.

Please double-check before launch: the "Press pass" list on the home page (taken from the media kit), that the Resource Center image is acceptable as an illustration of the intended space, and the Grammy season details once they are public.
