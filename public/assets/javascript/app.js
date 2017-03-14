
$(document).ready(function(){

	// to show the JavaScript page is running
	console.log("JS Attached");

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyAOvuBjDloWxmel5DKtcKp2IpIjyPZDqp4",
	authDomain: "groupproject-1-ftp.firebaseapp.com",
	databaseURL: "https://groupproject-1-ftp.firebaseio.com",
	storageBucket: "groupproject-1-ftp.appspot.com",
	messagingSenderId: "355866249539"
	};
	firebase.initializeApp(config);


	// Log In Button
	$("#btnLogIn").on("click", function(){
		var email = $("#email-input").val().trim();
		var password = $("#password-input").val().trim();
		console.log("Log In clicked");

		// Sign In to FBase
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			console.log("User not registered.")
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	});

	//Registration Button will show Sign Up Div
	$("#btnRegister").on("click", function(){
		$("#register-div").removeClass("hide");
		$("#log-in-div").addClass("hide");
	});

	// Sign Up Button 
	$("#btnSignUp").on("click", function(snap){
		var firstName = $("#new-first-name-input").val().trim();
		var lastName = $("#new-last-name-input").val().trim();
		var email = $("#new-email-input").val().trim();
		var password = $("#new-password-input").val().trim();
		console.log("sign up clicked");

		// Create and sign in the user to FBase 
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			console.log("made it to error")
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	});

	// When there is a change to who is logged in
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("User Logged-In")

			// Declaring all Variables 
			var firstName = user.firstName;
			var lastName = user.lastName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;

			//Removing Log-In page
			$("#btnLogOut").removeClass("hide");
			$("#main-cont").removeClass("hide");
			$("#log-in-cont").addClass("hide");


			//Log Out Button
			$("#btnLogOut").on("click", function(){
				//User Logs Out from FBase
				firebase.auth().signOut().then(function() {
					console.log("User Logged-Out")		
				}).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
				});
			});


			// Declaring Database
			var database = firebase.database();


			// Initial Variables
			var firstCont = "";
			var lastCont = "";
			var emailCont = "";
			var phoneCont = "";
	

			// New Contact Button Click
			$("#btnNewCont").on("click", function(event) {
				event.preventDefault();
				console.log("cont clicked");

				// Grab values from text boxes
				firstCont = $("#first-name-cont-input").val().trim();
				lastCont = $("#last-name-cont-input").val().trim();
				emailCont = $("#email-cont-input").val().trim();
				phoneCont = $("#phone-cont-input").val().trim();

				// Code for handling the push
				database.ref('users/'+uid+'/contacts').push({
					firstCont: firstCont,
					lastCont: lastCont,
					emailCont: emailCont,
					phoneCont: phoneCont,
					dateAdded: firebase.database.ServerValue.TIMESTAMP
				});
			});


			// Firebase watcher + initial loader HINT: .on("value")
			database.ref('users/'+uid+'/contacts').on("child_added", function(snapshot) {

				// storing the snapshot.val() in a variable for convenience
				var snapValue = snapshot.val();
				
				// Getting an array of each key In the snapshot object
				var snapValueArr = Object.keys(snapValue);

				// Finding the last user's key
				var lastIndex = snapValueArr.length - 1;

				var lastKey = snapValueArr[lastIndex];

				// Using the last user's key to access the last added user object
				var lastObj = snapValue[lastKey]	

			// 	// Handle the errors
			}, function(errorObject) {
				console.log("Errors handled: " + errorObject.code);
			});



			database.ref('users/'+uid+'/contacts').orderByChild("lastCont").on("child_added", function(snapshot) {

			// CODE FOR ADDING CONTACTS AS CHECKLIST	
				// $('</br>').prependTo('#new-contacts-here');
				// $('<input/>', {
				// 	id: snapshot.val().firstCont + "-input",
				// 	class: 'checkbox-input',
				// 	type: 'checkbox',
				// 	value: snapshot.val().emailCont
				// }).prependTo('#new-contacts-here');
				// $('<label/>', {
				// 	id: snapshot.val().firstCont + "-label",
				// 	class: 'checkbox-label',
				// 	for: snapshot.val().emailCont,
				// 	value: snapshot.val().emailCont,
				// 	text: snapshot.val().firstCont + " " + snapshot.val().lastCont
				// }).prependTo('#new-contacts-here');


				var markup = "<tr><td>" + snapshot.val().firstCont + "</td><td>" + snapshot.val().lastCont + "</td><td>" + snapshot.val().emailCont + "</td><td>" + snapshot.val().phoneCont + "</td></tr>";
				$("#exContactTbody").append(markup);
				});



		} else {
			// User is signed out revert to log in page
			$("#btnLogOut").addClass("hide");
			$("#main-cont").addClass("hide");
			$("#log-in-cont").removeClass("hide");
			$("#exContactTbody").html("");
		}
	});
});



