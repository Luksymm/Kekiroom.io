const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Username เริ่มต้นของ XAMPP
    password: "", // ค่า default ของ XAMPP ไม่มีพาสเวิร์ด
    database: "room_booking"
});


module.exports = db;
