	
$(document).ready(function(){


	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAOvuBjDloWxmel5DKtcKp2IpIjyPZDqp4",
		authDomain: "groupproject-1-ftp.firebaseapp.com",
		databaseURL: "https://groupproject-1-ftp.firebaseio.com",
		storageBucket: "groupproject-1-ftp.appspot.com",
		messagingSenderId: "355866249539"
	};
	firebase.initializeApp(config);

$("#btn-create").on("click", function(){
	var email = $("#new-email-input").val().trim();
	var password = $("#new-password-input").val().trim();
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;

});
})



// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// ...
// });

// firebase.auth().onAuthStateChanged(function(user) {
// 	if (user) {
// 		// User is signed in.
// 		var displayName = user.displayName;
// 		var email = user.email;
// 		var emailVerified = user.emailVerified;
// 		var photoURL = user.photoURL;
// 		var isAnonymous = user.isAnonymous;
// 		var uid = user.uid;
// 		var providerData = user.providerData;
// 		// ...
// 	} else {
// 	// User is signed out.
// 	// ...
// 	}
// });
});