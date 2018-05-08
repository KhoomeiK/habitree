$(() =>  {
	// Initialize Firebase

	firebase.initializeApp();

	var app = firebase.app();
	var db = firebase.firestore();

	var config = {
	  apiKey: "AIzaSyAUkLOwbx0XFasSPQfbWSuBgoTQIENOGZo",
	  authDomain: "habitree-14839.firebaseapp.com",
	  databaseURL: "https://habitree-14839.firebaseio.com",
	  projectId: "habitree-14839",
	  storageBucket: "habitree-14839.appspot.com",
	  messagingSenderId: "927419743609"
	};


	// const provider = new firebase.auth.GoogleAuthProvider();
	// function signInButton() {
	// 	firebase.auth().signInWithPopup(provider).then((result) => {
	// 		const token = result.credential.accessToken;
	// 		console.log(token);
	// 	}).catch((error) => {
	// 		console.log(error)
	// 	});
	// }


	function newHabit() {
		var cont = $("#tx").val()
		$("#habits").append(
			"<p>"+ cont +"</p>" + "<button id=\"" + cont + "\"> Do habit </button>" 
			);
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