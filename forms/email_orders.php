<?php
// Include PHPMailer library
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php-email-form/PHPMailer/src/Exception.php';
require 'php-email-form/PHPMailer/src/PHPMailer.php';
require 'php-email-form/PHPMailer/src/SMTP.php';

// Replace these variables with your own values
$to_email = 'joejnke@gmail.com';
$from_email = $_POST['emailAddress'];
$from_name = $_POST['name'];
$subject = 'Email Order';
$message = $_POST['message'];

// Instantiate PHPMailer
$mail = new PHPMailer();

// Set mailer to use SMTP
$mail->isSMTP();

// Specify SMTP settings
$mail->Host = 'smtp.jabduumotors.com';
$mail->SMTPAuth = true;
$mail->Username = 'sales@jabduumotors.com';
$mail->Password = 'Longlive@Ethiopia';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

// Set email parameters
$mail->setFrom($from_email, $from_name);
$mail->addAddress($to_email);
$mail->Subject = $subject;
$mail->Body = $message;

// Send email
if ($mail->send()) {
    echo 'Message has been sent';
} else {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
?>
