import style from './LabelInput.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import { removeLabel, editLabel } from '../../features/labels/labelsSlice';
import { useDispatch } from 'react-redux';
import { memo, useRef, useState } from 'react';

const LabelInput = memo(function LabelInput({ value, id }) {
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
					<IconButton variant='text' sx={{ color: '#fff' }} onClick={onAddLabelHandler}>
						<DoneIcon />
					</IconButton>
				) : (
					<IconButton variant='text' sx={{ color: '#fff' }} onClick={onClickHandler}>
						<EditIcon />
					</IconButton>
				)}
				<IconButton variant='text' sx={{ color: '#fff' }} onClick={() => onRemoveHandler(id)}>
					<DeleteIcon />
				</IconButton>
			</div>
		</div>
	);
});

export default LabelInput;
