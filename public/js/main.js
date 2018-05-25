$(() =>  {
	var app = firebase.initializeApp({
	  apiKey: "AIzaSyAUkLOwbx0XFasSPQfbWSuBgoTQIENOGZo",
	  authDomain: "habitree-14839.firebaseapp.com",
	  databaseURL: "https://habitree-14839.firebaseio.com",
	  projectId: "habitree-14839",
	  storageBucket: "habitree-14839.appspot.com",
	  messagingSenderId: "927419743609"
	});

    var db = firebase.firestore();
    var docArr = [];
    var user = "";

   	db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        docArr.push(doc.id);
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
   	console.log(docArr);

	var utc = new Date().toJSON().slice(0,10);

	function signInButton() {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then((result) => {
			user = result.user;
			console.log(user.displayName);
			$("#sign").html("<b>"+user.displayName+"</b>");

			if (!docArr.includes(user.uid)) {
				var docRef = db.collection("users").doc(user.uid);
				docRef.set({
					habits:{
						habitA:{
							startDate:utc,
							dates:[utc],
						}
					}
				});
				console.log(docRef);
			}

			else {
				console.log("Welcome back " + user.displayName);
				// after signin, spawn all the buttons for habits
			}
		}).catch((error) => {
			console.log(error)
		});
	}

	function newHabit() {
		var cont = $("#tx").val()
		$("#habits").append(
			"<p>"+ cont +"</p>" + "<button id=\"" + cont + "\"> Do habit </button>" 
			);
		console.log(user.uid);
		var docRef = db.collection("users").doc(user.uid);
		docRef.get()
		.then(doc => {
			console.log(doc.data());
		});
	}

	function send(cont) { // should also post to firebase
      var link = "https://dweet.io/dweet/for/hbtr?" + cont;
      // get cont habit object from firebase
      // calculate habit streak, if = 0, find last date
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", link, false);
      xmlHttp.send(null);
      console.log(xmlHttp.responseText);
	}

	$("div > button").click(()=>{ // sign in button
		console.log("signing in");
		signInButton();
	});

	$("body > button").click(()=>{
		console.log("cr8d");
		newHabit();
	});

	$("#habits").on("click", "button", (b)=>{
		console.log("sent");
		send($(b)[0].target.id);
	});
});