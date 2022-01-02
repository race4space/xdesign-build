<?php
if($_GET){
    //defining the session_id() before session_start() is the secret
    session_id($_GET['session_id']);
    session_start();
    echo "Data: " . $_SESSION['theVar'];
    //use your data before below commands
    session_destroy();
    session_commit();
}else{
    //common session statement goes here
    session_start();
    $session_id=session_id();
    $_SESSION['theVar'] = "theData";
    echo "your.php?session_id=" . $session_id;
}
?>