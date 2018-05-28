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

	var utc = new Date().toJSON().slice(0,10); // gets current date

	function signInButton() {
		const provider = new firebase.auth.GoogleAuthProvider(); // sign in with firebase
		firebase.auth().signInWithPopup(provider).then((result) => {
			var user = result.user; // sets current user to whoever signed in
			myDoc = db.collection("users").doc(user.uid); // sets or creates doc for user
			$("#sign").html("<b>"+user.displayName+"</b>"); // puts user's name on sign in button

			if (!docArr.includes(user.uid)) { // if new user
				alert("Welcome to habitree " + user.displayName); // welcomes new user
				myDoc.set({ // lays out format for new user document
					"Get started with habitree": {
						startDate: utc,
						dates: [utc]
					}
				});
				newHabit("Get started with habitree");
			}

			else {
				alert("Welcome back " + user.displayName); // welcomes previous user
				myDoc.get()
				.then(doc => {
					var habArr = Object.entries(doc.data());
					console.log(doc.data());
					for(var i in habArr) {
						console.log(habArr[i]);
						newHabit(habArr[i][0]); // spawns habit buttons for each habit
						var dates = habArr[i][1].dates;
						for (var j=dates.length-1; j > dates.length-4; j--)
							if (Date.parse(dates[j])-Date.parse(dates[j-1]) != 86400000)
								console.log(dates.length-j);
								// not consecutive
						// }
						// $("#habits").append();
						// calculates streak and displays for each
						// delete habit button and function
					}
				});
			}
		}).catch((error) => {console.log(error)});
	}

	function newHabit(hab) {
		$("#habits").append(
			"<p>"+ hab +"</p>" + "<button id=\"" + hab + "\"> Do habit </button>" 
			); // creates new button object with name hab
		return hab;
	}

	function send(hab) { // should also post to firebase
	    var link = "https://dweet.io/dweet/for/hbtr?" + hab; // send streak here too
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET", link, false); // dweets hab to the link
	    xmlHttp.send(null);
	    console.log(xmlHttp.responseText); // reassures that dweet has been sent

	    myDoc.get().then(doc => {
	    	var habt = doc.data()[hab];
	    	var length = Object.keys(habt.dates).length;
	    	var dts = [];
	    	console.log(habt);
	    	console.log(length);
	    	for (let q=0; q <= length; q++){
	    		dts[q] = habt.dates[q];
	    	}
	    	dts[length] = utc;
	    	console.log(dts);
	    	myDoc.update({
	    		[hab]: {
	    			dates: dts
	    		}
	    	});
		});
	}

	$("div > button").click(()=>{ // waits for sign in button to be clicked
		console.log("signing in");
		signInButton();
	});

	$("body > button").click(()=>{ // waits for new habit button to be clicked
		console.log("created");
		var hab = newHabit($("#tx").val());
		console.log(hab);

		myDoc.update({
				[hab]: { // adds your new habit to firebase habit array
					"startDate":utc, 
					"dates":{}
				}
		});
	});

	$("#habits").on("click", "button", (b)=>{ // waits for habit button to be clicked
		console.log("sent");
		send($(b)[0].target.id);
	});
});