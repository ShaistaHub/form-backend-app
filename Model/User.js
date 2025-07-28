import mongoose from "mongoose";
import { type } from "os";

let mySchema = mongoose.Schema({
  name:
   { type: String, unique: true, required: true },
  email: 
   { type: String, unique: true, required: true },
  password: 
   { type: String, required: true }
})

let myModel = mongoose.model("User", mySchema)
export default myModel;

// let myLoginSchema = mongoose.Schema({
//     email: 
//      { type: String, unique: true, required: true },
//     password: 
//      { type: String, required: true }
// })

// let loginModel = mongoose.model("UserLogin", myLoginSchema)
 
// export default{ myModel,loginModel};