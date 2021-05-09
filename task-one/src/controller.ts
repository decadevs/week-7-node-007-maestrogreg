import fs from "fs";
import { Request, Response} from 'express';

let data = require("./database/database.json")
type Data = {
    organization: string;
    createdAt: Date;
    updatedAt?: Date;
    products: string[];
    marketValue: string;
    address: string;
    ceo: string;
    country: string;
    id?: number;
    noOfEmployees: number;
    employees: string[];
};

async function createUser(req:Request, res:Response) {
    data = data;
    let incoming = req.body;
    if(data.length === 0){
        let user: Data = {
            organization: incoming.organization,
            createdAt: new Date(),
            products: incoming.products,
            marketValue: incoming.marketValue,
            address: incoming.address,
            ceo: incoming.ceo,
            country: incoming.country,
            id: 1,
            noOfEmployees: incoming.noOfEmployees,
            employees: incoming.employees 
        };
        data.push(user);
        fs.writeFile(`${__dirname}/database/database.json`, JSON.stringify(data, null, 3),( (error)=> {
            if(error){
            
             res.status(400).send("error creating user");
            }
         }))
         
         res.status(201).send(user);
    }else if(data.length > 0){
    let num: number = 1;
    let currentID = data[data.length-1].id;
    num += currentID; 
    let user: Data = {
        organization: incoming.organization,
        createdAt: new Date(),
        products: incoming.products,
        marketValue: incoming.marketValue,
        address: incoming.address,
        ceo: incoming.ceo,
        country: incoming.country,
        id: num,
        noOfEmployees: incoming.noOfEmployees,
        employees: incoming.employees 
    };
    data.push(user);
    fs.writeFile(`${__dirname}/database/database.json`, JSON.stringify(data, null, 3), (error)=> {
        if(error){ 
            console.log("error writing file")
            res.status(400).send("error creating user");
        }
    });
    res.status(201).send(user);
}
}

async function getAllUsers(req: Request,res: Response){
    res.status(200).json(data);
}

async function deleteUser(req: Request, res: Response){
   const item = data.find((item: Data) => item.id === parseInt(req.params.id));
   const index = data.indexOf(item);
   data.splice(index,1);
   fs.writeFile(`${__dirname}/database/database.json`, JSON.stringify(data, null, 3), (error)=> {
    if(error) console.log("error writing file")
});
   res.status(200).send(`User detail with ID number ${req.params.id} deleted`)
}
async function getUser(req:Request, res:Response){
    const user = data.find((item:Data) => item.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json("Data with that id does not exist")
    }
    res.status(200).send(user);
}
async function updateUser(req:Request, res:Response){
    const user = data.find((item:Data) => item.id === parseInt(req.params.id));
    let incoming = req.body
    if (!user) {
        return res.status(400).send("Data with that id does not exist")
    }
    const index = data.indexOf(user);
    let currentProfile = data[index];
    let current: Data = {
        createdAt: currentProfile.createdAt,
        updatedAt: new Date(),
        organization: incoming.organization || currentProfile.organization,
        products: incoming.products || currentProfile.products,
        marketValue: incoming.marketValue || currentProfile.marketValue,
        address: incoming.address|| currentProfile.address,
        ceo: incoming.ceo || currentProfile.ceo,
        country: incoming.country ||currentProfile.country,
        noOfEmployees: incoming.noOfEmployees ||currentProfile.noOfEmployees,
        employees: incoming.employees || currentProfile.employees 
    };

    data[index] = {...current,"id": user.id};
    fs.writeFile(`${__dirname}/database/database.json`, JSON.stringify(data, null, 3), (error)=> {
        if(error){ 
            res.status(400).send("Error updating user");
            console.log("error writing file");
        }
    });
    res.status(200).send(data[index]);
    
    
}

export{ createUser, getAllUsers, deleteUser, getUser, updateUser}
