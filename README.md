# Taylor Success Enterprise Website

Static HTML/CSS/JS site deployed from the repository root on Netlify. Production domain: https://taylorssuccessenterprise.com

## Deploy
Extract the ZIP and upload its contents to the root of the GitHub repository on `main`. Do not nest the files in an extra folder. Netlify publishes the repository root; no build command is required. Use a deploy preview to inspect before publishing production.

## Images
Bulk-add approved images into `uploads/` (subfolders are supported), commit them to GitHub, then select existing files in Decap. Each rendered image placement has its own independent field in `data/site-images.json`; changing one placement will not change another. `admin/config.yml` contains the Decap field list.

## Portfolio galleries
`data/portfolio-galleries.json` controls the six portfolio galleries and central media gallery. Each gallery has ten initial entries. Replace placeholder image paths with uploaded image paths, or edit/add video entries with a Vimeo ID. The same data powers the modal portfolio windows and the central gallery.

## Vimeo videos
`data/videos.json` stores the supplied Vimeo IDs and provisional labels. The original URL list and title list were supplied in different orders, so ID-to-title matches have not been verified. Check titles against Vimeo before treating them as final. Update `portfolio-galleries.json` to control which videos appear in which portfolio category. Embed privacy must allow this domain.

## Decap CMS
Admin: `/admin/`. Decap Turbo site ID is retained. Ensure the production admin URL is allowlisted in Decap Turbo and the account has site membership. `site_url` is configured to the custom domain.

## Netlify Forms
Enable form detection, configure notifications to `tsenterprisesatlanta@gmail.com`, and submit a real test after deployment. Form delivery has not been verified by this build.

## Domain / SEO
Canonical URLs, sitemap, robots and `llms.txt` use the custom domain. Confirm DNS points to Netlify and SSL is active before launch. Preserve existing MX and unrelated TXT records. Submit the sitemap to Google Search Console and Bing Webmaster Tools after DNS is live.

## Verification limits
Local structural checks can validate HTML references, JSON, YAML and JavaScript syntax. They cannot verify live DNS, Decap authentication, Vimeo privacy, form email delivery, external images, or actual browser rendering.
