import style from './NotesPage.module.scss';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import NoteCard from '../../components/NoteCard/NoteCard';
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from '../../features/notes/notesSlice';
import TextArea from '../../components/TextArea/TextArea';

function NotesPage() {
	const [inputMode, setInputMode] = useState('compressed');
	const [noteContent, setNoteContent] = useState({ title: '', text: '' });
	const [error, setError] = useState(false);
	const notes = useSelector((state) => state.notes.notesData);
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);
	const searchValue = useSelector((state) => state.search.value);
	const dispatch = useDispatch();

	const onHandleAddNote = () => {
		if (noteContent.title.trim() === '' || noteContent.text.trim() === '') {
			setError(true);
		} else {
			setError(false);
			dispatch(addNote(noteContent));
			setNoteContent({ title: '', text: '' });
			setInputMode('compressed');
		}
	};

	const onHandleCancel = () => {
		setNoteContent({ title: '', text: '' });
		setInputMode('compressed');
	};

	const searchNotes = useMemo(() => {
		if (searchValue) {
			return notes.filter(
				(n) =>
					n.title.toLowerCase().includes(searchValue.toLowerCase()) ||
					n.text.toLowerCase().includes(searchValue.toLowerCase())
			);
		}
		return notes;
	}, [searchValue, notes]);

	return (
		<div className='wrapper'>
			<Header title='Notes' />
			<main className='main'>
				<NavBar />
				<section className='notes'>
					<div className={style.notes__add}>
						{inputMode === 'compressed' ? (
							<div className={style.notes__input}>
								<input
									type='text'
									className={style.input__add}
									placeholder='Take a note ...'
									onClick={() => setInputMode('expanded')}
								/>
								<label htmlFor='files' className={style.input__btn}>
									<AddPhotoAlternateIcon sx={{ color: '#fff' }} />
								</label>
								<input type='file' id='files' style={{ visibility: 'hidden' }} />
							</div>
						) : (
							<div className={error ? `${style.newnote__block} ${style.error}` : style.newnote__block}>
								<div>
									<input
										type='text'
										placeholder='Title'
										className={style.input__add}
										style={{
											border: 'none',
											boxShadow: 'none',
											padding: '0',
											letterSpacing: '1px',
										}}
										value={noteContent.title}
										onChange={(e) => setNoteContent({ ...noteContent, title: e.target.value })}
									/>
								</div>
								<div className={style.block__main}>
									<TextArea
										data={noteContent}
										setData={setNoteContent}
										placeholder='Take a note ...'
									/>
								</div>
								<div className={style.block__footer}>
									<div className={style.footer__custom}>
										<div>
											<label htmlFor='files' className={style.input__btn}>
												<AddPhotoAlternateIcon sx={{ color: '#fff', opacity: '0.7' }} />
											</label>
											<input type='file' id='files' style={{ visibility: 'hidden' }} />
										</div>
									</div>
									<div>
										<Button
											variant='text'
											onClick={onHandleAddNote}
											sx={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', opacity: '0.8' }}
										>
											Add
										</Button>
										<Button
											variant='text'
											onClick={onHandleCancel}
											sx={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', opacity: '0.8' }}
										>
											Close
										</Button>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={notesDisplayStyle === 'grid' ? 'notes_field' : 'notes_field list'}>
						{searchNotes.map((n) => (
							<NoteCard key={n.id} id={n.id} title={n.title} text={n.text} type='notes' />
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

export default NotesPage;
