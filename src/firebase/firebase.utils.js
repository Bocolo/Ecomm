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
export const createUserProfileDocument = async (userAuth, additionData) => {
    if (!userAuth) {
        return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
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
};

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit()
};


export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }

    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}
firebase.initializeApp(config);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    });
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;