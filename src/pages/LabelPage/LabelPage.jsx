import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import NoteCard from '../../components/NoteCard/NoteCard';
import { useSelector } from 'react-redux';

function LabelPage({ label }) {
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);

	return (
		<div className='wrapper'>
			<Header title={label.title} />
			<main className='main'>
				<NavBar />
				<section className='notes'>
					<div className={notesDisplayStyle === 'grid' ? 'notes_field' : 'notes_field list'}>
						{label.notes.map((note) => (
							<NoteCard
								key={note.id}
								labelId={label.id}
								id={note.id}
								title={note.title}
								text={note.text}
								type='label'
							/>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default LabelPage;
