const { response } = require('express');
const fs=require('fs');
const path=require('path');
const util= require('util');



class Pair{
    constructor(key,value){
        this.key=key;
        this.value=value;
    }
}

const create=(id,data)=>{

    
    const obj=new Pair(id,data);
    obj.key=id;
    obj.value=data;

    const load={
        "id":obj.key,
        "value": obj.value
    }


    const payload=JSON.stringify(load);

    try{

        if(fs.existsSync(`./storage/`)){

            if(fs.existsSync(`./storage/${obj.key}.json`)){
                return 409;
            }else{
                fs.writeFileSync(`./storage/${obj.key}.json`, payload)
                return 200;
            }
            
        }else{
            fs.mkdirSync('./storage');
        }
    
        if(fs.existsSync(`./storage/`)){
    
            if(fs.existsSync(`./storage/${obj.key}.json`)){
                return 409;
            }else{
                fs.writeFileSync(`./storage/${obj.key}.json`, payload);
                return 200;
            }
            
        }

    }catch(err){
        return err;
    }

   
}





const read=(id)=>{

    try{

        if(fs.existsSync(`./storage/${id}.json`)){
        
            var data=fs.readFileSync( `./storage/${id}.json`, 'utf8')
        console.log(data)
        return JSON.parse(data);
            
        }else{
            return 404;
        }

    }catch(err){
        return err;
    }

  

}





const del=(id)=>{


    try{

        if(fs.existsSync(`./storage/${id}.json`)){
            fs.unlinkSync(`./storage/${id}.json`);
        }else{
            return 404
        }
    
    
        
    
        if(fs.existsSync(`./storage/${id}.json`)){
            return 409
        }else{
            return 200
        }

    }catch(err){
        return err;
    }

    


}

module.exports={
    read : read,
    del:del,
    create: create

}