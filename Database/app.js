const express = require('express');
const mysql = require('mysql2');
const app = express(); 

app.get('/students', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'student_database',
    });

    // เปิด connection ไปที่ database
    connection.connect();

    // การใช้คำสั่ง Where + ... = ... หลัง students จะทำการหาข้อมูลในไฟล์ sql เพื่อ Request และ Respond กลับตามที่เราใส่ค่า Number(เท่านั้น) ให้กับ Where หรือ เข้าใจง่ายๆว่าข้อมูลนั้นอยู่ที่ไหน ?? //
    connection.query('SELECT * from students', (err, rows, fields) => { 
        if (err) throw err;

        // return response กลับไปหา client โดยแปลง record เป็น json array
        res.json(rows);
    });

    // ปิด connection
    connection.end();
});

app.listen(3000, () => {
    console.log('server started on port 3000!');
});

