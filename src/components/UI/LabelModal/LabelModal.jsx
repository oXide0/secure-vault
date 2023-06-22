import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import DoneIcon from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import style from './LabelModal.module.scss';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { addLabel } from '../../../features/labels/labelsSlice';
import Label from '../../Label/Label';

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

function LabelModal({ active, setActive }) {
	const handleClose = () => setActive(false);
	const [labelTitle, setLabelTitle] = useState('');

	const [error, setError] = useState(false);
	const labelsData = useSelector((state) => state.labels.labelsData);
	const dispatch = useDispatch();

	const onAddLabelHandler = () => {
		if (labelTitle.trim() !== '') {
			dispatch(addLabel(labelTitle));
			setLabelTitle('');
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={active}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={active}>
					<Box sx={boxStyle}>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							Edit labels
						</Typography>
						<div className={style.modal__row}>
							<input
								type='text'
								className={error ? `${style.modal__input} ${style.error}` : style.modal__input}
								placeholder='Create label'
								value={labelTitle}
								onChange={(e) => setLabelTitle(e.target.value)}
							/>
							<Button variant='text' onClick={onAddLabelHandler}>
								<DoneIcon sx={{ color: '#fff' }} />
							</Button>
						</div>
						<div className={style.modal__labels}>
							{labelsData.map((l) => {
								return <Label key={l.id} value={l.title} id={l.id} />;
							})}
						</div>
						<div className={style.modal__footer}>
							<Button
								sx={{ color: '#fff', background: '#525355', borderColor: '#525355 !important' }}
								variant='outlined'
								onClick={handleClose}
							>
								Close
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default LabelModal;
