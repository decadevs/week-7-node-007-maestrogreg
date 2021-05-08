import express,{Response, Request, NextFunction} from 'express';
var router = express.Router();
let data = require("../database/database.json");

/* GET users listing. */
router.get('/fetchData', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).send(data);
});
router.get('/fetchData/:id', function(req: Request, res: Response, next: NextFunction) {
  //let file = data.find((item) => item.id === req.params.id)
  res.send('respond with a resource');
});
export default router;
