import style from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';
import NotesIcon from '@mui/icons-material/Notes';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LabelModal from '../UI/LabelModal/LabelModal';

function NavBar() {
	const theme = useSelector((state) => state.theme.mode);
	const menuMode = useSelector((state) => state.menu.mode);
	const [modalActive, setModalActive] = useState(false);

	if (menuMode === 'compressed') {
		return (
			<nav className={`${style.menu} ${style.compressed}`}>
				<LabelModal active={modalActive} setActive={setModalActive} />
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive
							? `${style.menu__link} ${style.active} ${style.compressed}`
							: `${style.menu__link} ${style.compressed}`
					}
				>
					{theme === 'light' ? <NotesIcon sx={{ color: '#000' }} /> : <NotesIcon sx={{ color: '#fff' }} />}
					<span className={`${style.link__text} ${style.compressed}`}>Notes</span>
				</NavLink>

				<NavLink
					to='/archive'
					className={({ isActive }) =>
						isActive
							? `${style.menu__link} ${style.active} ${style.compressed}`
							: `${style.menu__link} ${style.compressed}`
					}
				>
					{theme === 'light' ? (
						<ArchiveIcon sx={{ color: '#000' }} />
					) : (
						<ArchiveIcon sx={{ color: '#fff' }} />
					)}
					<span className={`${style.link__text} ${style.compressed}`}>Archive</span>
				</NavLink>
				<div className={`${style.menu__label_btn} ${style.compressed}`} onClick={() => setModalActive(true)}>
					<button className={style.menu__btn}>
						{theme === 'light' ? <EditIcon sx={{ color: '#000' }} /> : <EditIcon sx={{ color: '#fff' }} />}
						<span className={`${style.link__text} ${style.compressed}`}>Edit labels</span>
					</button>
				</div>
				<NavLink
					to='/trash'
					className={({ isActive }) =>
						isActive
							? `${style.menu__link} ${style.active} ${style.compressed}`
							: `${style.menu__link} ${style.compressed}`
					}
				>
					{theme === 'light' ? <DeleteIcon sx={{ color: '#000' }} /> : <DeleteIcon sx={{ color: '#fff' }} />}
					<span className={`${style.link__text} ${style.compressed}`}>Trash</span>
				</NavLink>
			</nav>
		);
	}

	return (
		<nav className={style.menu}>
			<LabelModal active={modalActive} setActive={setModalActive} />
			<NavLink
				to='/'
				className={({ isActive }) => (isActive ? `${style.menu__link} ${style.active}` : style.menu__link)}
			>
				{theme === 'light' ? <NotesIcon sx={{ color: '#000' }} /> : <NotesIcon sx={{ color: '#fff' }} />}
				<span className={style.link__text}>Notes</span>
			</NavLink>

			<NavLink
				to='/archive'
				className={({ isActive }) => (isActive ? `${style.menu__link} ${style.active}` : style.menu__link)}
			>
				{theme === 'light' ? <ArchiveIcon sx={{ color: '#000' }} /> : <ArchiveIcon sx={{ color: '#fff' }} />}
				<span className={style.link__text}>Archive</span>
			</NavLink>
			<div className={style.menu__label_btn} onClick={() => setModalActive(true)}>
				<button className={style.menu__btn}>
					{theme === 'light' ? <EditIcon sx={{ color: '#000' }} /> : <EditIcon sx={{ color: '#fff' }} />}
					<span className={style.link__text}>Edit labels</span>
				</button>
			</div>
			<NavLink
				to='/trash'
				className={({ isActive }) => (isActive ? `${style.menu__link} ${style.active}` : style.menu__link)}
			>
				{theme === 'light' ? <DeleteIcon sx={{ color: '#000' }} /> : <DeleteIcon sx={{ color: '#fff' }} />}
				<span className={style.link__text}>Trash</span>
			</NavLink>
		</nav>
	);
}

export default NavBar;
