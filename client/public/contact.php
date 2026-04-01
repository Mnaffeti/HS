<?php
// contact.php - Designed for OVH Shared Hosting
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$to = "contact@hemmaconsulting.com"; // <<-- UPDATE THIS WITH YOUR OVH WEBMAIL ADDRESS

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Read the incoming JSON body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
    $email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
    $company = isset($data['company']) ? trim(strip_tags($data['company'])) : 'N/A';
    $message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

    // Validation
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Validation failed: Please fill in all required fields properly.']);
        exit;
    }

    $subject = "New Contact Form Submission from " . $name;
    
    $body = "You have received a new contact form submission:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Company: " . $company . "\n";
    $body .= "Message: \n" . $message . "\n";

    // The sender must be local to OVH to prevent anti-spam blockage, so we use your domain as the sender 
    // and put the user's email into Reply-To.
    $headers = "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // OVH's native PHP mail() function
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email. Check OVH mail settings.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>