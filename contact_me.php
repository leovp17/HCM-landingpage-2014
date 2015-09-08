<?php
if($_POST)
{
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        die();
    } 
	
	$to_Email   	= "contacto@hcmfront.com"; //Replace with recipient email address
	$subject        = 'Contacto HCMFront'; //Subject line for emails
	
	//check $_POST vars are set, exit if any missing
	if(!isset($_POST["userName"]) || !isset($_POST["userEmail"]) || !isset($_POST["userMessage"]))
	{
		die();
	}

	//Sanitize input data using PHP filter_var().
	$user_Name        = filter_var($_POST["userName"], FILTER_SANITIZE_STRING);
	$user_Email       = filter_var($_POST["userEmail"], FILTER_SANITIZE_EMAIL);
	//$user_Phone       = filter_var($_POST["userPhone"], FILTER_SANITIZE_STRING);
	$user_Message     = filter_var($_POST["userMessage"], FILTER_SANITIZE_STRING);
	
	//additional php validation
	if(strlen($user_Name)<4) // If length is less than 4 it will throw an HTTP error.
	{
		header('HTTP/1.1 500 El nombre es muy corto o esta en blanco!');
		exit();
	}
	if(!filter_var($user_Email, FILTER_VALIDATE_EMAIL)) //email validation
	{
		header('HTTP/1.1 500 Ingresa una dirección de correo válida!');
		exit();
	}
	//if(!is_numeric($user_Phone)) //check entered data is numbers
	//{
	//	header('HTTP/1.1 500 Only numbers allowed in phone field');
	//	exit();
	//}
	if(strlen($user_Message)<5) //check emtpy message
	{
		header('HTTP/1.1 500 El mensaje es muy corto! Por favor agrega una consulta.');
		exit();
	}
	
	//proceed with PHP email.
	$headers = 'From: '.$user_Email.'';
	
	@$sentMail = mail($to_Email, $subject, $user_Message .'  -'.$user_Name, $headers);
	
	if(!$sentMail)
	{
		header('HTTP/1.1 500 El mensaje no pudo ser enviado! Disculpas..');
		exit();
	}else{
		echo 'Hola '.$user_Name .', Gracias por contactarnos! ';
		echo 'Tu consulta ha sido enviada y nos pondremos en contacto lo antes posible.';
	}
}
?>