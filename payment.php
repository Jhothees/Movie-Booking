<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $movie_name = $_POST['movie_name'];
    $amount = $_POST['amount'];
    $user_id = $_SESSION['user_id'];

    $conn = new mysqli("localhost", "root", "", "movie_booking");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO payments (user_id, movie_name, amount) VALUES ('$user_id', '$movie_name', '$amount')";
    if ($conn->query($sql) === TRUE) {
        echo "Payment successful!";
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>
