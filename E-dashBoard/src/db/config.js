const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.o7ecu58.mongodb.net/users?retryWrites=true&w=majority")
.then(()=>{
      console.log("server start on 5000 port1");
  })
  .catch((error)=>{
    console.log("error");
  })