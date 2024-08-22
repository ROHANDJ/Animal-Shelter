import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"test",
    password:"rohit@123123",
    port:5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let isLoggedIn = false;
let currentUserId;

app.get("/", (req,res)=>{
    if(!isLoggedIn){
        res.redirect("/login");
    }else{
        res.render("index.ejs");
    }
}); 

app.get("/login",(req,res)=>{
    res.render('login.ejs');
})

app.get("/adopt",(req,res)=>{
    res.render("adopt.ejs");
});

app.get("/signin",(req,res)=>{
   res.render("signin.ejs");
});

app.post("/display", async(req,res)=>{
   try{
    const result = await db.query("SELECT * FROM ANIMALS");
    const fullArrayList = result.rows; 
    console.log(fullArrayList);

    res.render("display.ejs", {animals: fullArrayList});
   }catch(err){}
});

app.post("/addanimal",async (req,res)=>{
    const name = req.body.addAnimalName;
    const type = req.body.addAnimalType;
    const age = req.body.addAnimalAge;
    
    try{
        const result = await db.query("INSERT INTO ANIMALS (name,type,age,user_id) VALUES ($1,$2,$3,$4)", [name,type,age,currentUserId]);
        res.redirect("/");
    }catch(err){
        res.redirect("/"); 
    }
});

app.post("/adoptanimal", async(req,res)=>{
    const id = req.body.adoptAnimalId;
    
    try{
        const result = await db.query("SELECT * FROM ANIMALS WHERE animal_id = $1", [id]);

        if(result.rows.length > 0){
            const animal_id = id;
            const owner_user_id = result.rows[0].user_id;
            
            const result2 = db.query("INSERT INTO ADOPTED_ANIMALS (owner_user_id,animal_id,adopter_user_id) VALUES ($1,$2,$3)",
                [owner_user_id,animal_id,currentUserId]
            );
            res.render("index.ejs", {message: "Animal adopted successfully."});
        }else{
            res.render("index.ejs", {message: "Please enter a valid id."});
        }
    }catch(err){

    }
});

app.post("/login", async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    try{
        const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if(check.rows.length > 0){
            const user = check.rows[0];
            const databasePassword = user.password;

            if(password == databasePassword){
                const id = user.id;
                currentUserId = id;
                isLoggedIn = true;
                res.redirect("/");
            }else{
                res.render("login.ejs", {error: "Password does not match."});
            }
        }else{
            res.render("login.ejs", {error: "Sign in kar paile."});
            console.log("Register kar paile.");
        }
    }catch(err){
        res.render("login.ejs", {error: "Sign in kar paile."});
        console.log("Register kar paile.");
    }
})

app.post("/signin", async(req,res)=>{
    const name = req.body.name;
    const phone = req.body.contact;
    const email = req.body.email;
    const password = req.body.password;

  try{
    const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);   

    if(check.rows.length > 0){
        console.log("email already exist.");
        res.render("signin.ejs", {error: "Email already exist. Please try logging in."});
    }else{
        const result = await db.query(
            "INSERT INTO users(name,phone,email,password) VALUES ($1,$2,$3,$4) RETURNING *", 
            [name,phone,email,password]);
        const id = result.rows[0].id;
        currentUserId = id;
        isLoggedIn = true;
        res.redirect("/");
    }
  }catch(err){
    console.log(err);
  }

});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});