import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
interface NavState {
	dropdownOpen: boolean;
}

const initialState: NavState = {
	dropdownOpen: false,
};

export const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		openDropdown: state => {
			state.dropdownOpen = true;
		},
		closeDropDown: state => {
			state.dropdownOpen = false;
		},
	},
});

export const { openDropdown, closeDropDown } = navSlice.actions;

export default navSlice.reducer;
