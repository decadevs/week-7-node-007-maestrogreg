import express,{Request, Response, NextFunction} from 'express';
import Joi from "joi";
import fs from "fs";
import path from 'path';
//import data from '../database/database.json';
let data = require("../database/database.json");


const router = express.Router();

/* GET home page. */
function triangleArea(a:number,b:number,c:number){
     a = Number(a);
     b =Number(b);
    c = Number(c);
    let perimeter = (a + b +c)/2;
    let area = (Math.sqrt(perimeter)) * (perimeter - a) * (perimeter - b) * (perimeter - c);
    area = Number(area.toFixed(2));
    return area;
}
function circleArea(radius:number){
  radius = Number(radius);

  let area = (Math.PI) * (Math.pow(radius,2));
  area = Number(area.toFixed(2));
  return area;
}
function rectangleArea(length:number, breadth:number){
  length = Number(length);
  let area = length * breadth;
  area = Number(area.toFixed(2));
  return area;
}
function squareArea(side:number){
  side = Number(side);
 let area = Math.pow(side,2);
 area = Number(area.toFixed(2));
 return area;
}
router.post('/calculate', function(req:Request, res:Response, next:NextFunction) {
    
    let itemName: string = req.body.shape;
    let dimension = req.body.dimension
    itemName = itemName.toLowerCase();
    let array = ["square", "rectangle", "triangle", "circle"]
    if(!array.includes(itemName)){
      res.status(400).send("Enter a valid shape");
    }else{
        if(itemName === "square"){
          const schema = Joi.object({
            shape: Joi.string().required(),
            dimension: Joi.number().required()
        })
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
        }else{
         const area = squareArea(dimension);
         let newID = data[data.length-1].id + 1;
         const valueObject = {
           "shape": itemName,
           "dimension": dimension,
           "area": area,
           "createdAt": new Date(),
           "id": newID
         }
         data.push(valueObject);
         fs.writeFileSync(path.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3))
        
        res.status(201).send(valueObject);}
        }else if(itemName === "circle"){
          const schema = Joi.object({
            shape: Joi.string().required(),
            dimension: Joi.number().required()
        })
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
        }else{
        const area = circleArea(dimension);
        let newID = data[data.length-1].id + 1;
        const valueObject = {
          "shape": itemName,
          "dimension": dimension,
          "area": area,
          "createdAt": new Date(),
          "id": newID
        }
        data.push(valueObject);
        fs.writeFileSync(path.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3))
       
       res.status(201).send(valueObject);}
        }else if(itemName === "rectangle"){
          const schema = Joi.object({
            shape: Joi.string().required(),
            dimension: Joi.object({
              a: Joi.number().required(),
              b: Joi.number().required()
            }).length(2).required()
        });
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
        }else{
        const area = rectangleArea(dimension.a,dimension.b);
        let newID = data[data.length-1].id + 1;
        const valueObject = {
          "shape": itemName,
          "dimension": dimension,
          "area": area,
          "createdAt": new Date(),
          "id": newID
        }
        data.push(valueObject);
        fs.writeFileSync(path.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3))
       
       res.status(201).send(valueObject);}

        }else if(itemName === "triangle"){
          const schema = Joi.object({
            shape: Joi.string().required(),
            dimension: Joi.object({
              a: Joi.number().required(),
              b: Joi.number().required(),
              c: Joi.number().required()
            }).length(3).required()
        });
        const result = schema.validate(req.body);
        if(result.error){
          res.status(400).send(result.error.details[0].message);
        }else{
          const area = triangleArea(dimension.a,dimension.b,dimension.c);
        let newID = data[data.length-1].id + 1;
        const valueObject = {
          "shape": itemName,
          "dimension": dimension,
          "area": area,
          "createdAt": new Date(),
          "id": newID
        }
        data.push(valueObject);
        fs.writeFileSync(path.join(__dirname, '../', 'database/database.json'), JSON.stringify(data, null, 3))
       
       res.status(201).send(valueObject);
        }
        }
    }
});



export default router;
