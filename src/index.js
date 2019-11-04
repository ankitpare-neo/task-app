const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.post('/users', async (req,res)=>{
    const user  = new User(req.body)
   
   // Using Async Await
    try{
    await user.save()
    res.send(user)
    }
    catch(e){
        res.send(e)
    }
     // Without Callback
    // const user  = new User(req.body)
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/users',(req,res)=>{
    const user  = new User(req.body)
    const id  = req.params.id
    User.find().then((data) => {
        res.send(data)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users/:id',(req,res)=>{
    const user  = new User(req.body)
    const id  = req.params.id
    User.findById(id).then((data) => {
        res.send(data)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', async (req,res)=>{
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

app.get('/tasks', async (req,res)=>{
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

 

app.listen(port, ()=>{
   console.log("Listen at Port 3000")
})