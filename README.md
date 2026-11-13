# Taylor Success Enterprise Website

Static HTML/CSS/JS website. Netlify publishes the repository root. The production domain is `https://taylorssuccessenterprise.com`.

## 1. Upload the website to GitHub

1. Download and extract this ZIP.
2. Open the existing repository: `judesanni/taylorssuccessenterprise`.
3. Upload the contents of the extracted folder to the repository root on the `main` branch. Do not upload the enclosing folder as a nested directory.
4. Check that `index.html`, `work.html`, `gallery.html`, `assets/`, `data/`, and `uploads/` are visible at the repository root.
5. Commit once. Netlify will start the production deploy because `main` is connected. Do not repeatedly redeploy for individual image changes.

For review before production, use a GitHub branch or pull request and its Netlify Deploy Preview. Merge to `main` only after checking the preview.

## 2. Add or replace images in bulk

1. Collect the approved images and rename them clearly, for example `event-rooftop-01.jpg` or `about-taylor-portrait.jpg`.
2. In the repository, open `uploads/` (subfolders such as `uploads/gallery/` or `uploads/about/` are fine). Upload a batch together, then commit once.
3. In Decap CMS at `/admin/`, open **Website Images** to swap a named placement (homepage, About, Events, Resource Center, Work and Services images), or **Portfolio Galleries** to change gallery photos. Choose the already-uploaded file from the media library.
4. If editing JSON directly, use the public path, for example `/uploads/gallery/event-rooftop-01.jpg`, never a local file path.

Recommended sizes: wide hero images about 2000 × 1200 px; portraits about 1200 × 1500 px; gallery photos 1600 px on the long edge. Gallery thumbnails are square and cropped to fill, so keep faces and key subjects near the centre. Clicking a photo opens it uncropped at its original proportions (large images scroll).

## 3. Add or replace Vimeo videos

1. Upload the video to Taylor's Vimeo account and allow embedding on `taylorssuccessenterprise.com` in the video's privacy settings.
2. Copy the numeric ID from the video URL (digits only).
3. In Decap CMS, open **Portfolio Galleries**, pick a gallery (a video can be added to more than one), add a media item with type `video` and paste the ID.
4. Thumbnails are fetched automatically from Vimeo. The video only loads when a visitor clicks it, so the page stays fast.

`data/videos.json` is a reference list of the 28 launch videos with their categories. The site itself reads `data/portfolio-galleries.json`.

## 4. How the gallery and Our Work behave

- Gallery and Our Work show photos and videos together in a random order that changes on every visit. There are no titles or captions.
- The Gallery page filters by category and by photos or videos. Videos that sit in several categories appear once under All work.
- Every tile opens a larger viewer with previous and next arrows (also arrow keys and swipe on phones), Escape to close, and scrolling for tall images.
- The Vimeo player is configured without title, author and portrait. Vimeo's own logo, like, share and watch-later buttons are controlled by each video's Embed settings in Vimeo (a paid-plan feature), not by the website.

## 5. Connect the GoDaddy domain to Netlify

The domain can stay registered at GoDaddy. You do not need to buy GoDaddy hosting.

1. In Netlify, open the Taylor Success Enterprise site, then **Domain management**.
2. Choose **Add a domain** / **Add custom domain** and enter `taylorssuccessenterprise.com`.
3. Netlify will show the DNS records it expects. Keep that screen open. Do not copy DNS values from an old guide because Netlify's displayed values are authoritative for this site.
4. In GoDaddy, open **My Products → Domains → taylorssuccessenterprise.com → DNS / Manage DNS**.
5. Add or update only the records Netlify specifies for the root domain (`@`) and `www`. Netlify commonly uses apex A/ALIAS records and a `www` CNAME, but use the exact values shown in the current Netlify dashboard.
6. Do not delete MX records or unrelated TXT records. They may control email, domain verification or other services.
7. Return to Netlify and wait for DNS verification and the SSL certificate. Set the preferred primary domain (usually the root domain) and confirm the other hostname redirects to it.
8. Test both `https://taylorssuccessenterprise.com` and `https://www.taylorssuccessenterprise.com`, plus `/admin/`, after SSL is active.

DNS changes can take time to propagate. Domain renewal by itself does not connect the domain to Netlify.

## 6. Decap CMS and forms

- CMS address: `https://taylorssuccessenterprise.com/admin/`
- Decap Turbo site ID is set in `admin/config.yml`.
- Ensure the custom-domain admin URL is allowlisted in Decap Turbo and the account has membership to the site. An allowed URL alone does not grant account access.
- In Netlify, enable form detection and configure notifications for `tsenterprisesatlanta@gmail.com`. Submit a real test form after launch. Form delivery is not verified by the ZIP.

## 7. SEO and launch checks

Canonical URLs and the sitemap use the custom domain. After DNS and SSL are active, submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools. No search ranking is guaranteed.

## Verification limits

The archive can be checked locally for HTML references, JSON, YAML, JavaScript syntax, XML and ZIP integrity. Those checks cannot prove live DNS, SSL, CMS login, Vimeo embed permissions, form delivery, external image availability or final visual rendering in every browser.
