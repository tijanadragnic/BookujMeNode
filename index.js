//*some code*//
require("dotenv").config();
const pool=require("./config/database")
const express=require('express');
const bodyParser=require('body-parser');

const userRouter = require("./api/users/user-router");


const app=express()
app.use(express.json());
app.use("/", userRouter);


const bcrypt=require('bcrypt');
const { checkToken } = require("./auth/token-validation");

const port= process.env.PORT || 5000







app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());



//get all the books

app.get('/books',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`SELECT * from books`,(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

        
    })
})
//get books by id
app.get('/books/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`SELECT * from books WHERE id=?`,[req.params.id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

        
    })
})
//delete a book
app.delete('/books/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`DELETE from books WHERE id=?`,[req.params.id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`Book with the record ID:${[req.params.id]} has been removed`)
            }else{
                console.log(err)
            }
        })

        
    })
})
//add a record/book
app.post('',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err


        const params=req.body
        connection.query(`INSERT INTO  books SET?`,params,(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`Book with the record name:${params.name} has been added`)
            }else{
                console.log(err)
            }
        })

        
    })
})
//update a book
app.put('',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err

        const { id,name,edition,perservationlevel }=req.body
        connection.query(`UPDATE  books SET name=? WHERE id=?`,[name,id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`Book with the record name:${name} has been updated`)
            }else{
                console.log(err)
            }
        })

        
    })
})
//get users all
app.get('/users',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`SELECT * from users`,(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

        
    })
})

//get users byid
app.get('',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`SELECT * from users WHERE id=?`,[req.params.id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

        
    })
})

//create users
app.post('/users',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err


        const params=req.body
        connection.query(`INSERT INTO users SET?`,params,(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`Book with the record name:${params.first_name} has been added`)
            }else{
                console.log(err)
            }
        })

        
    })
})


//update users
app.put('/users',checkToken,(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err

        const { id,first_name,last_name,email,city,password }=req.body
        connection.query(`UPDATE  users SET first_name=? WHERE id=?`,[first_name,id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`User with the record name:${first_name} has been updated`)
            }else{
                console.log("You need to have access token")
            }
        })

        
    })
})
//delete use
app.delete('/users/:id',checkToken,(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`DELETE from users WHERE id=?`,[req.params.id],(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(`User with the record ID:${[req.params.id]} has been removed`)
            }else{
                console.log(err)
            }
        })

        
    })
})
//get all cityes
app.get('/cities',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        connection.query(`SELECT * from cities`,(err,rows)=>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })

        
    })
})

//listen on port
app.listen(port,()=> console.log("listen on port 5000"))