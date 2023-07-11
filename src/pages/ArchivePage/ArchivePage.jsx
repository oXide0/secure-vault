import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import NoteCard from '../../components/NoteCard/NoteCard';
import { useSelector } from 'react-redux';

function ArchivePage() {
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);
	const notes = useSelector((state) => state.notes.archiveData);

	return (
		<div className='wrapper'>
			<Header title='Archive' />
			<main className='main'>
				<NavBar />
				<section className='notes'>
					<div className={notesDisplayStyle === 'grid' ? 'notes_field' : 'notes_field list'}>
						{notes.map((n) => (
							<NoteCard key={n.id} id={n.id} title={n.title} text={n.text} type='archive' />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default ArchivePage;
