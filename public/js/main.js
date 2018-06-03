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
    });

	var utc = new Date().toJSON().slice(0,10); // gets current date

	function signInButton() {
		const provider = new firebase.auth.GoogleAuthProvider(); // sign in with firebase
		firebase.auth().signInWithPopup(provider).then((result) => {
			var user = result.user; // sets current user to whoever signed in
			myDoc = db.collection("users").doc(user.uid); // sets or creates doc for user
			$("#sign").html("<h2>"+user.displayName+"</h1>"); // puts user's name on sign in button
			if (!docArr.includes(user.uid)) { // if new user
				alert("Welcome to habitree, " + user.displayName); // welcomes new user
				myDoc.set({ // lays out format for new user document
					"Get started with habitree": {
						startDate: utc,
						dates: [utc]
					}
				});
				newHabit("Get started with habitree");
			}

			else {
				alert("Welcome back, " + user.displayName); // welcomes previous user
				myDoc.get().then(doc => {
					var habArr = Object.entries(doc.data());
					console.log(doc.data());
					for(var i in habArr) {
						console.log(habArr[i]);
						newHabit(habArr[i][0]); // spawns habit buttons for each habit
						var dates = habArr[i][1].dates; // array of dates habit done
						var strk = streak(dates);
						console.log(strk);
						$("#"+habArr[i][0]).append("<h2> Streak: " + strk[0] + "</h2>");
						$("#"+habArr[i][0]).append("<h2> Face: " + strk[1] + "</h2>");
						// calculates streak and displays for each
						// delete habit button and function
					}
				});
			}
		}).catch((error) => {console.log(error)});
	}

	function newHabit(hab) {
		$("#habits").append(
			"<h4>"+ hab +"</h4>" + 
			"<button class='btn btn-primary btn-lg' id='" + hab + "'> Do habit </button>" +
			"<button class='btn btn-primary btn-lg mx-2' id='" + hab + "Del'> Delete habit </button>"
			); // creates new button object with name hab
		return hab;
	}

	function send(hab) { // should also post to firebase
	    myDoc.get().then(doc => {
	    	var habt = doc.data()[hab]; // gets current habit data
	    	console.log(habt);
	    	var length = habt.dates.length; // length of habit dates
	    	var dts = []; // dates array
	    	console.log(habt);
	    	if (length != 0)
		    	for (let q=0; q <= length-1; q++){
		    		dts[q] = habt.dates[q]; // writes current dates from firestore to dts array
		    	}
		    console.log(dts);

	    	if (dts[length-1] != utc) { // if today's date isn't already on utc
				dts.push(utc); // appends today's date to end of dts
		    	console.log(dts);

		    	myDoc.update({
		    		[hab]: {
		    			dates: dts, // write dts to firestore dates, essentially just adding today's date
		    			startDate: habt.startDate
		    		}
		    	});
		    	var strk = streak(habt.dates);

		    	var link = "https://dweet.io/dweet/for/hbtr?" + strk[0] + "," + strk[1]; // posting face val to dweet
			    var xmlHttp = new XMLHttpRequest();
			    xmlHttp.open("GET", link, false); // dweets hab to the link
			    xmlHttp.send(null);
			    console.log(xmlHttp.responseText); // reassures that dweet has been sent
	    	}
	    	else
	    		alert("You already did this habit today!");
		});
	}

	function del(hab) {
		myDoc.update({ [hab]:firebase.firestore.FieldValue.delete() }); // delete firebase entry
		console.log(hab);
		$("#"+hab).remove(); // delete html component
		$("#"+hab+"Del");
	}

	function streak(dates) {
		var streak = 0; // consecutive days till today habit done
		var back = 5; // how many days in past to look to calculate [face]
		var face = 0; // consecutive days habit done since [back]

		for (let j = dates.length - 1; j >= 0; j--) {
			if (j == dates.length-back)
				face = back;

			if (Date.parse(dates[j])-Date.parse(dates[j-1]) != 86400000) {
				streak = dates.length-j;
				if (face != back)
					face = dates.length-j;
				break;
			}
		}
		console.log("face " + face);
		face /= back;

		return [streak, face];
	}

	$("#sign").click(()=>{ // waits for sign in button to be clicked
		console.log("signing in");
		signInButton();
	});

	$("body > div > .input-group > span > button").click(()=>{ // waits for new habit button to be clicked
		console.log("created");
		var hab = newHabit($("#tx").val());
		console.log(hab);

		myDoc.update({
				[hab]: { // adds your new habit to firebase habit array
					"startDate":utc, 
					"dates":[]
				}
		});
	});

	$("#habits").on("click", "button", (b)=>{ // waits for habit button to be clicked
		hab = $(b)[0].target.id;

		if (hab.substring(hab.length-3) == "Del") { // if button id ends with "Del", delete the habit
			del(hab.substring(0, hab.length-3));
			console.log("deleted");
		}
		else { // otherwise, it's a "Do habit" button and should send
			console.log(hab);
			send(hab);
			console.log("sent"); 
		}
	});
});