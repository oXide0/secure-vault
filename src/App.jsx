import { Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotesPage/NotesPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import TrashPage from './pages/TrashPage/TrashPage';
import LabelPage from './pages/LabelPage/LabelPage';
import { useSelector } from 'react-redux';

function App() {
	const labels = useSelector((state) => state.labels.labelsData);

	return (
		<Routes>
			<Route path='/' element={<NotesPage />} />
			<Route path='/archive' element={<ArchivePage />} />
			<Route path='/trash' element={<TrashPage />} />
			{labels.map((label) => (
				<Route key={label.id} path={'/' + label.id} element={<LabelPage label={label} />} />
			))}
			<Route path='*' element={<NotesPage />}></Route>
		</Routes>
	);
}

export default App;
