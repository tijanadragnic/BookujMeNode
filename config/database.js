const mysql=require('mysql');

const pool=mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'TijanaDragnic',
    password:'Pk0(h.E3XSS_*pRf',
    database:'bookujme'

})

module.exports=pool;