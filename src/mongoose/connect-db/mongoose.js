const mongoose= require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/SellAndBuy",{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


// const SellBuy = mongoose.model('SellBuy', {
//     productName:{
//         type:String,
//         required:true
//     },
//     costPrice:{
//         type:Number,
//         required:true
//     },
//     soldPrice:{
//         type:Number
//     }
// })

// const me = new SellBuy({
//     productName: 'Phone',
//     costPrice: 500,
//     soldPrice: 700
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

