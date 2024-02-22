const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Products = require('./Products');
const app = express();
const port=3001;


// middlewares
app.use(express.json());
app.use(cors());

// connection url

const connection_url=
"mongodb+srv://pm921670:pmarpitatrivedi@cluster0.md6h4hi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url,{
                useNewUrlParser: true,
                useUnifiedTopology:true,
});
// api
app.get('/', (req,res)=>res.status(200).send('Home Page'));


//  add product
app.post("/products/add", (req,res)=>{
        const productDetail = req.body;


        console.log("Product Detail >>>>", productDetail);

        Products.create(productDetail,(err,data)=>{
                if(err){
                        res.status(500).send(err.message);
                } else{
                        res.status(201).send(data);
                }
        });
});

app.get('/products/get',(req,res)=>{
        Products.find((err,data)=>{
                if (err) {
                        res.status(500).send(err);
                }else{
                        res.status(200).send(data);
                }
        });
})

app.listen(port,()=>console.log("Listening on the port", port))

// pm921670
// pmarpitatrivedi