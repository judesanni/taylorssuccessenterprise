# Taylor Success Enterprise Website

Static, responsive multi-page website for Taylor Success Enterprise. Deploys from GitHub to Netlify and uses Decap Turbo for image management plus a small editable content file for the Grammy-season event preview.

## Included

- `index.html`, `about.html`, `services.html`, `work.html`, `events.html`, `resource-center.html`, `contact.html`
- Legal pages: `privacy.html`, `terms.html`, `cookies.html`
- `thank-you.html` for the contact form redirect
- `assets/styles.css`, `assets/site.js`
- `admin/config.yml`, `admin/index.html` for Decap CMS
- `data/site-images.json` for CMS-managed image slots
- `data/event-content.json` for the editable Grammy-season event preview copy
- `uploads/.gitkeep` as the image upload destination
- `robots.txt` and `sitemap.xml` for basic technical SEO
- `netlify.toml` with static publishing and basic security headers

The legal pages are practical website copy, not legal advice. Review them against the actual business, data practices, and applicable requirements before launch.

## Deployment information

- GitHub repository: `judesanni/taylorssuccessenterprise`
- Branch: `main`
- Current Netlify preview: `https://fascinating-sundae-4685be.netlify.app`
- Intended custom domain: `https://taylorssuccessenterprise.com`
- Decap Turbo Site ID: `5b0cfd08-3a1d-4bad-b214-b8e563504b97`
- Contact phone: `(443) 347-3239`
- Contact email: `tsenterprisesatlanta@gmail.com`

Upload the extracted contents of this ZIP to the repository root. Do not upload the ZIP itself and do not put the files inside an extra nested folder. The repository root should directly contain `index.html`, `netlify.toml`, `admin/`, `assets/`, and `data/`.

## Before publishing

1. Review the copy, phone number, email, Instagram URL, and Eventbrite link.
2. Replace the homepage portrait placeholder with Taylor's approved professional portrait. The stock portrait is not Taylor.
3. Replace stock event and portfolio imagery with real, approved photos when available. Do not present illustrative stock photos as actual client work.
4. Keep only brand marks Taylor has permission to display and that accurately represent her relationship with each organization. The logo strip includes visual placeholders and does not assert endorsement or a working relationship.
5. Confirm the Grammy-season concept with Taylor before promoting it. The 2027 GRAMMY Awards are scheduled for February 7, 2027; the proposed Taylor Success Enterprise event has no confirmed date, venue, hosts, lineup, ticketing, or affiliation. The website clearly labels it as a separate concept and not an official GRAMMY Awards event.
6. Confirm the final domain, renew it if needed, and connect it to Netlify as described below.

## Netlify deployment and credit-saving approach

This is a static HTML site. `netlify.toml` publishes the repository root (`.`); no build command is needed.

1. Make the planned changes in GitHub and batch them into one commit where possible.
2. Wait for the automatic Netlify deploy to complete.
3. Test the preview site before connecting the custom domain.
4. Avoid repeated production deploys for tiny copy changes while preparing the launch. Decap saves to GitHub and normally triggers a Netlify deploy, so each published CMS change can also use deploy/usage credits.
5. Check current Netlify usage and plan limits in the dashboard. Limits and credit costs can change.

## Decap Turbo CMS

Open the CMS at:

`https://fascinating-sundae-4685be.netlify.app/admin/`

The current `admin/config.yml` contains the supplied Turbo Site ID and the current Netlify preview URL.

### Editable in Decap

- **Website Images → Image Library:** image slots in `data/site-images.json`, including the homepage portrait slot, homepage feature images, service galleries, portfolio imagery, and the Grammy-season event image.
- **Website Content → Grammy Season Event:** eyebrow, title, short introduction, event description, timing label, location, registration status, and inquiry button label stored in `data/event-content.json`.

The rest of the website's copy and structure are still coded into the HTML. Decap does not yet edit all page text, service entries, portfolio cards, or create new events. Those changes require a code update or a further CMS configuration.

### How image uploads work

- `media_folder: "uploads"` means new uploads are committed into the repository's `uploads/` folder.
- `public_folder: "/uploads"` means the published site references uploaded files from `/uploads/...`.
- The folder now exists with a `.gitkeep` file. Decap can add image files when an editor uploads and saves them.
- The current image library starts with external Unsplash image URLs. When replacing a slot, choose/upload the approved image and publish. Confirm the generated path and public image after the Netlify deployment.
- Prefer optimized JPG/WebP images, ideally around 500 KB or less where practical, with a long edge around 1600–2200 px.
- Upload only images the business owns or has permission to publish. Taylor's permission to download her own content does not automatically clear third-party people, music, or other assets visible in a post.

### CMS access and authentication

The Decap Turbo dashboard must have GitHub connected and authorized for `judesanni/taylorssuccessenterprise` on branch `main`. In the Turbo site's settings, make sure the allowed Admin interface URL includes:

`https://fascinating-sundae-4685be.netlify.app/admin/`

Do not share passwords. If Taylor needs a separate login, check the current Decap Turbo seat and ownership terms first.

### After the custom domain is connected

1. Add the exact URL `https://taylorssuccessenterprise.com/admin/` to the allowed Admin interface URLs in Decap Turbo.
2. Update `site_url` in `admin/config.yml` to `https://taylorssuccessenterprise.com`.
3. Commit and deploy that config change.
4. Test the CMS at the custom-domain `/admin/` address and confirm sign-in and image publishing.
5. Keep `turbo_site_id` and `branch: main` unchanged unless the Decap Turbo site or repository branch itself changes.

