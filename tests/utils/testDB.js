//const app=require("../src/app")
// const SellBuy=require("../src/mongoose/models/sellBuy")
// const mongoose=require("mongoose")
// require("../src/mongoose/connect-db/mongoose")
const app=require("../../src/app")
const SellBuy=require("../../src/mongoose/models/sellBuy")
const mongoose=require("mongoose")
require("../../src/mongoose/connect-db/mongoose")

const productData=[{
    
    "_id": "622987789f712611a8dbdf8d",
    "productName": "Laptop",
    "costPrice": 8000,
    "soldPrice": 9400
},
{
    "_id": "62298df3460e87159c5b28d0",
    "productName": "Mobile",
    "costPrice": 4500,
    "soldPrice": 4000
},
{
    "_id": "6229b0dc975e391a10c7b9f6",
    "productName": "Laptop",
    "costPrice": 5000,
    "soldPrice": 10000
},
{
    "_id": "6229b25f67ba5806509b3848",
    "productName": "Table",
    "costPrice": 3000
}]
const setUpDatabase=async()=>{
    await SellBuy.deleteMany();
    await new SellBuy(productData[0]).save();
    await new SellBuy(productData[1]).save();
    await new SellBuy(productData[2]).save();
    await new SellBuy(productData[3]).save();
}
module.exports = {
    
    productData,
    setUpDatabase
}