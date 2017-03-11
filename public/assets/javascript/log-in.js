console.log("JS Attached.")

// (function (){
	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUzWBB0A6-VtJstFcOt9BQXoJ0BFYByrs",
    authDomain: "practiceauth-6227a.firebaseapp.com",
    databaseURL: "https://practiceauth-6227a.firebaseio.com",
    storageBucket: "practiceauth-6227a.appspot.com",
    messagingSenderId: "690661469065"
  };
  firebase.initializeApp(config);


	//Get Elements
	const txtEmail = document.getElementByID("#new-email-input");
	const txtPassword = document.getElementByID("#new-password-input");
	const txtLogin = document.getElementByID("#btnLogIn");
	const txtSignUp = document.getElementByID("#btnSignUp");
	const txtLogout = document.getElementByID("#btnLogOut");


	// Add Login Event
	$("#btnLogIn").on("click", function(){
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign In
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

	// Add Signup Event
	$("#btnSignUp").on("click", function(){
		//TODO: Chek for Real Email
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign In
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
	});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			btnLogOut.classList.remove("hide");
		} else {
			console.log("Not Logged In"); 
			btnLogOut.classList.add("hide");
		}
	});


	btnLogOut.addEventListener("click", e => {
		firebase.auth().signOut();
	});


// }());