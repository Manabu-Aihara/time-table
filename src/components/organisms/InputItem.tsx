import { useState, FormEvent } from 'react';
// import Select, { ActionMeta, SingleValue } from 'react-select';

import { useEventsDispatch, useEventsState } from '../../lib/UseContext';
import { EventItem } from '../../lib/EventItem';
import { eventsReducer } from '../EventsParent';

type OptionType = {
	value: string;
	label: string;
}
const options: OptionType[] = [
	{value: 'from now', label: 'これから'},
	{value: 'still', label: 'まだ'},
	{value: 'almost', label: 'もうすぐ'},
	{value: 'complete', label: '完了'}
];

// type InitialValueProps = Omit<EventItem, 'done'>;

export const AddSlideForm = (eventItem: EventItem) => {
	const initialValue: EventItem = {
		title: eventItem.title, start: eventItem.start, end: eventItem.end,
		summary: '', owner: '', done: options[0].value
	}
	
	const [todo, setTodo] = useState<EventItem>(initialValue);
	// const [done, setDone] = useState<string | undefined>(options[0].value);

  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
		// name, valueという変数名で決まっているようだ
		const {name, value} = e.target;
		setTodo({...todo, [name]:value});
	}

	// const handleSelectChange = (selectedOption: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
	// 	setDone(selectedOption?.label);
	// }

	const handleUpdate = (e: FormEvent/*e: React.MouseEvent<HTMLInputElement>*/) => {
		e.preventDefault();
		dispatch({
			type: 'UPDATE',
			payload: todo
		});
    const nextStage = eventsReducer([eventItem], {type: 'UPDATE', payload: todo});
    console.log(`ここ注目：${JSON.stringify(nextStage)}`);
		setTodo({summary: '', owner: ''});
	}

	// console.log(`これが理想なんだ: ${JSON.stringify(todo)}`);

	return (
		<div>
			<p>{todo.title}</p>
			<p>さまりー：</p>
			<input name="summary" onChange={handleChange} value={todo.summary} />
			<p>誰が：</p>
			<input name="owner" onChange={handleChange} value={todo.owner} />
			<select name="done" value={todo.done} onChange={handleChange}>
				{options.map((option) => {
					return (
						<option value={option.label} key={option.value}>{option.label}</option>
					);
					})
				}
			</select>
			{/* <Select options={options} onChange={handleSelectChange} /> */}
			<button onClick={handleUpdate}>送信</button>
		</div>
	);
}
