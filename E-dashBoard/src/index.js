const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/user");
const Produt=require("./db/Product");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
})
app.post("/login", async (req, res) => {
  
  if (req.body.password && req.body.email ) {
    let user = await User.findOne(req.body).select("-password");
    
    if (user) {
      res.send(user);
    }
    else {
      res.send({ result: 'No User Found' })
    }
  }
  else {
    res.send({ result: 'No User Found' })
  }

})
app.post("/add-product",async(req,res)=>{
  let product=new Produt(req.body);
  let result=await product.save();
  res.send(result);
})
app.get("/products",async(req,res)=>{
  let products=await Produt.find();
  if(products.length>0){
    res.send(products)
  }else{
    res.send({result:"No Products found"})
  }
})
app.delete("/product/:id",async(req,res)=>{
  const result=await Product.deleteOne({_id:req.params.id})
  res.send(result);
})
app.get("/product/:id",async(req,res)=>{
  let result=await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }
  else{
    res.send({result:"No Record found"})
  }
})

app.put("/product/:id",async(req,res)=>{
  let result=await Product.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
  )
  res.send(result);
})

app.get("/search/:key",async(req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
    ]
  })
  res.send(result);
})

app.listen(5000, () => {
  console.log("server start on 5000 port");
});


