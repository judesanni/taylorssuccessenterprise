# taylorssuccessenterprise
Website
[README.md](https://github.com/user-attachments/files/33851538/README.md)
# Taylor Success Enterprise — Netlify + Decap CMS website

This is a static, multi-page website prepared for deployment through Netlify and image management through Decap CMS with the Decap Turbo GitHub backend.

## Included pages and tools

- `index.html` — Home
- `about.html` — About Taylor
- `services.html` — Services and service-detail modals
- `work.html` — Portfolio categories
- `events.html` — Events and official Eventbrite organizer link
- `resource-center.html` — Proposed Community Resource & Event Center
- `contact.html` — Inquiry form configured for Netlify Forms
- `thank-you.html` — Post-submission confirmation page
- `privacy.html` — Privacy Policy
- `terms.html` — Terms & Conditions
- `cookies.html` — Cookie Policy
- `admin/` — Decap CMS image-editing dashboard
- `data/site-images.json` — Image slots managed through the CMS
- `uploads/` — Destination for images uploaded in the CMS

The legal pages are practical website copy, not a substitute for advice from a qualified attorney. Review the legal pages against the actual business, data practices, contracts, and applicable law before launch.

## Recommended order of setup

1. Confirm the code is in GitHub repository `judesanni/taylorsuccessenterprise` on branch `main`.
2. Connect that repository to Netlify and deploy the site.
3. Confirm Netlify Forms detects the contact form and set up an email notification.
4. Configure Decap Turbo and the image editor.
5. Test all site functions and image editing on the Netlify preview URL.
6. Connect `taylorssuccessenterprise.com` in Netlify and update DNS in GoDaddy.
7. Re-test forms, HTTPS, CMS sign-in, and all pages on the custom domain.

## 1. Deploy from GitHub to Netlify

1. Sign in to Netlify and choose **Add new site / Import an existing project** (the exact label may vary).
2. Choose GitHub and authorize Netlify to access the repository `judesanni/taylorsuccessenterprise`.
3. Select branch `main`. This is a plain static HTML site, so no build command is required. The included `netlify.toml` publishes the repository root (`.`).
4. Deploy. Open the generated `https://your-site-name.netlify.app` address and test the pages.
5. For future updates, upload/commit changes to GitHub. Netlify will automatically redeploy the branch connected to the site.

Do not upload the ZIP file itself into the repository. Upload the ZIP's extracted contents so that `index.html`, `netlify.toml`, `assets/`, `admin/`, and the other files are at the repository root, not buried inside an extra nested folder.

## 2. Netlify Forms: collect submissions and send email alerts

The contact form is configured with `data-netlify="true"`, a unique `name="contact"`, a hidden `form-name`, required fields, a spam honeypot, and a redirect to `/thank-you.html`.

After the first deploy:

1. Open the site in Netlify and go to **Forms**.
2. If form detection is disabled, enable it, then trigger a new deploy so Netlify scans the static HTML.
3. Confirm a form named `contact` appears. If it does not, check the deployed `contact.html` and redeploy.
4. Under **Forms → Submission notifications** (or the current equivalent), add an email notification for `tsenterprisesatlanta@gmail.com`.
5. Submit a real test inquiry from the deployed website. Confirm the thank-you page appears, the submission is visible in Netlify's Forms dashboard, and the email arrives. Check spam/junk. The email notification is not configured by the HTML itself.
6. Restrict Netlify dashboard access to trusted administrators because submissions contain personal information. Periodically review and delete submissions that no longer need to be retained.

Netlify's interface and plan limits can change. Check the current plan and usage limits before launch. A successful thank-you redirect alone is not proof that the submission was stored; verify both the dashboard entry and notification.

## 3. Decap CMS: allow Taylor to change images

The CMS at `/admin/` edits the image paths in `data/site-images.json`; image uploads are stored in `uploads/`. It does not currently provide a full visual editor for page text, events, or portfolio entries.

### Important ownership and seat decision

Decap Turbo's free organization currently includes one site and one seat. If Taylor must be the only CMS editor, the cleanest ownership arrangement is for Taylor to own the Decap Turbo organization and use her own login. Since the GitHub repository is owned by `judesanni`, the GitHub repository owner must authorize the Decap Turbo GitHub App for this repository. Do not share passwords. If both Jude and Taylor need separate Decap Turbo logins, check current seat pricing first.

### Configure Decap Turbo

1. First deploy the site to Netlify so the `/admin/` URL exists.
2. Open Decap Turbo at `https://decapcms.org/turbo/`. Create the organization/account that will own the CMS site. The free plan is currently one site and one seat; verify current terms.
3. In the Turbo organization, open **Git connection** and connect GitHub. Install/authorize the Decap Turbo GitHub App for the repository `judesanni/taylorsuccessenterprise`. Since the repository is under Jude's GitHub account, the account owner must approve access and select only this repository if the installation screen offers repository scoping.
4. Create a Turbo site using GitHub repository `judesanni/taylorsuccessenterprise`, branch `main`, and config path `admin/config.yml`.
5. In the site's settings/Overview, add the Netlify admin URL as an allowed **Admin interface URL**. Use the generated URL first, for example `https://YOUR-SITE-NAME.netlify.app/admin/`. Add `https://taylorssuccessenterprise.com/admin/` after the custom domain is live. The exact URL must match the real deployed site.
6. Copy the Turbo **Site ID** from its Overview page.
7. Edit `admin/config.yml` in GitHub. Replace `YOUR_DECAP_TURBO_SITE_ID` with the copied ID and replace `https://YOUR-NETLIFY-SITE.netlify.app` with the actual Netlify URL. Keep `backend.name: turbo-github` and `branch: main`. Do not add a `repo` field; Turbo's site dashboard is authoritative for the repository.
8. Commit the changes to `main` and wait for Netlify to redeploy.
9. Open `https://YOUR-SITE-NAME.netlify.app/admin/`, sign in with the Turbo account that has access to this site, and open **Website Images → Image Library**.
10. Replace one low-risk image first, save/publish, wait for the Netlify deploy, and verify the updated image on the public site. Then test the remaining image slots as needed.
11. After connecting the custom domain, add that exact `/admin/` URL to the Turbo site's allowed admin URLs and test sign-in again.

### What image editing does and does not cover

Taylor can replace the 29 configured image slots. She can upload images, choose them for a slot, and publish the change without editing HTML or CSS. The CMS does not currently let her add brand-new portfolio entries, write event listings, change all page text, or change the site layout. Those changes require code/CMS-model updates by the developer. Use optimized JPG or WebP images, preferably under about 500 KB each where practical, with a long edge around 1600–2200 px. Only upload images the business owns or has permission to publish. Replace illustrative stock photos with approved client/project images before representing them as real work or Taylor herself.

## 4. Can CloudCannon be used to test?

Yes. You can create a CloudCannon account and use its trial to connect the same GitHub repository and evaluate its visual editor. The official pricing page currently lists a 21-day trial and a paid Standard plan; confirm the current price and trial terms before starting. CloudCannon is a separate CMS/editor option, not an extra requirement for Netlify or Decap.

Do not configure Decap CMS and CloudCannon as two production editors for the same content at the same time. They are separate systems and can create confusing workflows or conflicting changes. For this project, Decap is already configured specifically for the image slots. CloudCannon may be better if you later want broader visual editing of text and page content, but the existing HTML would need testing and possibly additional CloudCannon-specific editable regions/configuration. A trial ending does not mean it remains free.

Official CloudCannon pricing: https://cloudcannon.com/pricing/
Official Decap Turbo setup: https://decapcms.org/docs/turbo-getting-started/
Official Decap Turbo site connection: https://decapcms.org/docs/turbo-connecting-a-site/

## 5. Connect the GoDaddy domain to Netlify

The domain intended for this site is `taylorssuccessenterprise.com`. Keep the domain registered at GoDaddy if desired; hosting can be Netlify. You do not need to transfer the domain registration or change nameservers to connect it.

1. In Netlify, open the deployed site and go to **Domain management** (sometimes called **Domains** or **Site configuration → Domain management**).
2. Choose **Add a domain / Add custom domain** and enter `taylorssuccessenterprise.com`. Add `www.taylorssuccessenterprise.com` too if Netlify does not add it automatically. Follow the exact DNS instructions shown by Netlify for this site.
3. In a separate tab, sign in to GoDaddy and open **My Products → Domains → taylorssuccessenterprise.com → DNS / Manage DNS**.
4. Add or update only the DNS records Netlify instructs you to use. Commonly, the apex/root `@` is connected with the A/ALIAS-style record Netlify specifies and `www` is connected with a CNAME to the Netlify site hostname, but follow the live instructions shown for this site rather than relying on copied example values.
5. Remove only conflicting records for the same host (`@` or `www`) if Netlify says they conflict. **Do not delete MX records or unrelated TXT records**, because those may control the client's email, domain verification, or other services.
6. Save the DNS changes and wait for propagation. This can be quick or take up to 24–48 hours depending on DNS caching and registrar behavior.
7. Return to Netlify's Domain management and wait for the domain to verify and HTTPS/TLS certificate to provision. Set `taylorssuccessenterprise.com` or `www` as the primary domain, then ensure the other version redirects to it.
8. Test both `https://taylorssuccessenterprise.com` and `https://www.taylorssuccessenterprise.com`; check that one redirects consistently to the chosen primary domain and the browser shows a valid secure connection.
9. After the domain works, add `https://taylorssuccessenterprise.com/admin/` (and the `www` version only if used) to Decap Turbo's allowed admin URLs. Update `site_url` in `admin/config.yml` to the actual primary public URL if desired, commit, and let Netlify redeploy.

**Email warning:** changing nameservers is not required for this setup. If you do decide to change nameservers, first migrate and verify all email-related DNS records. For this task, editing only the necessary GoDaddy DNS records is safer.

## 6. Legal pages and cookies

The website now includes Privacy Policy, Terms & Conditions, and Cookie Policy pages linked from the footer across the site. The contact form's required consent checkbox links to the Privacy Policy; the marketing updates checkbox is optional and separate.

The current site does not intentionally include analytics or advertising pixels, so a cookie-consent banner has not been added. It does request third-party fonts and images, and the policy discloses that. If analytics, ad pixels, embedded social feeds/videos, or other non-essential tracking are added later, reassess cookie consent and update the policy before enabling those tools. Have the business's attorney review the legal pages before launch; no generic policy can guarantee compliance in every situation.

## 7. Final launch checklist

- [ ] All pages load from the Netlify preview URL and custom domain.
- [ ] Main navigation, mobile navigation, CTAs, service modals, portfolio filters, and Eventbrite link work.
- [ ] Legal links appear in the footer on every page; Privacy Policy link opens from the contact form consent text.
- [ ] Netlify detects the `contact` form after deployment.
- [ ] A real form submission appears in Netlify Forms and an email alert reaches `tsenterprisesatlanta@gmail.com`.
- [ ] Invalid or missing required fields are blocked by browser validation.
- [ ] Thank-you redirect works and form submission is actually stored.
- [ ] The spam honeypot field remains hidden and is named `bot-field`.
- [ ] Decap Turbo Site ID and real Netlify URL have replaced placeholders in `admin/config.yml`.
- [ ] Decap sign-in works from the deployed `/admin/` URL; the CMS can update an image and publish a new deploy.
- [ ] The custom domain resolves to Netlify and HTTPS is active for the primary domain.
- [ ] GoDaddy email-related MX/TXT records remain intact.
- [ ] Replace stock/illustrative imagery with client-approved imagery where appropriate.
- [ ] Confirm client metrics, social links, service descriptions, event details, and proposed funding content before public launch.
- [ ] Keep Netlify, GitHub, and Decap access limited to authorized people; use individual accounts and strong passwords.

## 8. Maintenance

- **Images:** `/admin/` after Decap setup.
- **Text, layout, code, new work/event entries:** GitHub code changes and commit, or extend the CMS content model first.
- **Form entries and email alerts:** Netlify dashboard → Forms.
- **DNS and domain registration:** GoDaddy DNS; Netlify manages hosting and HTTPS.
- **CMS authentication and allowed admin URLs:** Decap Turbo dashboard.
