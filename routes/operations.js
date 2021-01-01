var express = require('express');
var router = express.Router();
var bodyparser=require('body-parser')
var fs=require('fs')



var datastore=require('datastore');
const { response } = require('express');

router.get('/create',(req,res)=>{
    res.send('yes its working');
})

router.post('/create', async(req,res)=>{

 const result= datastore.create(req.body.id, req.body.value);
        console.log(result);

        if(result===200){
            res.status(200).json({msg: ` File ${req.body.id}.json Created successfully!!`})
        }else if(result===409){
            res.status(409).json({msg : `File ${req.body.id}.json already exists!!`})
        }else {
            res.status(result).json({msg:'Error occuredd!!!'});
        }
      
   
});

router.post('/delete', async(req,res)=>{
        
    
        const result= datastore.del(req.body.id)
        if(result===404){
            res.status(404).json({msg: `File ${req.body.id} not found!!`});
        }else if(result===409){
            res.status(409).json({msg: ' Conflict in deleting file! try again'});
        }else if(result===200){
            res.status(200).json({msg: `File ${req.body.id}.json deleted Successfully`});
        }
    
    
    
        
})

router.post('/read', (req,res)=>{

    
  const result= datastore.read(req.body.id)
    console.log(result);

    if(result===404){
        res.status(404).json({notfound: 'File Not Found'});
    }

    res.status(200).json({value:result.value })
   
})

module.exports=router;
