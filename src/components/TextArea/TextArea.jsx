import style from './TextArea.module.scss';
import { memo } from 'react';

const TextArea = memo(function TextArea({ data, setData, placeholder = '' }) {
	function handleTextChange(event) {
		setData({ ...data, text: event.target.value });
	}

	function adjustTextAreaHeight(event) {
		event.target.style.height = 'auto';
		event.target.style.height = event.target.scrollHeight + 'px';
	}

	return (
		<textarea
			value={data.text}
			onChange={handleTextChange}
			onInput={adjustTextAreaHeight}
			className={style.textarea}
			placeholder={placeholder}
			rows='3'
		/>
	);
});

export default TextArea;
