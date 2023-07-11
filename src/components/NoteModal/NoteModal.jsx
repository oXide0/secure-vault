import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useState, memo } from 'react';
import { Button, IconButton } from '@mui/material';
import style from './NoteModal.module.scss';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelIcon from '@mui/icons-material/Label';
import DashBoard from '../DashBoard/DashBoard';
import Tooltip from '@mui/material/Tooltip';
import {
	updateNote,
	updateArchiveNote,
	addArchiveNote,
	removeFromArchive,
	addTrashNote,
	removeNote,
	restoreNote,
} from '../../features/notes/notesSlice';
import { updateLabelNote, removeLabelNote } from '../../features/labels/labelsSlice';
import TextArea from '../TextArea/TextArea';
import Backdrop from '@mui/material/Backdrop';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const boxStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	display: 'flex',
	flexDirection: 'column',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: '#202124',
	border: '2px solid #525355',
	borderRadius: '5px',
	boxShadow: 24,
	p: 2,
};

const NoteModal = memo(function NoteModal({ noteId, labelId, type, active, setActive }) {
	const notesData = useSelector((state) => state.notes.notesData);
	const archiveData = useSelector((state) => state.notes.archiveData);
	const trashData = useSelector((state) => state.notes.trashData);
	const dispatch = useDispatch();
	const [dashBoardActive, setDashBoardActive] = useState(false);
	const labels = useSelector((state) => state.labels.labelsData);

	let note;
	if (type === 'label') {
		const label = labels.find((label) => label.id === labelId);
		note = label.notes.find((n) => n.id === noteId);
	}
	switch (type) {
		case 'notes':
			note = notesData.find((n) => n.id === noteId);
			break;
		case 'archive':
			note = archiveData.find((n) => n.id === noteId);
			break;
		case 'trash':
			note = trashData.find((n) => n.id === noteId);
			break;
		default:
			break;
	}
	const [modalData, setModalData] = useState({ id: note.id, title: note.title, text: note.text });

	const onCancelHandler = () => {
		setActive(false);
	};

	const onUpdateHandler = () => {
		if (type === 'notes') {
			dispatch(updateNote(modalData));
		} else if (type === 'label') {
			dispatch(updateLabelNote({ ...modalData, labelId }));
		} else {
			dispatch(updateArchiveNote(modalData));
		}
		setActive(false);
	};

	const onAddToArchiveHandler = () => {
		dispatch(addArchiveNote({ id: noteId }));
		setActive(false);
	};

	const onRemoveFromArchiveHandler = () => {
		dispatch(removeFromArchive({ id: noteId }));
		setActive(false);
	};

	const onRemoveNoteHandler = () => {
		if (type === 'trash') {
			dispatch(removeNote({ id: noteId }));
		} else if (type === 'label') {
			dispatch(removeLabelNote({ labelId, noteId }));
			setActive(false);
		} else {
			dispatch(addTrashNote({ id: noteId, type }));
			setActive(false);
		}
	};

	const onRestoreHandler = () => {
		dispatch(restoreNote({ id: noteId }));
		setActive(false);
	};

	const setLabel = (e) => {
		if (!labels.length) {
			alert('You have no labels!');
			return;
		}
		setDashBoardActive(e.currentTarget);
	};

	return (
		<Modal
			open={active}
			onClose={() => setActive(false)}
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Box sx={boxStyle}>
				<div>
					<input
						type='text'
						className={style.modal__input_title}
						value={modalData.title}
						onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
					/>
				</div>
				<Divider sx={{ borderColor: '#fff' }} />
				<div className={style.modal__main}>
					<TextArea data={modalData} setData={setModalData} />
				</div>
				<div className={style.modal__footer}>
					{type !== 'trash' ? (
						<div>
							{type === 'notes' ? (
								<>
									<IconButton size='small' variant='text' onClick={onAddToArchiveHandler}>
										<ArchiveIcon sx={{ color: '#fff' }} />
									</IconButton>
									<Tooltip title='Set label'>
										<IconButton size='small' variant='text' onClick={setLabel}>
											<LabelIcon sx={{ color: '#fff' }} />
										</IconButton>
									</Tooltip>
									<DashBoard
										active={dashBoardActive}
										setActive={setDashBoardActive}
										noteId={noteId}
									/>
								</>
							) : type !== 'label' ? (
								<IconButton size='small' variant='text' onClick={onRemoveFromArchiveHandler}>
									<UnarchiveIcon sx={{ color: '#fff' }} />
								</IconButton>
							) : (
								''
							)}
							<IconButton size='small' variant='text' onClick={onRemoveNoteHandler}>
								<DeleteIcon sx={{ color: '#fff' }} />
							</IconButton>
						</div>
					) : (
						<div>
							<IconButton size='small' variant='text' onClick={onRemoveNoteHandler}>
								<DeleteIcon sx={{ color: '#fff' }} />
							</IconButton>
						</div>
					)}

					<div>
						{type === 'trash' ? (
							<Button
								variant='outlined'
								sx={{ color: '#fff', background: '#525355', borderColor: '#525355 !important' }}
								size='small'
								onClick={onRestoreHandler}
							>
								Restore
							</Button>
						) : (
							<Button
								variant='outlined'
								sx={{ color: '#fff', background: '#525355', borderColor: '#525355 !important' }}
								size='small'
								onClick={onUpdateHandler}
							>
								Update
							</Button>
						)}

						<Button
							variant='outlined'
							sx={{ color: '#fff', background: '#525355', borderColor: '#525355 !important' }}
							size='small'
							onClick={onCancelHandler}
						>
							Close
						</Button>
					</div>
				</div>
			</Box>
		</Modal>
	);
});

export default NoteModal;
