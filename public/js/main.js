$(() =>  {
	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyAUkLOwbx0XFasSPQfbWSuBgoTQIENOGZo",
	  authDomain: "habitree-14839.firebaseapp.com",
	  databaseURL: "https://habitree-14839.firebaseio.com",
	  projectId: "habitree-14839",
	  storageBucket: "habitree-14839.appspot.com",
	  messagingSenderId: "927419743609"
	};

	firebase.initializeApp(config);

	const provider = new firebase.auth.GoogleAuthProvider();
	function signInButton() {
		firebase.auth().signInWithPopup(provider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const token = result.credential.accessToken;
			console.log(token);
			// Hide modal
			// if (!$('#modal').hasClass('hidden')) {
			// 	$('#modal').addClass('hidden');
			// }
			// Hide the Sign In Button
			// if (!$('#sign-in-btn').hasClass('hidden')) {
			// 	$('#sign-in-btn').addClass('hidden');
			// }
			// Show the User signed in
			// $('#sign-in-user').removeClass('hidden');
		}).catch((error) => {
			// $('#modal').removeClass('hidden');
			// $('#modal-title').text(`Error ${error.code}`);
			// $('#modal-content').text(error.message);
		});
	}

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

	$("div > button").click(()=>{
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