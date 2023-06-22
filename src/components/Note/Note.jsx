import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import BasicModal from '../Modal/Modal';
import { useState } from 'react';

function Note({ title, text, id, type }) {
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);
	const [modalActive, setModalActive] = useState(false);

	return (
		<div>
			<BasicModal noteId={id} type={type} active={modalActive} setActive={setModalActive} />
			<Card
				sx={{
					width: notesDisplayStyle === 'grid' ? 250 : 595,
					background: 'none',
					border: '1px solid #525355',
					color: '#fff',
				}}
			>
				<CardContent>
					<Typography variant='h6' component='div'>
						{title}
					</Typography>
					<Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
						{text}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						size='small'
						sx={{ color: '#fff', background: '#525355', borderColor: '#525355 !important' }}
						variant='outlined'
						onClick={() => setModalActive(true)}
					>
						Edit
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default Note;
