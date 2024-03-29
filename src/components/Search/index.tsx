import React, { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: React.FC = () => {
	const [inputValue, setInputValue] = React.useState<string>('');
	const dispatch = useDispatch();
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setInputValue('');
		if (inputRef.current) {
			inputRef.current.focus();
		} // same as inputRef.current?.focus();
	};

	const updateInputValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		updateInputValue(event.target.value);
	}

	return (
		<div className={styles.root}>
			<svg className={styles.icon} viewBox="0 0 20 20">
				<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
			</svg>
			<input
				ref={inputRef}
				onChange={onChangeInput}
				value={inputValue}
				type="text"
				className={styles.input}
				placeholder="Поиск пиццы..."
			/>
			{inputValue && <svg
				className={styles['clear-icon']}
				fill="none"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				onClick={onClickClear}
			>
				<path
					d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
					fill="currentColor"
				/>
			</svg>}
		</div>
	);
};
