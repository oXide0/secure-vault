import style from './Header.module.scss';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { toggleTheme } from '../../features/theme/themeSlice';
import { toggleMenu } from '../../features/menu/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleDisplayStyle } from '../../features/notes/notesSlice';
import { onChangeHandler } from '../../features/search/searchSlice';

function Header({ title }) {
	const theme = useSelector((state) => state.theme.mode);
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
							{theme === 'dark' ? (
								<MenuOutlinedIcon sx={{ color: '#fff' }} />
							) : (
								<MenuOutlinedIcon sx={{ color: '#000' }} />
							)}
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
								{theme === 'dark' ? (
									<GridViewIcon sx={{ color: '#fff' }} />
								) : (
									<GridViewIcon sx={{ color: '#000' }} />
								)}
							</Button>
						) : (
							<Button onClick={() => dispatch(toggleDisplayStyle())}>
								{theme === 'dark' ? (
									<ViewStreamOutlinedIcon sx={{ color: '#fff' }} />
								) : (
									<ViewStreamOutlinedIcon sx={{ color: '#000' }} />
								)}
							</Button>
						)}

						<Button onClick={() => dispatch(toggleTheme())}>
							{theme === 'dark' ? (
								<Brightness7Icon sx={{ color: '#fff' }} />
							) : (
								<Brightness4OutlinedIcon sx={{ color: '#000' }} />
							)}
						</Button>
					</div>
				</header>
				<Divider color='#525355' />
			</div>
		</header>
	);
}

export default Header;
