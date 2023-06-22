import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: 'expanded',
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		toggleMenu: (state) => {
			if (state.mode === 'expanded') {
				state.mode = 'compressed';
			} else {
				state.mode = 'expanded';
			}
		},
	},
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
