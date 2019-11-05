const User = require('../models/user')
const express = require('express')
const router = new express.Router()

router.post('/users', (req,res)=>{
    const user  = new User(req.body)
    console.log(user);
   // Using Async Await
    user.save((err, result)=>{
        if(!err && result){
            res.send(result);
        }else{
        res.send(err);
        }
    })
    // res.send(user)
    // }
    // catch(e){
    //     res.send(e)
    // }
     // Without Callback
    // const user  = new User(req.body)
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/users', async (req,res)=>{
    try{
        const data = await User.find({})
        res.send(data)
    }
    catch(e)
{
    res.send(e)
}    
})

router.get('/users/:id', async (req,res)=>{
   
    const id  = req.params.id
    try{
       const data = await User.findById(id)
       
       res.send(data)
    }
    catch(e)
    {
        res.send(e)
    }
})

// Code to update the Data

router.patch('/users/:id', async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name','age','email','password']
    const isValidOperation = updates.every((update)=> allowUpdates.includes(update))
    if(!isValidOperation){
        res.send({error:'Invalid Updates'})
    }
    const id = req.params.id;
    try{
    const updateUser = await User.findByIdAndUpdate(id,req.body,{new : true, runValidators : true})
     if(!updateUser){
         res.send("Data not found").status(404)
     }
     else{
         res.send(updateUser)
     }
    }
    catch(e){
        res.send(e)
    }

})   

router.delete('/users/:id', async (req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
    const task = await User.findByIdAndDelete(id)
    res.send(task)
    }
    catch(e){
        res.send(e) 
    }
})



// Using MOngoose Schema

router.post('/users/login', async (req,res)=>{
    try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.send(user)
    }
    catch(e){
          res.send(e)
    }
})

module.exports = router