### Important limitation about current external image URLs

The website currently loads the values in `data/site-images.json` dynamically and uses a fallback image if the JSON cannot be loaded. The existing values are remote Unsplash URLs. Decap's image widget is configured for uploads into `/uploads`; when an image is replaced, confirm the CMS saves a usable path and that the updated image appears on the deployed site. If the image picker refuses to display a remote URL value, replace that slot with an uploaded image rather than trying to type a remote URL into the image picker.

## Contact form

The contact form is configured for Netlify Forms with the name `project-inquiry`, a hidden form-name input, a honeypot field, and a redirect to `/thank-you.html`.

After deploying:

1. Open the site in Netlify and check **Forms**.
2. If form detection is disabled, enable it and trigger a deploy so Netlify scans the HTML.
3. Confirm `project-inquiry` appears.
4. Configure a submission email notification for `tsenterprisesatlanta@gmail.com`.
5. Submit a real test enquiry. Verify the submission appears in Netlify Forms and the email arrives (check spam/junk too).
6. Restrict dashboard access because submissions contain personal information.

A thank-you redirect alone does not prove a submission was stored. Verify the dashboard entry and notification.

## Custom domain through GoDaddy

The site can remain hosted on Netlify while the domain is registered at GoDaddy. Do not buy GoDaddy web hosting just to publish this static site.

1. In Netlify, open Domain management and add `taylorssuccessenterprise.com` (and `www` if appropriate).
2. Follow the exact DNS records Netlify gives you for this site.
3. In GoDaddy DNS management, change only the records needed for the website. Do not delete MX records or unrelated TXT records, as these may control email and verification.
4. Wait for DNS propagation and Netlify HTTPS provisioning.
5. Test the root domain, `www` redirect, all pages, contact form, CMS sign-in, and images.

Domain renewal does not automatically renew a separate email subscription. Confirm the exact domain renewal product and price in Taylor's GoDaddy account before paying.

## Basic SEO included

- Unique page titles and meta descriptions
- Canonical URLs using the intended custom domain
- Open Graph and Twitter sharing metadata
- `robots.txt` and `sitemap.xml`
- `ProfessionalService` structured data on the homepage
- Existing semantic headings, page descriptions, and image alt text
- `thank-you.html` marked `noindex, nofollow`

The canonical URLs and sitemap already use `taylorssuccessenterprise.com`, which is the intended launch domain. Do not treat the SEO setup as fully live until that domain resolves to this Netlify site.

### After launch

1. Verify the domain uses HTTPS and the canonical URL is correct.
2. Set up Google Search Console and submit `https://taylorssuccessenterprise.com/sitemap.xml`.
3. Optionally verify the site in Bing Webmaster Tools.
4. Replace all placeholders with approved business details and real work.
5. Add useful case studies, event recaps, service details, and testimonials only when accurate and approved.
6. Check index coverage and search queries over time. No SEO setup can guarantee ranking or immediate visibility.

## Logo carousel and brand usage

The homepage includes a continuously moving logo-reference strip with a pause button and reduced-motion support. Most logo images load from Wikimedia Commons file redirects; the Invest Fest 2026 logo is referenced from the official Invest Fest site. The Invest Fest asset is a 2026 placeholder, not a confirmed 2027 event identity. Zeus Network loads from a Wikimedia file reference. If a remote logo is unavailable, a text fallback appears. Confirm permissions and relationship accuracy before launch; remove any brand that is not approved. The assets are externally hosted rather than bundled locally, so check their loading before launch.

## Grammy-season event concept

The Events page includes an **in-development** preview for a separate event concept around the February 2027 GRAMMY Awards season. The official awards date is February 7, 2027, according to the Recording Academy: https://www.grammy.com/news/2027-grammys-show-air-date-nominations-announced/

The event preview intentionally says that its date, venue, hosts, and registration are not confirmed. It is not described as an official GRAMMY event and includes a non-affiliation disclaimer. The photo is a generic live-event placeholder; the GRAMMY Awards lockup is a logo reference, not official 2027 event artwork. Replace both with approved assets before a public promotional push.

## Launch QA checklist

- [ ] Confirm the domain is renewed and owned/managed by the right person.
- [ ] Replace the stock portrait with Taylor's approved portrait via Decap.
- [ ] Replace stock photos with approved photos where available.
- [ ] Confirm featured logos and relationships with Taylor; remove unapproved marks.
- [ ] Confirm Grammy-season event concept, wording, date, location, host, and CTA with Taylor.
- [ ] Test all pages, desktop/mobile navigation, active navigation underline, links, filters, and service modals.
- [ ] Test the moving logo carousel, pause control, and reduced-motion behaviour.
- [ ] Test image replacement and event copy editing in Decap.
- [ ] Verify the Netlify contact form, submission storage, and email notification.
- [ ] Connect custom domain and HTTPS without disturbing email DNS.
- [ ] Update Decap's allowed admin URL and `site_url` after the custom domain is live.
- [ ] Submit sitemap to Google Search Console and verify indexing later.
- [ ] Confirm final site ownership, GitHub/Netlify/Decap access, and ongoing maintenance arrangements.

## Official reference links

- Decap Turbo setup: https://decapcms.org/docs/turbo-getting-started/
- Decap Turbo site connection: https://decapcms.org/docs/turbo-connecting-a-site/
- Netlify Forms: https://docs.netlify.com/forms/setup/
- Google Search Console: https://search.google.com/search-console/
- 2027 GRAMMY Awards official date announcement: https://www.grammy.com/news/2027-grammys-show-air-date-nominations-announced/
