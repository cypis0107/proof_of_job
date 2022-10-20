import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenLangMenu: false,
    isOpenUserMenu: false,
    isOpenCreateMenu: false,
    isOpenLoginMenu: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openLangMenu: (state) => {
            state.isOpenLangMenu = true;
        },
        closeLangMenu: (state) => {
            state.isOpenLangMenu = false;
        },
        openUserMenu: (state) => {
            state.isOpenUserMenu = true;
        },
        closeUserMenu: (state) => {
            state.isOpenUserMenu = false;
        },
        openCreateMenu: (state) => {
            state.isOpenCreateMenu = true;
        },
        closeCreateMenu: (state) => {
            state.isOpenCreateMenu = false;
        },
        openLoginMenu: (state) => {
            state.isOpenLoginMenu = true;
        },
        closeLoginMenu: (state) => {
            state.isOpenLoginMenu = false;
        },
    }
})
export const {
    openLangMenu,
    closeLangMenu,
    openUserMenu,
    closeUserMenu,
    openCreateMenu,
    closeCreateMenu,
    openLoginMenu,
    closeLoginMenu,
} = modalSlice.actions;
export default modalSlice.reducer;