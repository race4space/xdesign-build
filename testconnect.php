<?php

$from = "marketing@myrsstestdomain.com";
$to = "chris.owtram@gmail.com";
$subject = "Hello Sendmail";
$message = "This is an test email to test Sendmail.";
$headers = [ "From: $from" ];


$domain_name = substr(strrchr($to, "@"), 1);
$rr = dns_get_record($domain_name, DNS_MX);    


if($rr){
    echo ("Domain Valid"."<br>");
    try{
        $success=mail( $to, $subject, $message, implode( '\r\n', $headers ) );
        //$success=mail( $to, $subject, $message, implode( '\r\n', $headers ) );
        if (!$success) {
            //$errorMessage = error_get_last()['message'];
            echo ("Error"."<br>");
            print_r(error_get_last());
            
        }else{
            echo 'Mail Sent';
        }
        
    }
    catch(Exception $e) {
        echo 'Message: ' .$e->getMessage()."<br>";
    }
    
    }
else{
    echo ("Domain Not Valid"."<br>");
}


// OR - PHP 7.2.0 or greater
//mail( $to, $subject, $message, $headers );



function xxmail($to, $subject, $body, $headers)
{
$smtp = stream_socket_client('ssl://smtp.sendgrid.net:465', $eno, $estr, 30);

$B = 8192;
$c = "\r\n";
$s = 'marketing@myrsstestdomain.com';

fwrite($smtp, 'helo ' . $_ENV['HOSTNAME'] . $c);
  $junk = fgets($smtp, $B);

// Envelope
fwrite($smtp, 'mail from: ' . $s . $c);
  $junk = fgets($smtp, $B);
fwrite($smtp, 'rcpt to: ' . $to . $c);
  $junk = fgets($smtp, $B);
fwrite($smtp, 'data' . $c);
  $junk = fgets($smtp, $B);

// Header
fwrite($smtp, 'To: ' . $to . $c);
if(strlen($subject)) fwrite($smtp, 'Subject: ' . $subject . $c);
if(strlen($headers)) fwrite($smtp, $headers); // Must be \r\n (delimited)
fwrite($smtp, $headers . $c);

// Body
if(strlen($body)) fwrite($smtp, $body . $c);
fwrite($smtp, $c . '.' . $c);
  $junk = fgets($smtp, $B);

// Close
fwrite($smtp, 'quit' . $c);
  $junk = fgets($smtp, $B);
fclose($smtp);
}

?>
