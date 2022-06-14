
const db=require('../models');
const midtransClient = require('midtrans-client');
let controller = {}
// const {Op} = require("sequelize");
let core = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-wSTuIde_f0Fvc8j9caaRK6Ky',
    clientKey : 'SB-Mid-client-gGANfj88qswh-k9g'
});

controller.mitransnotif = async (req,res,next) => {
    core.transaction.notification(req.body)
    .then( async (statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;
        var responmitran = JSON.stringify(statusResponse)

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Sample transactionStatus handling logic

       if(transactionStatus == 'settlement'){
           var up= await db.Order.update({
            responpay:responmitran
           },{
               where:{
                ordercode:orderId
               }
           }
           )
           res.status(200).json({
            mesage:"ok accepted",
            })   
       }else{
        res.status(200).json({
            mesage:"ok accepted",
            }) 
       }
    });
}

controller.findall = async (req,res,next) => {
    try {
        var find=await db.Order.findAll()
        if(find.length > 0){
            var jsonparse = JSON.parse(find[0].responpay)
            console.log(jsonparse.status_code)
            res.status(200).json({
                mesage:"All Data User",
                data:find,
            })
        }else{
            res.status(200).json({
                mesage:"belum ada orderan",
                data:find,
            })
        }
    } catch (error) {
        next(error)
    }
}

controller.createorder=async (req,res,next) => {
    // try {
        core.charge(req.body).then( async (chargeResponse)=>{

            if(chargeResponse.status_code == 201){
                var save= await db.Order.create({
                    ordercode:chargeResponse.order_id,
                    responpay:JSON.stringify(chargeResponse)
                })

                res.status(200).json({
                    // statuscode:chargeResponse.data.status_code,
                    statuscodedata:chargeResponse.status_code,
                    mesage:"All Data User",
                    data:chargeResponse,
                })
            }
       
        }).catch((e)=>res.json({message:e.message}))
    
}



module.exports = controller;