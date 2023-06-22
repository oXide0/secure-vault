import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import Note from '../../components/Note/Note';
import { useSelector } from 'react-redux';

function Trash() {
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);
	const notes = useSelector((state) => state.notes.trashData);

	return (
		<div className='wrapper'>
			<Header title='Archive' />
			<main className='main'>
				<NavBar />
				<section className='notes'>
					<div className={notesDisplayStyle === 'grid' ? 'notes_field' : 'notes_field list'}>
						{notes.map((n) => (
							<Note key={n.id} id={n.id} title={n.title} text={n.text} type='trash' />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Trash;
