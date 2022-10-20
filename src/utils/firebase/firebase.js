
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
import { errorCodesFromAuth } from "../../components/helper/helper";



const firebaseConfig = {
    apiKey: "AIzaSyAxN6rrPcIrr2k2ZsMR8O4nGPGPJtPijSY",
    authDomain: "tech-solution-67f1e.firebaseapp.com",
    projectId: "tech-solution-67f1e",
    storageBucket: "tech-solution-67f1e.appspot.com",
    messagingSenderId: "655073439450",
    appId: "1:655073439450:web:7689f13d4caa8bb6a03fe3",
    measurementId: "G-HSDVB663G5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);



const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
    'display': 'popup'
});

const twitterProvider = new TwitterAuthProvider();


export const auth = getAuth();


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const updateDisplayName = async (displayName) => {
    updateProfile(auth.currentUser, {
        displayName: displayName,
        });

}

export const createUser = async (displayName, email, password) => {
    try {

        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await updateDisplayName(displayName);
        await createUserDocumentFromAuth(user, { displayName });

    } catch (error) {
        errorCodesFromAuth(error);
    }
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createUserWithGooglePopup = async () => {  
    await signInWithPopup(auth, googleProvider)
    .then( () => {
        const user = auth.currentUser;
        createUserDocumentFromAuth( user, {}) 
    })
    .catch((error) =>{
        errorCodesFromAuth(error);
            });
}

export const createUserWithFacebookPopup = async () => {
    await signInWithPopup(auth, facebookProvider)
    .then( () => {
        const user = auth.currentUser;
        createUserDocumentFromAuth( user, {}) 
    })
    .catch((error) =>{
        errorCodesFromAuth(error);
            });
}
export const createUserWithTwitterPopup = async () => {
    await signInWithPopup(auth, twitterProvider)
    .then( () => {
        const user = auth.currentUser;
        createUserDocumentFromAuth( user, {}) 
    })
    .catch((error) =>{
        errorCodesFromAuth(error);
            });
}


export const createEmployer = async (props) => {
    const { displayName, email, industry, password, passwordConfirmation, ...operation } = props;
    try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await updateDisplayName(displayName);
        await createEmployerDocumentFromAuth(user, { displayName, industry, operation });

    } catch (error) {
        errorCodesFromAuth(error);
    }
}
export const createEmployerDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'employers', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);
export const signInWithTwitterPopup = () => signInWithPopup(auth, twitterProvider);




export const checkUserType = async () => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) return 'U';
    else return null;
}

export const checkEmployerType = async () => {
    const userDoc = doc(db, 'employers', auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) return 'E';
    else return null;
}

export const signOutUser = async () => {
    await signOut(auth);

}









// registerPasswordUser(email,displayName,password,photoURL){
//     var user = null;
//     //nullify empty arguments
//     for (var i = 0; i < arguments.length; i++) {
//       arguments[i] = arguments[i] ? arguments[i] : null;
//     }
  
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(function () {
//       user = firebase.auth().currentUser;
//       user.sendEmailVerification();
//     })
//     .then(function () {
//       user.updateProfile({
//         displayName: displayName,
//         photoURL: photoURL
//       });
//     })
//     .catch(function(error) {
//       console.log(error.message);
//     });
//     console.log('Validation link was sent to ' + email + '.');
//   }


