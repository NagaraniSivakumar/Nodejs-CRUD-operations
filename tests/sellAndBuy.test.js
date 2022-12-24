 const SellBuy=require('../src/mongoose/models/sellBuy')
 const request=require('supertest')
 const app=require("../src/app")
 const {setUpDatabase,productData,saveData}=require("./utils/testDB")
 const mongoose=require("mongoose")

afterAll(async(done)=>{
    mongoose.disconnect();
    done();
});
// beforeEach((setUpDatabase) => {
//     jest.useFakeTimers()
//     jest.setTimeout(100000)
//   })
  
//   afterEach(() => {
//     jest.clearAllTimers()
//   })
 beforeEach(setUpDatabase)
 //beforeEach(setUpDatabase)


 getSellBuyProductLength=async()=>{
     let  len=await SellBuy.find().count();
     return len;
 }
 test("saving product",async()=>{
     expect(await getSellBuyProductLength()).toBe(4);
     const response=await request(app).post('/products').send({productName:"Desktop",costPrice:2000});
     expect(response.status).toBe(201)
    expect(response.body.message).toBe ("Product Added")
     expect(await getSellBuyProductLength()).toBe(5);
})
test("saving product-invalid product name",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).post('/products').send({productName:"Des",costPrice:2000});
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("product name should have minimum of four characters");
    expect(await getSellBuyProductLength()).toBe(4);
})
test("saving product-invalid cost name",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).post('/products').send({productName:"Desktop",costPrice:0});
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("cost price value cannot be zero or negative value");
    expect(await getSellBuyProductLength()).toBe(4);
})
test("patch product",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).patch(`/products/${productData[3]._id}`).send({costPrice: 1500,soldPrice: 100});
    expect(response.status).toBe(200);
   expect(response.body.message).toBe ("Updated Successfully")
    expect(await getSellBuyProductLength()).toBe(4);
})
test("patch product-error",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).patch(`/products/${productData[3]._id}`).send({costPrice: 1500,soldPrice: 0});
    expect(response.status).toBe(400);
   expect(response.body.error).toContain("sold price value cannot be zero or negative value")
    expect(await getSellBuyProductLength()).toBe(4);
})
test("getting all product Data",async()=>{
    const response=await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    for(let i=0;i<4;i++){
expect(response.body[i].productName).toEqual(productData[i].productName);
expect(response.body[i].costPrice).toEqual(productData[i].costPrice);
expect(response.body[i].soldPrice).toEqual(productData[i].soldPrice);
    }
})
test("getting product data-laptop",async()=>{
    const response=await request(app).get("/products?product=Laptop");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].productName).toEqual("Laptop");
    expect(response.body[0].costPrice).toEqual(8000);
    expect(response.body[0].soldPrice).toEqual(9400);
    expect(response.body[1].productName).toEqual("Laptop");
    expect(response.body[1].costPrice).toEqual(5000);
    expect(response.body[1].soldPrice).toEqual(10000);
})
test("getting product data-Mobile",async()=>{
    const response=await request(app).get("/products?product=Mobile");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].productName).toEqual("Mobile");
    expect(response.body[0].costPrice).toEqual(4500);
    expect(response.body[0].soldPrice).toEqual(4000);
})
test("getting product data-lowerCostPrice",async()=>{
    const response=await request(app).get("/products?sortBy=lowerCostPrice");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].productName).toEqual("Table");
    expect(response.body[0].costPrice).toEqual(3000);
    expect(response.body[0].soldPrice).toEqual(undefined);
    expect(response.body[1].productName).toEqual("Mobile");
    expect(response.body[1].costPrice).toEqual(4500);
    expect(response.body[1].soldPrice).toEqual(4000);
    expect(response.body[2].productName).toEqual("Laptop");
    expect(response.body[2].costPrice).toEqual(5000);
    expect(response.body[2].soldPrice).toEqual(10000);
    expect(response.body[3].productName).toEqual("Laptop");
    expect(response.body[3].costPrice).toEqual(8000);
    expect(response.body[3].soldPrice).toEqual(9400);
})
test("getting product data-lowerCostPrice",async()=>{
    const response=await request(app).get("/products?sortBy=higherCostPrice");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].productName).toEqual("Laptop");
    expect(response.body[0].costPrice).toEqual(8000);
    expect(response.body[0].soldPrice).toEqual(9400);
    expect(response.body[1].productName).toEqual("Laptop");
    expect(response.body[1].costPrice).toEqual(5000);
    expect(response.body[1].soldPrice).toEqual(10000);
    expect(response.body[2].productName).toEqual("Mobile");
    expect(response.body[2].costPrice).toEqual(4500);
    expect(response.body[2].soldPrice).toEqual(4000);
    expect(response.body[3].productName).toEqual("Table");
    expect(response.body[3].costPrice).toEqual(3000);
    expect(response.body[3].soldPrice).toEqual(undefined);
})
test("getting product data-lowerCostPrice",async()=>{
    const response=await request(app).get("/products?sortBy=lowerSoldPrice");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].productName).toEqual("Table");
    expect(response.body[0].costPrice).toEqual(3000);
    expect(response.body[0].soldPrice).toEqual(undefined);
    expect(response.body[1].productName).toEqual("Mobile");
    expect(response.body[1].costPrice).toEqual(4500);
    expect(response.body[1].soldPrice).toEqual(4000);
    expect(response.body[2].productName).toEqual("Laptop");
    expect(response.body[2].costPrice).toEqual(8000);
    expect(response.body[2].soldPrice).toEqual(9400);
    expect(response.body[3].productName).toEqual("Laptop");
    expect(response.body[3].costPrice).toEqual(5000);
    expect(response.body[3].soldPrice).toEqual(10000);
    
    
})
test("getting product data-lowerCostPrice",async()=>{
    const response=await request(app).get("/products?sortBy=higherSoldPrice");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].productName).toEqual("Laptop");
    expect(response.body[0].costPrice).toEqual(5000);
    expect(response.body[0].soldPrice).toEqual(10000);
    expect(response.body[1].productName).toEqual("Laptop");
    expect(response.body[1].costPrice).toEqual(8000);
    expect(response.body[1].soldPrice).toEqual(9400);
    expect(response.body[2].productName).toEqual("Mobile");
    expect(response.body[2].costPrice).toEqual(4500);
    expect(response.body[2].soldPrice).toEqual(4000);
    expect(response.body[3].productName).toEqual("Table");
    expect(response.body[3].costPrice).toEqual(3000);
    expect(response.body[3].soldPrice).toEqual(undefined);
})
test("Deleting 2nd product",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).delete(`/products/${productData[1]._id}`)
    expect(response.status).toBe(200)
   expect(response.body.message).toBe ("Deleted Successfully")
    expect(await getSellBuyProductLength()).toBe(3);
})
test("Deleting 2nd product-error",async()=>{
    expect(await getSellBuyProductLength()).toBe(4);
    const response=await request(app).delete(`/products/${productData[1]}`);
    expect(response.status).toBe(400)
    expect(await getSellBuyProductLength()).toBe(4);
})