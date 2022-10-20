import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    camPosition: [-27, 44, -30],
    camAutoRotate: true,
    camFov: 40,
    continentId: '',
    displayEarth: true,
    countryName: '',
    countryLat: 0,
    countryLon: 0,
}

const earthSlice = createSlice({
    name: 'earth',
    initialState,
    reducers: {
        cameraPosition: (state, { payload }) => {
            state.camPosition = payload;
        },
        cameraFov: (state, { payload }) => {
            state.camFov = payload;
        },
        cameraAutoRotateOn: (state) => {
            state.camAutoRotate = true;
        },
        cameraAutoRotateOff: (state) => {
            state.camAutoRotate = false;
        },
        setContinentId: (state, { payload }) => {
            state.continentId = payload;
        },
        displayEarthOn: (state) => {
            state.displayEarth = true;
        },
        displayEarthOff: (state) => {
            state.displayEarth = false;
        },
        countryTitle: (state, { payload }) => {
            state.countryName = payload;
        },
        countryLatitude: (state, { payload }) => {
            state.countryLat = payload;
        },
        countryLongitude: (state, { payload }) => {
            state.countryLon = payload;
        },
    },
})

//export const selectUser = (state) => state.user.user;
export const { cameraPosition,
    cameraFov,
    cameraAutoRotateOn,
    cameraAutoRotateOff,
    setContinentId,
    displayEarthOn,
    displayEarthOff,
    countryTitle,
    countryLatitude,
    countryLongitude,
} = earthSlice.actions;
export default earthSlice.reducer;




// deleteUser: (state) => {
//     state.currentUser = {};
// },
// updateUserId: (state, action) => {
//     state.currentUser.id = action.payload;
//     //state.currentUser.filter((item) => item.id !== itemId)
// },
// updateUserName: (state, { payload }) => {
//     state.currentUser.name = payload;
// },
// calculateTotal: (state) => {
//     let total = 0;
//     list.forEach((item) => {
//         total += item;
//     });
//     state.currentUser.sum = total;
// }