
$(document).ready(function(){


	console.log("JS Attached.");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOvuBjDloWxmel5DKtcKp2IpIjyPZDqp4",
    authDomain: "groupproject-1-ftp.firebaseapp.com",
    databaseURL: "https://groupproject-1-ftp.firebaseio.com",
    storageBucket: "groupproject-1-ftp.appspot.com",
    messagingSenderId: "355866249539"
  };
  firebase.initializeApp(config);


	// Add Login Event
	$("#btnLogIn").on("click", function(){
		var email = $("#email-input").val().trim();
		var password = $("#password-input").val().trim();
		console.log("Log In clicked");
		// const auth = firebase.auth();

		// Sign In
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			console.log("User not registered.")
		// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	});

	$("#btnRegister").on("click", function(){
		$("#register-div").removeClass("hide");
	});

	// Sign Up
	$("#btnSignUp").on("click", function(snap){
		var email = $("#new-email-input").val().trim();
		var password = $("#new-password-input").val().trim();
		console.log("sign up clicked");
		// const auth = firebase.auth();

		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			console.log("made it to error")
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	});


	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			$("#btnLogOut").removeClass("hide");
			$("#main-cont").removeClass("hide");
			$("#log-in-cont").addClass("hide");
			// ...
		} else {
			$("#btnLogOut").addClass("hide");
			$("#main-cont").addClass("hide");
			$("#log-in-cont").removeClass("hide");
		// User is signed out.
		// ...
		}
	});

	$("#btnLogOut").on("click", function(){
		firebase.auth().signOut().then(function() {
			console.log("Log Out clicked")
			
		}).catch(function(error) {
			// An error happened.
		});
	});

});



