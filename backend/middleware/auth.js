const jwt=require('jsonwebtoken')


const auth=(req,res,next)=>{
    let token= req.cookies.token || 
    req.body.token;
    if(req.header){
        token=req.header('authorization').replace('Bearer ','');
    }
    
    if(!token){
        return res.status(403).send("token is missing");
    }

//DECODE OR ENCODE
try{
    const decode=jwt.verify(token,process.env.SECRET_KEY);
    
}
catch(error){
    console.log(error);
    return res.status(401).send("INVALID TOKEN");
}
return next()
}

module.exports=auth;

//What is NEXT KEYWORD
/*
Assume we have a request after doing it or executing the function we go to the next function or middleware or request or whatever we are doing here
*/