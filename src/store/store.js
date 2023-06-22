import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import menuReducer from '../features/menu/menuSlice';
import notesReducer from '../features/notes/notesSlice';
import labelReducer from '../features/labels/labelsSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		menu: menuReducer,
		notes: notesReducer,
		labels: labelReducer,
		search: searchReducer,
	},
});
