const express = require('express');
const cors = require("cors");
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // รองรับ Form Data

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    res.locals.hostname = "http://localhost:8000";
    next();
});

//route
app.get('/', (req, res) => {
    res.render('test2',{title: 'home'});
});
app.get('/keki1', (req, res) => {
    res.render('keki1',{title: 'home'});
});
app.get('/contact', (req, res) => {
    res.render('contact',{title: 'home'});
});
app.get('/login', (req, res) => {
    res.render('login',{title: 'home'});
});
app.get('/Keki/:ids', (req, res) => {
    res.render('dorm',{title: 'home'});
});
app.get('/review', (req, res) => {
    const review = [
        { name: "John", rating: 5, message: "Great place!", alley: "เกกีงาม 1", dormitory: "หอพักกฤตเมธ", image: "" }
    ];
    res.render('reviews', { reviews });
});
app.get('/booking', (req, res) => {
     res.render('booking',{title: 'Find Accommodation'})
});
app.post('/booking_add', (req, res) => {
    console.log('req :>> ', req.body);
    const { alley, hostel, roomType, checkin, duration, rooms, telephone } = req.body;

    const sql = `
        INSERT INTO accommodations (alley, hostel, room_type, checkin, duration, rooms, telephone)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [alley, hostel, roomType, checkin, duration, rooms, telephone], (err, result) => {
        if (err) {
            console.error('Error:', err); 
            return res.json({ status: false, error: err.message });
        }
        res.json({ status: true, insertedId: result.insertId });
    });
});
app.get('/load_keki/:id', (req, res) => {
    const id=req.params.id
    const sql = `
        SELECT d.dorm_name, a.Alley_name, t.t_name, g.gender_type, w.water_cost, e.ele_cost, r.rate_cost, tel.tel_number
        FROM tb_dorm as d
        JOIN tb_alley as a ON d.Alley_code = a.Alley_code
        JOIN tb_type as t ON d.t_code = t.t_code
        JOIN tb_gender as g ON d.gender_code = g.gender_code
        JOIN tb_water as w ON d.water_code = w.water_code
        JOIN tb_electricity as e ON d.ele_code = e.ele_code
        JOIN tb_rate as r ON d.rate_code = r.rate_code
        JOIN tb_telephone as tel ON d.tel_code = tel.tel_code
        where d.Alley_code="A${id}"
        limit 6
    `;

    db.query(sql,function(err,result){
        console.log(err);
        
        res.json(result)

    })
   
});

// API สำหรับดึงข้อมูลหอ
app.get('/dorms', async (req, res) => {
    
        const result = await db.query(`
            SELECT d.dorm_name, a.Alley_name, t.t_name, g.gender_type, w.water_cost, e.ele_cost, r.rate_cost, tel.tel_number
            FROM tb_dorm d
            JOIN tb_alley a ON d.Alley_id = a.Alley_id
            JOIN tb_type t ON d.t_id = t.t_id
            JOIN tb_gender g ON d.gender_id = g.gender_id
            JOIN tb_water w ON d.water_id = w.water_id
            JOIN tb_electricity e ON d.ele_id = e.ele_id
            JOIN tb_rate r ON d.rate_id = r.rate_id
            JOIN tb_telephone tel ON d.tel_id = tel.tel_id
        `);
        res.json(result.recordset);
});

// เปิดเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
