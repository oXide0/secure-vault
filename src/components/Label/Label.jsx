import style from './Label.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import { removeLabel, editLabel } from '../../features/labels/labelsSlice';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';

function Label({ value, id }) {
	const dispatch = useDispatch();
	const [labelTitle, setLabelTitle] = useState(value);
	const textBoxRef = useRef(null);
	const [isEditing, setIsEditing] = useState(false);

	const onRemoveHandler = (id) => {
		dispatch(removeLabel(id));
	};

	const onClickHandler = () => {
		textBoxRef.current.select();
		setIsEditing(true);
	};

	const onAddLabelHandler = () => {
		dispatch(editLabel({ id, title: labelTitle }));
		setIsEditing(false);
	};

	const onEditing = (e) => {
		setLabelTitle(e.target.value);
		setIsEditing(true);
	};

	return (
		<div className={style.modal__label}>
			<input
				type='text'
				value={labelTitle}
				onChange={(e) => onEditing(e)}
				className={style.label__input}
				ref={textBoxRef}
			/>
			<div className={style.label__part}>
				{isEditing ? (
					<Button variant='text' sx={{ color: '#fff' }} onClick={onAddLabelHandler}>
						<DoneIcon />
					</Button>
				) : (
					<Button variant='text' sx={{ color: '#fff' }} onClick={onClickHandler}>
						<EditIcon />
					</Button>
				)}
				<Button variant='text' sx={{ color: '#fff' }} onClick={() => onRemoveHandler(id)}>
					<DeleteIcon />
				</Button>
			</div>
		</div>
	);
}

export default Label;
