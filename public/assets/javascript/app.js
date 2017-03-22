
var calendars = {};

$(document).ready(function(){

	// to show the JavaScript page is attached
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

	var database = firebase.database();
	var ref = database.ref();


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
				location.reload(true);
			});


			// Declaring Database
			var database = firebase.database();


			// Initial Variables
			var firstCont = "";
			var lastCont = "";
			var emailCont = "";
			var phoneCont = "";
	


		// For toggling through the Contact tabs
		function curContactClick () {
			event.preventDefault();
			$("#cur-contact-div").removeClass("hide");
			$("#new-contact-div").addClass("hide");
			$("#cur-contact-div").addClass("active in");
			$("#new-contact-div").removeClass("active in");
			$("#list-cur-contact").addClass("active");
			$("#list-new-contact").removeClass("active");
			console.log("function cur contact clicked.");
		};
		function newContactClick () {
			event.preventDefault();
			$("#cur-contact-div").addClass("hide");
			$("#new-contact-div").removeClass("hide");
			$("#cur-contact-div").removeClass("active in");
			$("#new-contact-div").addClass("active in");
			$("#list-cur-contact").removeClass("active");
			$("#list-new-contact").addClass("active");
			console.log("function new contact clicked.");
		};
		$("#cur-contact-tab").on('click', function(){
			 curContactClick ();
		});
		$("#new-contact-tab").on('click', function(){
			 newContactClick ();
		});





		//----------    Calendar JS  --------------------


		// assigning the current month
		var thisMonth = moment().format('YYYY-MM');
		// Events to load into calendar
		var eventsArray = [];
		var newName;
		var newDate;
		var newStart;
		var newEnd;
		var newEvent;
		var rightNow = moment();
		var numberOfEvents = 0;


		// updating the calendar from adding Firebase events
		function refreshCal () {
			if(eventsArray.length == 0) {
				console.log("trigger if : " + eventsArray);
				calendars.clndr1 = $('.cal1').clndr({
					events:[
					{
						title: 'Example Event',
						startDate: moment(),
						endDate: moment()
					}],
					clickEvents: {
						click: function (target) {
								console.log('Cal-1 clicked: ', target);
						},
						today: function () {
								console.log('Cal-1 today');
						},
						nextMonth: function () {
								console.log('Cal-1 next month');
						},
						previousMonth: function () {
								console.log('Cal-1 previous month');
						},
						onMonthChange: function () {
								console.log('Cal-1 month changed');
						},
						nextYear: function () {
								console.log('Cal-1 next year');
						},
						previousYear: function () {
								console.log('Cal-1 previous year');
						},
						onYearChange: function () {
								console.log('Cal-1 year changed');
						},
						nextInterval: function () {
								console.log('Cal-1 next interval');
						},
						previousInterval: function () {
								console.log('Cal-1 previous interval');
						},
						onIntervalChange: function () {
								console.log('Cal-1 interval changed');
						}
					},
					multiDayEvents: {
						singleDay: 'date',
						endDate: 'endDate',
						startDate: 'startDate'
					},
					showAdjacentMonths: true,
					adjacentDaysChangeMonth: false
				});
				console.log("calendar refreshed.")
			} else {
				console.log("trigger else : " + eventsArray);
				calendars.clndr1 = $('.cal1').clndr({
					events: eventsArray,
					clickEvents: {
						click: function (target) {
								console.log('Cal-1 clicked: ', target);
						},
						today: function () {
								console.log('Cal-1 today');
						},
						nextMonth: function () {
								console.log('Cal-1 next month');
						},
						previousMonth: function () {
								console.log('Cal-1 previous month');
						},
						onMonthChange: function () {
								console.log('Cal-1 month changed');
						},
						nextYear: function () {
								console.log('Cal-1 next year');
						},
						previousYear: function () {
								console.log('Cal-1 previous year');
						},
						onYearChange: function () {
								console.log('Cal-1 year changed');
						},
						nextInterval: function () {
								console.log('Cal-1 next interval');
						},
						previousInterval: function () {
								console.log('Cal-1 previous interval');
						},
						onIntervalChange: function () {
								console.log('Cal-1 interval changed');
						}
					},
					multiDayEvents: {
						singleDay: 'date',
						endDate: 'endDate',
						startDate: 'startDate'
					},
					showAdjacentMonths: true,
					adjacentDaysChangeMonth: false
				});
				console.log("calendar refreshed.")
			};
		};

		refreshCal ();


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

		// Handle the errors
		}, function(errorObject) {
			console.log("Errors handled: " + errorObject.code);
		});



		// Adding the new contact to the page
		database.ref('users/'+uid+'/contacts').orderByChild("lastCont").on("child_added", function(snapshot) {
			var markup = "<tr><td>" + snapshot.val().firstCont + "</td><td>" + snapshot.val().lastCont + "</td><td>" + snapshot.val().emailCont + "</td><td>" + snapshot.val().phoneCont + "</td></tr>";
			$("#exContactTbody").append(markup);
		});


		$("#new-date-button").on("click", function(event) {
		event.preventDefault();

			// Grab values from text boxes
			newName = $("#event-name-input").val().trim();
			newLocation = $("#event-loc-select").val().trim();
			newStartDate = $("#event-start-date-input").val().trim();
			newStartTime = $("#event-start-time-input").val().trim();

			console.log(newName);
			console.log(newLocation);
			console.log(newStartDate);
			console.log(newStartTime);

			database.ref('users/'+uid+'/events').push({
					title: newName,
					location: newLocation,
					start: newStartDate,
					startTime: newStartTime,
					dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		});


		// Firebase watcher + initial loader HINT: .on("value")
		database.ref('users/'+uid+'/events').on("child_added", function(snapshot) {

			// storing the snapshot.val() in a variable for convenience
			var snapValue = snapshot.val();
			
			// Getting an array of each key In the snapshot object
			var snapValueArr = Object.keys(snapValue);

			// Finding the last user's key
			var lastIndex = snapValueArr.length - 1;

			var lastKey = snapValueArr[lastIndex];

			// Using the last user's key to access the last added user object
			var lastObj = snapValue[lastKey]

					// Handle the errors
		}, function(errorObject) {
				console.log("Errors handled: " + errorObject.code);
		});



		database.ref('users/'+uid+'/events').orderByChild("start").on("child_added", function(snapshot) {

				var removeRef = database.ref('users/'+uid+'/events');

				var calMarkUp = {
					title: snapshot.val().title,
					startDate: snapshot.val().start
				};

				var newKey = snapshot.key;
				
				eventsArray.push(calMarkUp);
				refreshCal();
				$('.cal1').clndr().setEvents(eventsArray);
				
				var adjustedStart = moment(snapshot.val().start).format('LL');
				var adjustedStartTime = moment(snapshot.val().startTime).format('h:mm:ss a');


				// adding new event to the page
				var newUpcoming = "<tr><td>" + snapshot.val().title 
				+ "</td><td>" + snapshot.val().location 
				+ "</td><td>" + adjustedStart 
				+ "</td><td>" + snapshot.val().startTime
				// + "</td><td>" + newEventButton
				+ "</td></tr>";
				$("#upcoming-Tbody").append(newUpcoming);

				// creating the delete button for an event
				var newEventButton = $('<button/>',{
					class: 'delete-button',
					text: 'Remove: '+snapshot.val().title,
					value: 'remove',
					click: function removal(){
						console.log("remove clicked")
						removeRef.child(newKey).remove().key;
						location.reload(true);
					}
				});
				// adding new button to the page
				$("#newButtonGoHere").append(newEventButton);

				numberOfEvents++;

		});

	} else {
		// User is signed out revert to log in page
		$("#btnLogOut").addClass("hide");
		$("#main-cont").addClass("hide");
		$("#log-in-cont").removeClass("hide");
		$("#exContactTbody").html("");
	}

	$(document).keydown( function(e) {
			// Left arrow
			if (e.keyCode == 37) {
					calendars.clndr1.back();
			}

			// Right arrow
			if (e.keyCode == 39) {
					calendars.clndr1.forward();
			}
		});
	});
});




