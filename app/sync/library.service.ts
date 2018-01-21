import * as firebase from 'firebase'
import 'firebase/firestore'

export const fbconfig = {
apiKey: 'AIzaSyDr0-Mef6D1RZsD2NoBaPOwordhUW58MyU',
authDomain: 'brudi-lov.firebaseio.com',
databaseURL: "https://brudi-lov.firebaseio.com",
projectId: 'brudi-lov',
//storageBucket: 'contacts-app-dca62.appspot.com',
//messagingSenderId: '715354469790'
}

const firebaseApp = firebase.initializeApp(fbconfig);

var db = firebaseApp.firestore();

export const libraryService = {
	getPlaylists: playlists
};


async function playlists() {

	let res = null;
	try {
		res = await db.collection('playlists').get();
	} catch (e) {
		console.error(e);
	}

	return res;
}



