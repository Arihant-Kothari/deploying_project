const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mysql=require("mysql2")
const cors=require("cors");


app.get("/",(req,res)=>{
    res.send("hello express")
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createPool({
    host:amobusiness.org,
    user:root,
    password:admin2245,
    database:amo_db,
});

app.post('/api/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    db.query("SELECT * FROM amo_db WHERE partner_id=? AND password=?",[username,password],
    (err,result)=>{
        if(err){
            req.setEncoding({err:err})
        }
        else{
            if(result.length>0){
                res.send(result)
            }
            else{
                res.send({message:"Incorrect Username Or Password."})
            }
        }
    })
}) 
app.post('/api/signup',(req,res)=>{
    const partnerid=req.body.partnerid;
    const password=req.body.password;
    const name=req.body.name;
    const date=req.body.date;
    const sponsor=req.body.sponsor;
    const phone=req.body.phone;
    const address=req.body.address;
    db.query("INSERT INTO amo_db (partner_id,password,name,joining_date,sponsor_id,phone,address) VALUES(?,?,?,?,?,?,?)",[partnerid,password,name,date,sponsor,phone,address])
})

app.get('/api/lastid',(req,res)=>{
    db.query("SELECT partner_id FROM amo_db ORDER BY partner_id DESC LIMIT 1",(err,result)=>{
        res.send(result)
    })
})

app.post('/api/userdetail',(req,res)=>{
    const userid=req.body.userid;
    db.query("SELECT name,partner_id,sponsor_id,joining_date,phone FROM amo_db WHERE partner_id=?",[userid],(err,result)=>{
        res.send(result)
    })
})

app.get('/api/admin/dashboard',(req,res)=>{
    db.query("SELECT * FROM amo_db",(err,result)=>{
        res.send(result)
    })
})

app.post('/api/deleterow',(req,res)=>{
    const id=req.body.id;
    db.query("DELETE FROM amo_db WHERE partner_id=?",[id])
})

app.post('/api/editform',(req,res)=>{
    const name=req.body.name;
    const phone=req.body.phone;
    const address=req.body.address;
    const partnerid=req.body.partnerid;
    const sponsor=req.body.sponsor;
    db.query("UPDATE amo_db SET name=?,phone=?,address=?,sponsor_id=? WHERE partner_id=?",[name,phone,address,sponsor,partnerid])
})

app.get('/api/dashboard',(req,res)=>{
    db.query("SELECT name,partner_id,sponsor_id,joining_date FROM amo_db",(err,result)=>{
        res.send(result)
    })
})

app.post('/api/transaction',(req,res)=>{
    const partnerid=req.body.partnerid;
    const amount=req.body.amount;
    const date=req.body.date;
    const remark=req.body.remark;
    db.query("INSERT INTO transaction (partner_id,amount,date,remark) VALUES(?,?,?,?)",[partnerid,amount,date,remark],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})

app.post('/api/reward',(req,res)=>{
    const partnerid=req.body.partnerid;
    const amount=req.body.amount;
    const date=req.body.date;
    const remark=req.body.remark;
    db.query("INSERT INTO reward (partner_id,amount,date,remark) VALUES(?,?,?,?)",[partnerid,amount,date,remark],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})

app.get('/api/transactionamo_db',(req,res)=>{
    db.query("SELECT * FROM transaction",(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
})

app.get('/api/rewardamo_db',(req,res)=>{
    db.query("SELECT * FROM reward",(err,result)=>{
        res.send(result)
        if(err){
            console.log(err)
        }
    })
})

app.post('/api/getreward',(req,res)=>{
    const partnerid=req.body.partnerid;
    db.query("SELECT * FROM reward WHERE partner_id = ?",[partnerid],(err,result)=>{
        res.send(result)
    })
})

app.post('/api/gettransaction',(req,res)=>{
    const partnerid=req.body.partnerid;
    db.query("SELECT * FROM transaction WHERE partner_id = ?",[partnerid],(err,result)=>{
        res.send(result)
    })
})

app.listen(3001,()=>{
    console.log(`server is running on port 3001`)
})