const express=require("express")
const sellAndBuyRouter= require("./routers/sellAndBuy")
const bodyParser=require("body-parser")
require("./mongoose/connect-db/mongoose")

const app=express();

app.use(express.json())
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*")
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","GET,DELETE,PATCH");
        return res.status(200).json({});
    }
    next();
})

app.use(sellAndBuyRouter);

module.exports= app