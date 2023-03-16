<?php
// Get form data
$to = $_POST['email'];
$subject = 'List of items';
$message = $_POST['message'];
$headers = 'From: tessfbs@gmail.com' . "\r\n" .
    'Reply-To: tessfbs@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send email
mail($to, $subject, $message, $headers);
?>
