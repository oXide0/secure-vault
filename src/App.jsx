import { Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes/Notes';
import Archive from './pages/Archive/Archive';
import Trash from './pages/Trash/Trash';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Notes />} />
			<Route path='/archive' element={<Archive />} />
			<Route path='/trash' element={<Trash />} />
		</Routes>
	);
}

export default App;
