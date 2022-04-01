//*some code*//

const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const app=express()
const port= process.env.PORT || 5000

var http = require('http');
var server = http.Server(app);

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json());

//mysql
const pool=mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'TijanaDragnic',
    password:'Pk0(h.E3XSS_*pRf',
    database:'bookujme'

})
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
//listen on port
app.listen(port,()=> console.log("listen on port 5000"))