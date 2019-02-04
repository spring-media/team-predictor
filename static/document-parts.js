/*
 * TODO: if document is rebuild --> modify template code with corresponding links to app.js and styles.css
 */

/*
 * Template for document head:
 */
function getDocumentHead() {
  return `
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" data-detect-viewport-is-scaled="false">
    <meta name="theme-color" content="#000000">

    <meta name="description" content=" ###DESCRIPTION### " />
    <meta name="keywords" content="" />
    <meta name="news_keywords" content="" />
    <meta name="location" content="welt.de,Berlin" />
    <meta name="robots" content="index,follow,noodp">
    <meta name="Googlebot-News" content="noindex,follow">
    <meta name="google-site-verification" content="" />

    <meta name="apple-mobile-web-app-title" content="WELT">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content=" ###OG-TITLE### " />
    <meta property="og:description" content=" ###OG-DESCRIPTION### " />
    <meta property="og:image" content="" />
    <meta property="og:url" content=" ###OG-URL### " />
    <meta property="og:site_name" content=" ###OG-SITENAME### " />

    <meta property="fb:app_id" content="" />
    <meta property="article:publisher" content="https://www.facebook.com/welt" />
    <meta property="fb:pages" content="" />
    <meta property="fb:pages" content="" />

    <meta property="twitter:title" content=" ###TWITTER-TITLE### " />
    <meta property="twitter:site" content="@welt" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image:src" content="" />
    <meta property="twitter:creator" content="@welt" />

    <title> ###TITLE### </title>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script src="/static/document-parts.js"></script>

    <link rel="icon" type="image/vnd.microsoft.icon" sizes="16x16 32x32 48x48" href="https://www.welt.de/favicon.ico">
    <link rel="stylesheet" href="https://static.apps.welt.de/2018/test/ia/ia-wm-kader/static/general.css">
  </head>`;
}

/*
 * Template for document body:
 */
function getDocumentBody() {
  return `<body>
      <div id=app></div>
      <script type=text/javascript src=https://static.apps.welt.de/2018/test/ia/ia-wm-kader/dev/static/js/manifest.7308a95bd280b2ecc413.js></script>
      <script type=text/javascript src=https://static.apps.welt.de/2018/test/ia/ia-wm-kader/dev/static/js/vendor.8a64a4f32cb89c1fa055.js></script>
      <script type=text/javascript src=https://static.apps.welt.de/2018/test/ia/ia-wm-kader/dev/static/js/app.55e962ccc2ca9035d7fc.js></script>
    </body>`;
}
