<?php
$servername = "localhost"; // แทนที่ด้วยชื่อเซิร์ฟเวอร์ของคุณ
$username = "ชื่อผู้ใช้ฐานข้อมูลของคุณ"; // แทนที่ด้วยชื่อผู้ใช้ฐานข้อมูลของคุณ
$password = "รหัสผ่านฐานข้อมูลของคุณ"; // แทนที่ด้วยรหัสผ่านฐานข้อมูลของคุณ
$dbname = "ชื่อฐานข้อมูลของคุณ"; // แทนที่ด้วยชื่อฐานข้อมูลของคุณ

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $username, $password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
  die("การเชื่อมต่อล้มเหลว: " . $conn->connect_error);
}
echo "เชื่อมต่อฐานข้อมูลสำเร็จ";

// รับข้อมูลจากฟอร์ม HTML (สมมติว่าใช้เมธอด POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $alley = $_POST["alley"];
  $hostel = $_POST["hostel"];
  $room_type = $_POST["room_type"];
  $checkin = $_POST["checkin"];
  $duration = $_POST["duration"];
  $rooms = $_POST["rooms"];
  $telephone = $_POST["telephone"];

  // เตรียมและผูกคำสั่ง SQL
  $stmt = $conn->prepare("INSERT INTO Accommodations (alley, hostel, room_type, checkin, duration, rooms, telephone, available_rooms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssssiiis", $alley, $hostel, $room_type, $checkin, $duration, $rooms, $telephone, $rooms); // สมมติว่า available_rooms เริ่มต้นเท่ากับจำนวนห้องที่ร้องขอ

  if ($stmt->execute()) {
    echo "บันทึกการจองใหม่สำเร็จ";
  } else {
    echo "เกิดข้อผิดพลาดในการบันทึกการจอง: " . $stmt->error;
  }

  $stmt->close();
}

$conn->close();
?>
