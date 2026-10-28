# Anja Goder static website

The publishable site is in `docs/`. It contains plain HTML, CSS, JavaScript, images, and fonts. There is no build step, package installation, PHP, WordPress runtime, or database requirement.

## Preview

Serve `docs/` with any static HTTP server. For example:

```sh
python3 -m http.server 8074 --directory docs
```

Open http://localhost:8074. Use an HTTP server for preview; browser search loads its index with `fetch`.

## GitHub Pages

Push this project to your GitHub repository. In Settings → Pages, choose **Deploy from a branch**, select the branch and `/docs` folder, then save. `.nojekyll` disables Jekyll processing. No workflow or build command is needed.

The site currently uses the temporary GitHub Pages address: https://mazewebarchitect.github.io/anjagoder.com/.

There is no `CNAME` file and no custom domain is configured. The official domain remains inactive. Navigation and assets use relative paths so they work under the repository subdirectory. Canonical URLs, social-sharing URLs, and the sitemap currently point to the temporary address. When the official domain is approved, update those public URLs, add a `CNAME`, and configure the domain and DNS at that time.

Only publish `docs/`. The supplied `original/` backup and local `.migration/` workspace are ignored by Git. They contain the database and local reference environment and must stay out of the published site.

## Forms

Edit `docs/assets/config.js` directly:

- `formsparkFormId`: the ID from your Formspark endpoint.
- `botpoisonPublicKey`: your Botpoison public key.
- `mailchimpAction`: the HTTPS action URL from your Mailchimp embedded signup form.

In Formspark, select Botpoison as the spam protection provider and enter the Botpoison **secret** key there. Never place the secret key in this repository. The browser solves the challenge and sends its solution to Formspark. Configuration follows the [Formspark integration documentation](https://documentation.formspark.io/setup/spam-protection.html) and [Botpoison challenge documentation](https://botpoison.com/documentation/challenge/getting-started/).

The contact form retains entered text after a failure and displays a success message only after a successful response. Until both contact settings are supplied, it displays the existing email address and sends nothing. Newsletter signup opens Mailchimp's hosted response in another tab when configured. Until then it displays an unavailable message. Both forms use browser field validation.

After configuration, test delivery using your own address. Successful delivery and spam rejection cannot be verified without the account configuration.

## Editing

Edit each page's `index.html` directly. Shared presentation styles live in `docs/assets/styles/` and `docs/assets/theme/css/`; new overrides live in `docs/assets/site.css`. Site integrations and search are in `docs/assets/site.js`. Photography is in `docs/assets/media/`. Published CSS and JavaScript are minified. Readable copies of the custom assets are kept under `source/assets/` for maintenance; changes there must also be copied/minified into the corresponding `docs/assets/` files. The site runs and deploys directly from `docs/`, without a build step.

Presentation classes and script identifiers use the `anja_goder` namespace. Unused theme features, page-builder JavaScript, WordPress bookkeeping classes, and empty AJAX controls have been removed. The remaining gallery and menu behavior preserves the existing appearance. Server loading code was removed; the project index contains all 15 projects in its HTML. Gallery load-more reads image data embedded in each page. Browser search reads `docs/assets/search.json`; update that file and `docs/sitemap.xml` when adding or changing content.

## Migration scope and checks

Migrated 50 published content pages: 10 pages, 10 posts, 15 projects, and 15 albums. Also preserved linked author and tag archive pages, and added search and a 404 page. Existing content paths are retained. Author links now use `/author/anjagoder/`, and Blog category links use `/blog/`. Old Mario and Antoine author addresses redirect to Anja Goder. All published albums were included, including the theme demonstration albums present in the backup.

The backup has three draft event records and no published events. The public Events page retains its empty state. Drafts, subscribers, form submissions, credentials, administrative files, and the database are excluded from the output.

The backup's original coming-soon background was missing; its largest available derivative is used. A missing lightbox stylesheet was restored. Social sharing and canonical URLs point to the temporary GitHub Pages address. The contact form was added below the original email link and photo strip.

Local file checks cover HTML links, images, gallery data, responsive image sources, stylesheet dependencies, and scripts. Browser checks cover the homepage, project listing, gallery load-more and lightbox, contact fallback, newsletter fallback, search, and narrow layouts. External destinations, YouTube availability, newsletter delivery, and real contact delivery remain dependent on their providers.

The local WordPress reference uses Docker containers `anja-reference-web74` and `anja-reference-db` and is available at http://localhost:8073 while running. It is solely a migration reference. Its files are in `.migration/reference`; `original/` is unchanged.

The review preview runs in Docker container `anja-static-preview` at http://127.0.0.1:8074. Stop it with `docker stop anja-static-preview` when finished.

## Asset cleanup checks (2026-10-28)

The cleanup compared desktop layouts at 1440px and mobile layouts at 390px against the saved pre-cleanup site. Checked Contact, Projects, About, Blog, project detail, and Events pages, plus mobile menu/Escape, gallery load-more and lightbox, browser search, and unconfigured form messages. Production CSS dropped from about 1.08 MB to 133 KB; JavaScript dropped from 243 KB to 154 KB. Runtime-generated gallery, menu, and lightbox classes are retained. Required third-party libraries are retained as libraries rather than pruning their internal implementation.
