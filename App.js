// xbmkNqrNkOHhxlWP
// myForm123
import express from "express"
import mongoose from "mongoose"
import path from "path"
import cors from "cors"
import { fileURLToPath } from "url";
import myModel from './Model/User.js';
import { hash } from "crypto";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const app = express();
let PORT = 3000
let mongoURI = "mongodb+srv://skhadaf123:xbmkNqrNkOHhxlWP@form.repwckn.mongodb.net/?retryWrites=true&w=majority&appName=form"
app.use(cors());

app.use(express.urlencoded({ extended: true })); // Required to read form data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");
app.use(express.json()); 

mongoose.connect(mongoURI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.post("/register",  (req, res)=>{
  let {name, email, password} = req.body;
  try {
      bcrypt.genSalt(10, (err, salt)=>{
       bcrypt.hash(password, salt, async (req, hash)=>{
       let createUser = await myModel.create({
       name: name,
       email:email,
       password:hash
    })
  res.status(201).send(createUser);
   })
  })

  }catch (err) {
    console.error(`Something went wrong: ${err.message}`);
    // Optionally check for MongoDB validation errors
    if (err.code === 11000) {
      return res.status(400).send('Duplicate email or username');
    }
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
  let token = jwt.sign({email}, '9fX$7vZq1#KbLr!P4u@MdE3sRzWqTgYh')
  res.cookie("token", token)
})

app.post("/login", async( req, res)=>{
  let user = await myModel.findOne({email: req.body.email})
  res.send(`login successfully`)
  // if(!user) return res.send("something went wrong!")
})

app.get("/logout", (req, res)=>{
  res.cookie("token", "")
  res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})







