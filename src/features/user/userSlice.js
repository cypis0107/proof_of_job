import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateName: (state, { payload }) => {
            state.user.displayName = payload;
        },
        updateType: (state, { payload }) => {
            state.user.type = payload;
        }
    },
})

export const selectUser = (state) => state.user.user;
export const { login, logout, updateName, updateType } = userSlice.actions;
export default userSlice.reducer;




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