import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCriLfzOS7gHdSPfl_z6YotxEKie8hHHpc",
    authDomain: "crn-db-312db.firebaseapp.com",
    projectId: "crn-db-312db",
    storageBucket: "crn-db-312db.appspot.com",
    messagingSenderId: "578853880583",
    appId: "1:578853880583:web:ceff2a73c9bc360122fba2",
    measurementId: "G-G1JV8LE197"
};
export const createUserProfileDocument = async (userAuth,additionData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${ userAuth.uid }`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionData
                })
        }
        catch (error) {
            console.log('error creating user : ', error.message);

        }
    }
    return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;