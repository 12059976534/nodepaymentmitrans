const express=require("express");
const app=express();
const morgan=require("morgan")

const route = require('./route/router')

const cors=require('cors')
app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ====tes====
// app.use("/",(req,res,next)=>{    
//     res.json({
//         test:"test"
//     })
// })
// ====tes====
app.use("/order",route);
// app.use("/assets",express.static("assets"));


// ===== hendling error ======
app.use((req, res, next) => {
    const error=new Error(error.message);
    error.status = 404;
    next(error);
})



app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
            status:error.status
        }
    })
})

// =======================

module.exports=app; 