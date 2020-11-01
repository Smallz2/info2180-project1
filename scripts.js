/* Add your JavaScript to this file */

"use strict"

let rememeber_session_emails = []

window.onload = function() {
	main()
}

function main() {
	processForm()
}


function processForm() {
	var form = document.getElementsByTagName('form')[0]
	document.getElementsByTagName('button')[0].addEventListener("click", validateForm)
}


function validateForm() {
	var email_input = document.getElementById("email").value.trim()
	var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  // Submit form without reloading
  event.preventDefault();
  event.stopPropagation();

	if (email_regex.test(email_input) && email_input != "") {

		if (!emailNotAddedTwiceInSession(email_input)) {
			setMessage("Email already registered", "success")
			return
		}

		rememeber_session_emails.push(email_input)
		setMessage(`Thank you! Your email address ${email_input} has been added to our mailing list!`, "success")
		document.getElementById("email").value = ""

		return
	} 

	setMessage("Please enter a valid email!", "error")
}

function emailNotAddedTwiceInSession(email) {
	for (var i = 0; i < rememeber_session_emails.length; i++) {
		if (rememeber_session_emails[i] == email) {   
			return false
		}
	}
	return true
}


function setMessage(message, status) {
	var message_container = document.getElementsByClassName("message")[0]
	message_container.style.display = '';
	message_container.innerHTML = message
	message_container.style.backgroundColor = "white"
	message_container.style.padding = "5px"

	if (status == "error") {
		message_container.style.color = "red"
	} else {
		message_container.style.color = "#48BB78"
	}

	setTimeout(function() {
		message_container.innerHTML = ""
		message_container.style.display = 'none';
	}, 5000)
}