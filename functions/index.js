const firebase = require("firebase");
const functions = require('firebase/functions');
const admin = require('firebase/admin');
const firestore = require('firebase/firestore');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	firebase.send("Hello from Firebase!");
});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://pagimo-hack.firebaseio.com'
});

// module.exports.createUser = (uid, name, username) => new Promise((resolve, reject) => {
// 	// Either use the username or get a slug from the name
// 	const userId = username || slug(name).toLowerCase();
// 	usersRef.doc(userId).get().then((doc) => {
// 		if (!doc.exists) {
// 			// Add the user to /users/
// 			usersRef.doc(userId).set({
// 				uid,
// 				name,
// 				posts: [],
// 				investments: [],
// 				created: Date.now(),
// 				tokens: 0
// 			}).then(() => {
// 				// Add the user to /auth/
// 				authRef.doc(uid).set({
// 					user: userId
// 				}).then(resolve).catch(reject);
// 			}).catch(reject);
// 		}
// 	}).catch(err => reject);
// });
