const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb+srv://jothika:jothika@cluster0.uyxgqyk.mongodb.net/EcommerceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  
app.get("/order",async(req,res)=>{
  try{
    const orders = await mongoose.connection.db
    .collection("orders").find().toArray();
    res.json(orders); 
    console.log(orders)  
  }catch(err){
    res.status(500).json(err)
  }
})


const { ObjectId } = require("mongodb");

app.get("/order/:id", async (req, res) => { 
 try {
  const order = await mongoose.connection.db
    .collection("orders")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json(order);
 } catch (err) {
  res.status(500).json(err);
 }
});

app.put("/orderstatus/:id", async (req,res)=>{
 try{

  const order = await mongoose.connection.db
    .collection("orders")
    .findOneAndUpdate(
      {_id:new ObjectId(req.params.id)},
      {$set:{status:req.body.status}},
      {returnDocument:"after"}
 )
 res.json(order.value)

 }catch(err){
  res.status(500).json(err)
 }
})



app.get("/product", async (req, res) => {
  try {
    const products = await mongoose.connection.db
      .collection("products") 
      .find()
      .toArray(); 
      res.json(products) 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


app.get("/test", (req, res) => {
  res.send("TESTING OK");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});