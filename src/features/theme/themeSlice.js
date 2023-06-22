import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mode: 'dark',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			if (state.mode === 'dark') {
				state.mode = 'light';
			} else {
				state.mode = 'dark';
			}
			document.body.className = state.mode;
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
