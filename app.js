// const request = require('request');
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const PrismicConfig = require('./prismic-configuration');
const Onboarding = require('./onboarding');
const app = require('./config');

const PORT = app.get('port');

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

/*
 *  --[ INSERT YOUR ROUTES HERE ]--
 */

/*
 * Route with documentation to build your project with prismic
 */
app.get('/', async (req, res) => {
  const treatmentResponse = await req.prismic.api.query(Prismic.Predicates.at('document.type', 'tratamento'));

  const introResponse = await req.prismic.api.query(Prismic.Predicates.at('document.type', 'introducao'));

  res.render('index', { treatments: treatmentResponse.results, intro: introResponse.results[0] });
});

/*
 * Prismic documentation to build your project with prismic
 */
app.get('/help', (req, res) => {
  const repoRegexp = /^(https?:\/\/([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/;
  const [_, repoURL, name, extension, apiVersion] = PrismicConfig.apiEndpoint.match(repoRegexp);
  const { host } = req.headers;
  const isConfigured = name !== 'your-repo-name';
  res.render('help', {
    isConfigured,
    repoURL,
    name,
    host,
  });
});

/*
 * Preconfigured prismic preview
 */
app.get('/preview', (req, res) => {
  const { token } = req.query;
  if (token) {
    req.prismic.api.previewSession(token, PrismicConfig.linkResolver, '/').then((url) => {
      res.redirect(302, url);
    }).catch((err) => {
      res.status(500).send(`Error 500 in preview: ${err.message}`);
    });
  } else {
    res.send(400, 'Missing token from querystring');
  }
});
