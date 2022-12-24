const express=require("express")
const SellBuy=require("../mongoose/models/sellBuy")

const sellAndBuyRouter=new express.Router();

//code goes here

sellAndBuyRouter.post('/products', async (req, res) => {
    const user = new SellBuy(req.body)
    if(user.productName.length < 4){
        return res.status(400).json({error:"product name should have minimum of four characters"})
    }
    if(user.costPrice <= 0){
        return res.status(400).json({error: "cost price value cannot be zero or negative value"})
    }
    try {
        await user.save()
         res.status(201).json({message: "Product Added"})
        //  res.send({
        //     status: 201,
        //     message: "Product Added"
        //   })
//    console.log(response)
        
    } catch (e) {
        res.status(400).send(e)
    }
    
})

sellAndBuyRouter.get('/products', async (req, res) => {
    if(req.query.sortBy){
       // sellAndBuyRouter.get('/products', async (req, res) => {
           console.log(req.query.sortBy)
             try {
                if(req.query.sortBy.includes('lowerCostPrice')===true){
                   const users = await SellBuy.find({}).sort({costPrice: 'asc'})
                   res.status(200).send(users) 
                }
                if(req.query.sortBy.includes('higherCostPrice')===true){
                    const users = await SellBuy.find({}).sort({costPrice: -1})
                    res.status(200).send(users) 
                 }
                 if(req.query.sortBy.includes('lowerSoldPrice')===true){
                    const users = await SellBuy.find({}).sort({soldPrice: 1})
                    res.status(200).send(users) 
                 }
                 if(req.query.sortBy.includes('higherSoldPrice')===true){
                    const users = await SellBuy.find({}).sort({soldPrice: -1})
                    res.status(200).send(users) 
                 }
           
            } catch (e) {
                res.status(500).send(e)
            }
    }
            if(req.query.product){
                const name = req.query.product
                // console.log(name)
                 const $match={}
                 if(req.query.product){
                      $match.productName= name
                 }
                 try {
                    // const user= await SellBuy.find({productName:name})
                    const user=await SellBuy.aggregate([{$match}])
                     if (!user) {
                         return res.status(404).send()
                     }
             
                     res.send(user)
               
                 } catch (e) {
                     res.status(500).send()
                 }
            }
    try {
        const users = await SellBuy.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

//localhost:8001/products?sortBy=lowerSoldPrice
//localhost:8001/products?sortBy=higherSoldPrice
//localhost:8001/products?sortBy=lowerCostPrice
//localhost:8001/products?sortBy=higherCostPrice
// sellAndBuyRouter.get('/products', async (req, res) => {
//     console.log(req.query.sortBy)
//      try {
//         if(req.query.sortBy.includes('lowerCostPrice')===true){
//            const users = await SellBuy.find({}).sort({costPrice: 'asc'})
//            res.status(200).send(users) 
//         }
//         if(req.query.sortBy.includes('higherCostPrice')===true){
//             const users = await SellBuy.find({}).sort({costPrice: -1})
//             res.status(200).send(users) 
//          }
//          if(req.query.sortBy.includes('lowerSoldPrice')===true){
//             const users = await SellBuy.find({}).sort({soldPrice: 1})
//             res.status(200).send(users) 
//          }
//          if(req.query.sortBy.includes('higherSoldPrice')===true){
//             const users = await SellBuy.find({}).sort({soldPrice: -1})
//             res.status(200).send(users) 
//          }
   
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })



// sellAndBuyRouter.get('/products/higherCostPrice', async (req, res) => {
//     try {
//         const users = await SellBuy.find({}).sort({costPrice: -1})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })
// sellAndBuyRouter.get('/products/lowerSoldPrice', async (req, res) => {
//     try {
//         const users = await SellBuy.find({}).sort({soldPrice: 'asc'})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })
// sellAndBuyRouter.get('/products/higherSoldPrice', async (req, res) => {
//     try {
//         const users = await SellBuy.find({}).sort({soldPrice: -1})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })



//localhost:8001/products?productName=Laptop
//sellAndBuyRouter.get('/products', async (req, res) => {
//     const name = req.query.product
//    // console.log(name)
//     const $match={}
//     if(req.query.product){
//          $match.productName= name
//     }
//     try {
//        // const user= await SellBuy.find({productName:name})
//        const user=await SellBuy.aggregate([{$match}])
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
  
//     } catch (e) {
//         res.status(500).send()
//     }
//})

sellAndBuyRouter.get('/products/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await SellBuy.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

sellAndBuyRouter.patch('/products/:id', async (req, res) => {
    try {
        const user = await SellBuy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        if(user.soldPrice <= 0){
            return res.status(400).json({error: "sold price value cannot be zero or negative value"})
        }

        res.status(200).json({message: "Updated Successfully"})
    } catch (e) {
        res.status(400).send(e)
    }
})

sellAndBuyRouter.delete('/products/:id', async (req, res) => {
    try {
        const user = await SellBuy.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(400).send()
        }

        res.status(200).json({message:"Deleted Successfully"})
    } catch (e) {
        res.status(400).send()
    }
})



module.exports=sellAndBuyRouter