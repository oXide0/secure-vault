import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
	notesData: [],
	archiveData: [],
	trashData: [],
	displayStyle: 'grid',
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action) => {
			state.notesData.push({
				id: nanoid(),
				title: action.payload.title,
				text: action.payload.text,
			});
		},
		updateNote: (state, action) => {
			const notesArr = state.notesData;
			notesArr.forEach((note) => {
				if (note.id === action.payload.id) {
					note.title = action.payload.title;
					note.text = action.payload.text;
				}
			});
			state.notesData = [...notesArr];
		},
		addArchiveNote: (state, action) => {
			const note = state.notesData.find((n) => n.id === action.payload.id);
			state.archiveData.push({
				id: note.id,
				title: note.title,
				text: note.text,
			});
			state.notesData = state.notesData.filter((n) => n.id !== action.payload.id);
		},
		updateArchiveNote: (state, action) => {
			const notesArr = state.archiveData;
			notesArr.forEach((note) => {
				if (note.id === action.payload.id) {
					note.title = action.payload.title;
					note.text = action.payload.text;
				}
			});
			state.archiveData = [...notesArr];
		},
		removeFromArchive: (state, action) => {
			const note = state.archiveData.find((n) => n.id === action.payload.id);
			state.notesData.push(note);
			state.archiveData = state.archiveData.filter((n) => n.id !== action.payload.id);
		},
		addTrashNote: (state, action) => {
			let note;
			if (action.payload.type === 'notes') {
				note = state.notesData.find((n) => n.id === action.payload.id);
				state.notesData = state.notesData.filter((n) => n.id !== action.payload.id);
			} else if (action.payload.type === 'archive') {
				note = state.archiveData.find((n) => n.id === action.payload.id);
				state.archiveData = state.archiveData.filter((n) => n.id !== action.payload.id);
			}
			state.trashData.push(note);
		},
		removeNote: (state, action) => {
			state.trashData = state.trashData.filter((n) => n.id !== action.payload.id);
		},
		restoreNote: (state, action) => {
			const note = state.trashData.find((n) => n.id === action.payload.id);
			state.notesData.push(note);
			state.trashData = state.trashData.filter((n) => n.id !== action.payload.id);
		},
		removeFromNotes: (state, action) => {
			state.notesData = state.notesData.filter((n) => n.id !== action.payload.id);
		},
		toggleDisplayStyle: (state) => {
			if (state.displayStyle === 'grid') {
				state.displayStyle = 'list';
			} else {
				state.displayStyle = 'grid';
			}
		},
	},
});

export const {
	addNote,
	updateNote,
	addArchiveNote,
	updateArchiveNote,
	removeFromArchive,
	addTrashNote,
	removeNote,
	restoreNote,
	removeFromNotes,
	toggleDisplayStyle,
} = notesSlice.actions;
export default notesSlice.reducer;
