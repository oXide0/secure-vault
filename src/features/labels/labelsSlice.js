import { createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

const initialState = {
	labelsData: [],
};

const labelsSlice = createSlice({
	name: 'labels',
	initialState,
	reducers: {
		addLabel(state, action) {
			state.labelsData.push({ id: v1(), title: action.payload });
		},
		removeLabel(state, action) {
			state.labelsData = state.labelsData.filter((label) => label.id !== action.payload);
		},
		editLabel(state, action) {
			const labels = state.labelsData;
			labels.forEach((label) => {
				if (label.id === action.payload.id) {
					label.title = action.payload.title;
				}
			});
			state.labelsData = [...labels];
		},
	},
});

export const { addLabel, removeLabel, editLabel } = labelsSlice.actions;
export default labelsSlice.reducer;
