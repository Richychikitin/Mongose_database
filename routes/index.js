var express = require('express');
var router = express.Router();
const app = express();
// const port = 3000;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;

// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });