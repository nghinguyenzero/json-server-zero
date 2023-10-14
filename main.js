const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders()
  console.log(111, headers)

  const totalCountHeader = headers['x-total-count']
  console.log(4, totalCountHeader)

  if(req.method==='GET' && totalCountHeader) {
    // console.log(555,req)
    // console.log(55512,req._parseUrl)
    // console.log(555,req._parseUrl.query)


    const queryParams = queryString.parse(req._parsedUrl.query)
    console.log(222, queryParams)
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows :Number.parseInt(totalCountHeader)

      }
    }
    return res.jsonp(result)
  }
  res.jsonp({
    body: res.locals.data
  })
}

// Use default router
server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
