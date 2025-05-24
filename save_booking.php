<?php ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// DB credentials
$host = 'localhost';
$db = 'travel_booking';
$user = 'root';
$pass = 'root'; // Adjust your password

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['phone'], $data['hotel'], $data['checkIn'], $data['checkOut'])) {
    echo json_encode(["success" => false, "message" => "Missing booking details."]);
    exit;
}

// Sanitize inputs
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$phone = $conn->real_escape_string($data['phone']);
$hotel = $conn->real_escape_string($data['hotel']);
$checkIn = $conn->real_escape_string($data['checkIn']);
$checkOut = $conn->real_escape_string($data['checkOut']);

// Insert into DB
$sql = "INSERT INTO hotel_bookings (name, email, phone, hotel, check_in, check_out)
        VALUES ('$name', '$email', '$phone', '$hotel', '$checkIn', '$checkOut')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Booking stored successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to store booking. " . $conn->error]);
}

$conn->close();
?>
