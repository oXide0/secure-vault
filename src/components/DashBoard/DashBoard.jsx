import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromNotes } from '../../features/notes/notesSlice';
import { addLabelNote } from '../../features/labels/labelsSlice';
import { memo } from 'react';

const DashBoard = memo(function DashBoard({ active, setActive, noteId }) {
	const labels = useSelector((state) => state.labels.labelsData);
	const notes = useSelector((state) => state.notes.notesData);
	const dispatch = useDispatch();
	const open = Boolean(active);

	const handleClose = (labelId) => {
		const note = notes.find((n) => n.id === noteId);
		if (note) {
			dispatch(addLabelNote({ labelId, note }));
			dispatch(removeFromNotes({ id: noteId }));
		}

		setActive(null);
	};

	return (
		<Menu anchorEl={active} open={open} onClose={handleClose}>
			{labels.map((label) => (
				<MenuItem key={label.id} onClick={() => handleClose(label.id)}>
					{label.title}
				</MenuItem>
			))}
		</Menu>
	);
});

export default DashBoard;
