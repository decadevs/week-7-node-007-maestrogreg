import express, { json, Router } from 'express'
import { createUser, getAllUsers, deleteUser, getUser, updateUser} from "./controller"


const app = express()
const router = Router()
app.use(json());


type Data = {
    organization: string;
    createdAt: Date;
    updatedAt: Date;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id?: number;
    noOfEmployees: number;
    employees: string[];
};

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

// /api/item/:id
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)


app.use("/api/data", router);


const PORT = process.env.PORT || 3005;


const server = app.listen(PORT,()=> console.log(`server is live on ${PORT}`));

module.exports = server;