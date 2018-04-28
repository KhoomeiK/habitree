const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

module.exports.createUser = (uid, name, username) => new Promise((resolve, reject) => {
	// Either use the username or get a slug from the name
	const userId = username || slug(name).toLowerCase();
	usersRef.doc(userId).get().then((doc) => {
		if (!doc.exists) {
			// Add the user to /users/
			usersRef.doc(userId).set({
				uid,
				name,
				posts: [],
				investments: [],
				created: Date.now(),
				tokens: 0
			}).then(() => {
				// Add the user to /auth/
				authRef.doc(uid).set({
					user: userId
				}).then(resolve).catch(reject);
			}).catch(reject);
		}
	}).catch(err => reject);
});
