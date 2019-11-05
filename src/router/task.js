const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)
     try
     {await task.save()
      res.send(task)
      }
     catch(e){res.send(e)}

    // task.save().then(()=>{
    //        res.send(task)
    // }).catch((err)=>{
    //         res.status(400).send(err)
    // })
})

router.get('/tasks', async (req,res)=>{
   try{
      const tasks =  await Task.find({})
       res.send(tasks)
   }
   catch(e){
       res.send(e)
   }

    // Task.find().then((data)=>{res.send(data)}).catch((err)=>{
    //     res.send(err)
    // })
})

router.patch('/tasks/:id', async (req,res)=>{
     const updates = Object.keys(req.body) // It will give all the keys of the Object
     console.log(updates)
     const allowUpdates  = ['description', 'completed']
     const isValidOperation = updates.every((update)=> allowUpdates.includes(update))
         if(!isValidOperation){
           return res.status(400).send({error :'Invalid Updates'})
         }
     
     try{
         const user = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            res.send(user)
        } 
        catch(e){
            res.send(e).status(404)
        }
 })    


 router.delete('/tasks/:id', async (req,res)=>{
     const id = req.params.id
     console.log(id)
     try{
     const task = await Task.findByIdAndDelete(id)
     res.send(task)
     }
     catch(e){
         res.send(e) 
     }
 })

 module.exports = router