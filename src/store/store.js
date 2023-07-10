import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import notesReducer from '../features/notes/notesSlice';
import labelReducer from '../features/labels/labelsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
	reducer: {
		menu: menuReducer,
		notes: notesReducer,
		labels: labelReducer,
		search: searchReducer,
	},
});
