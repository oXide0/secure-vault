import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
	labelsData: [],
};

const labelsSlice = createSlice({
	name: 'labels',
	initialState,
	reducers: {
		addLabel(state, action) {
			state.labelsData.push({ id: nanoid(), title: action.payload, notes: [] });
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
		addLabelNote(state, action) {
			const labels = state.labelsData;
			labels.forEach((label) => {
				if (label.id === action.payload.labelId) {
					label.notes.push(action.payload.note);
				}
			});
			state.labelsData = [...labels];
		},
		updateLabelNote: (state, action) => {
			const label = state.labelsData.find((label) => label.id === action.payload.labelId);
			const notesArr = label.notes;
			notesArr.forEach((note) => {
				if (note.id === action.payload.id) {
					note.title = action.payload.title;
					note.text = action.payload.text;
				}
			});
			state.labelsData = [...state.labelsData];
		},
		removeLabelNote: (state, action) => {
			const label = state.labelsData.find((label) => label.id === action.payload.labelId);
			const notesArr = label.notes;
			const newNotesArr = notesArr.filter((note) => note.id !== action.payload.noteId);
			label.notes = newNotesArr;
			state.labelsData = [...state.labelsData];
		},
	},
});

export const { addLabel, removeLabel, editLabel, addLabelNote, updateLabelNote, removeLabelNote } = labelsSlice.actions;
export default labelsSlice.reducer;
