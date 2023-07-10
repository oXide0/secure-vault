import style from './Header.module.scss';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { toggleMenu } from '../../features/menu/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleDisplayStyle } from '../../features/notes/notesSlice';
import { onChangeHandler } from '../../features/search/searchSlice';

function Header({ title }) {
	const notesDisplayStyle = useSelector((state) => state.notes.displayStyle);
	const searchValue = useSelector((state) => state.search.value);
	const dispatch = useDispatch();

	useEffect(() => {
		document.body.className = 'dark';
	}, []);

	const onChangeSearchHandler = (e) => {
		dispatch(onChangeHandler(e.target.value));
	};

	return (
		<header>
			<div>
				<header className={style.header}>
					<div className={style.header__part}>
						<Button onClick={() => dispatch(toggleMenu())}>
							<MenuOutlinedIcon sx={{ color: '#fff' }} />
						</Button>
						<h1 className={style.header__title}>{title}</h1>
						<div className={style.header__search}>
							<input
								type='text'
								className={style.search__input}
								placeholder='Search'
								value={searchValue}
								onChange={(e) => onChangeSearchHandler(e)}
							/>
							<Button className={style.search__btn}>
								<SearchOutlinedIcon sx={{ color: '#fff' }} />
							</Button>
						</div>
					</div>
					<div className={style.header__part}>
						{notesDisplayStyle === 'list' ? (
							<Button onClick={() => dispatch(toggleDisplayStyle())}>
								<GridViewIcon sx={{ color: '#fff' }} />
							</Button>
						) : (
							<Button onClick={() => dispatch(toggleDisplayStyle())}>
								<ViewStreamOutlinedIcon sx={{ color: '#fff' }} />
							</Button>
						)}
					</div>
				</header>
				<Divider color='#525355' />
			</div>
		</header>
	);
}

export default Header;
