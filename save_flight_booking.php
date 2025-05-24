<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Include PHPMailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// DB credentials
$host = 'localhost';
$db = 'travel_booking';
$user = 'root';
$pass = 'root';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name'], $data['email'], $data['specialRequests'], $data['flightDetails'])) {
    echo json_encode(["success" => false, "message" => "Missing booking details!"]);
    exit;
}

// Sanitize inputs
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$specialRequests = $conn->real_escape_string($data['specialRequests']);
$flightDetails = $conn->real_escape_string($data['flightDetails']);

// Insert into DB
$sql = "INSERT INTO flight_bookings (name, email, special_requests, flight_details)
        VALUES ('$name', '$email', '$specialRequests', '$flightDetails')";

if ($conn->query($sql) === TRUE) {
    $mail = new PHPMailer(true);

    try {
        // ✅ Brevo SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp-relay.brevo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'bobbalakchandana@gmail.com'; // Your Brevo email
        $mail->Password   = 'xsmtpsib-2c6a1c346f702b7b4212693d13b484b8bc1e25c5a44d53c69e4fb98a68f6d055-dXDQLcnOWMC3aJPN';           // Your generated SMTP key
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('bobbalakchandana@gmail.com', 'NextGen Travel');
        $mail->addAddress($email, $name); // ✅ Sends to the registered email

        $mail->isHTML(true);
        $mail->Subject = '✈️ Your Flight Booking Confirmation';
        $mail->Body    = "
            <h3>Hello $name,</h3>
            <p>Your flight has been successfully booked!</p>
            <p><strong>Flight Details:</strong> $flightDetails</p>
            <p><strong>Special Requests:</strong> $specialRequests</p>
            <p>Thank you for choosing NextGen Travel.</p>
        ";

        $mail->SMTPDebug = 2;            // Verbose output
        $mail->Debugoutput = 'error_log'; // Log output to error log


        $mail->send();
        echo json_encode(["success" => true, "message" => "Booking stored and email sent to $email"]);
    } catch (Exception $e) {
        echo json_encode(["success" => true, "message" => "Booking stored, but email failed to send. Error: {$mail->ErrorInfo}"]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Failed to store flight booking. " . $conn->error]);
}

$conn->close();
?>
