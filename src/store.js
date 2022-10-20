import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import modalReducer from './features/modal/modalSlice';
import earthReducer from './features/earth/earthSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        earth: earthReducer,
        modal: modalReducer,
    }
})




// import { configureStore } from '@reduxjs/toolkit'
// import {
//   getFirebase,
//   actionTypes as rrfActionTypes,
// } from 'react-redux-firebase'
// import { constants as rfConstants } from 'redux-firestore'
// import rootReducer from './rootReducer'

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           // just ignore every redux-firebase and react-redux-firebase action type
//           ...Object.keys(rfConstants.actionTypes).map(
//             (type) => `${rfConstants.actionsPrefix}/${type}`
//           ),
//           ...Object.keys(rrfActionTypes).map(
//             (type) => `@@reactReduxFirebase/${type}`
//           ),
//         ],
//         ignoredPaths: ['firebase', 'firestore'],
//       },
//       thunk: {
//         extraArgument: {
//           getFirebase,
//         },
//       },
//     }),
// })

// export default store