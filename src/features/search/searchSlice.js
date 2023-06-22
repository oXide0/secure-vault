import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		onChangeHandler: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { onChangeHandler } = searchSlice.actions;
export default searchSlice.reducer;
