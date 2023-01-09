const express=require("express");
const bodyParser=require("body-parser");    //requiring the modules,packages(exp,b-p,request) we installed
const request=require("request");
const https=require("https");


const app=express(); //new instance        

app.use(express.static("public")); //to serve up static files(css,images) to server

app.use(bodyParser.urlencoded({extende:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname +  "/index.html");
});

app.post("/",function(req,res){

    const firstName=req.body.fname;
    const email=req.body.email;
    const courseTaken=req.body.course;
    const phno=req.body.phno;
     
console.log(email);
    const data= {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                FNAME:firstName,
                COURSE:courseTaken,
                PHONE:phno

                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);   //to convert to flatpack json
    
    const url="https://us12.api.mailchimp.com/3.0/lists/41fde289d6";


    const options={
          method:"POST",
          auth:"Swaroop Patil:6dbd187e42793c6a7c70954bf4600429-us12"
    }

    const request=https.request(url,options,function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })


    request.write(jsonData);
    request.end();

});
//using app to set our server to listen on port 3000


app.listen(process.env.port || port,function(){
    console.log("Server runnning on ${port}");
});

    //6dbd187e42793c6a7c70954bf4600429-us12                                  

    //41fde289d6