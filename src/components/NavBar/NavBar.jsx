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
					<NotesIcon sx={{ color: '#fff' }} />
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
					<ArchiveIcon sx={{ color: '#fff' }} />
					<span className={`${style.link__text} ${style.compressed}`}>Archive</span>
				</NavLink>
				<div className={`${style.menu__label_btn} ${style.compressed}`} onClick={() => setModalActive(true)}>
					<button className={style.menu__btn}>
						<EditIcon sx={{ color: '#fff' }} />
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
					<DeleteIcon sx={{ color: '#fff' }} />
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
				<NotesIcon sx={{ color: '#fff' }} />
				<span className={style.link__text}>Notes</span>
			</NavLink>

			<NavLink
				to='/archive'
				className={({ isActive }) => (isActive ? `${style.menu__link} ${style.active}` : style.menu__link)}
			>
				<ArchiveIcon sx={{ color: '#fff' }} />
				<span className={style.link__text}>Archive</span>
			</NavLink>
			<div className={style.menu__label_btn} onClick={() => setModalActive(true)}>
				<button className={style.menu__btn}>
					<EditIcon sx={{ color: '#fff' }} />
					<span className={style.link__text}>Edit labels</span>
				</button>
			</div>
			<NavLink
				to='/trash'
				className={({ isActive }) => (isActive ? `${style.menu__link} ${style.active}` : style.menu__link)}
			>
				<DeleteIcon sx={{ color: '#fff' }} />
				<span className={style.link__text}>Trash</span>
			</NavLink>
		</nav>
	);
}

export default NavBar;
