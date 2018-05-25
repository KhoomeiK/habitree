$(() =>  {
	var app = firebase.initializeApp({
		apiKey: "AIzaSyAUkLOwbx0XFasSPQfbWSuBgoTQIENOGZo",
		authDomain: "habitree-14839.firebaseapp.com",
		databaseURL: "https://habitree-14839.firebaseio.com",
		projectId: "habitree-14839",
		storageBucket: "habitree-14839.appspot.com",
		messagingSenderId: "927419743609"
	}); // connect to cloud Firebase app with habitree's credentials

    var db = firebase.firestore(); // connect to cloud Firestore database
    var docArr = []; // array of user documents in databse
    var myDoc = ""; // document for current signed in user

   	db.collection('users').get()
    .then((snapshot) => {
    	snapshot.forEach((doc) => {
    		docArr.push(doc.id); // adds all document ID's to docArr
    	});
    })
    .catch((err) => {
    	console.log('Error getting documents', err);
    });

	var utc = new Date().toJSON().slice(0,10); // gets current date

	function signInButton() {
		const provider = new firebase.auth.GoogleAuthProvider(); // sign in with firebase
		firebase.auth().signInWithPopup(provider).then((result) => {
			var user = result.user; // sets current user to whoever signed in
			myDoc = db.collection("users").doc(user.uid); // sets or creates doc for user
			$("#sign").html("<b>"+user.displayName+"</b>"); // puts user's name on sign in button

			if (!docArr.includes(user.uid)) { // if new user
				alert("Welcome to habitree" + user.displayName); // welcomes new user
				myDoc.set({ // lays out format for new user document
					"habits":{
						"habitA":{
							"startDate":utc,
							"dates":[utc]
						}
					}
				});
			}

			else {
				alert("Welcome back " + user.displayName); // welcomes previous user
				myDoc.get()
				.then(doc => {
					doc.habits.forEach(hab => {
						newHabit(hab); // spawns habit buttons for each habit
						for(var i=hab.dates.length()-1; i > 0; i--) {
							utca = hab.dates[i];
							m = utca.substring(5,7);
							d = utca.substring(9);
							// this is too cumbersome, check in date library for function to check if dates are sequential
						}
						$("#habits").append();
						// calculates streak and displays for each
						// delete habit button and function
					});
				});
			}
		}).catch((error) => {console.log(error)});
	}

	function newHabit(hab) {
		$("#habits").append(
			"<p>"+ hab +"</p>" + "<button id=\"" + hab + "\"> Do habit </button>" 
			); // creates new button object with name hab

		myDoc.update()
		.then(doc => {
			doc.habits.push({ hab:{ // adds your new habit to firebase habit array
				"startDate":utc, 
				"dates":[]
			}});
		});
	}

	function send(hab) { // should also post to firebase
	    var link = "https://dweet.io/dweet/for/hbtr?" + hab; // send streak here too
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", link, false); // dweets hab to the link
	    xmlHttp.send(null);
	    console.log(xmlHttp.responseText); // reassures that dweet has been sent
	    myDoc.update()
		.then(doc => {
			doc.habits.hab.dates.push(utc); // habit in firebase is updated as well
		});
	}

	$("div > button").click(()=>{ // waits for sign in button to be clicked
		console.log("signing in");
		signInButton();
	});

	$("body > button").click(()=>{ // waits for new habit button to be clicked
		console.log("created");
		newHabit($("#tx").val());
	});

	$("#habits").on("click", "button", (b)=>{ // waits for habit button to be clicked
		console.log("sent");
		send($(b)[0].target.id);
	});
});