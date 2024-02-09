import { useState, FormEvent } from 'react';

import { useEventsDispatch, useEventsState } from '../lib/UseContext';
import { EventItem } from '../lib/EventItem';
import { eventsReducer } from './EventsParent';

const options = [
	{value: 'from now', label: 'これから'},
	{value: 'still', label: 'まだ'},
	{value: 'almost', label: 'もうすぐ'},
	{value: 'done', label: '完了'}
];

const getEventItem = (targetEvent: EventItem) => {
	const awesomeItem = JSON.stringify({
		// todo
		summary: targetEvent.summary,
		owner: targetEvent.owner,
		done: targetEvent.done
	});
	console.log({...targetEvent, awesomeItem});
	// return {...targetEvent, awesomeItem};
}

export const AddSlideForm = (eventItem: EventItem) => {
	const [todo, setTodo] = useState<EventItem>({
		title: eventItem.title, start: eventItem.start, end: eventItem.end,
		summary: '', owner: '', done: options[0].value
	});
  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>/* & React.ChangeEvent<HTMLSelectElement>*/) => {
		// name, valueという変数名で決まっているようだ
		const {name, value} = e.target;
		setTodo({...todo, [name]:value});
		// setTodo(e.target.value);
	}

	const handleUpdate = (e: FormEvent/*e: React.MouseEvent<HTMLInputElement>*/) => {
		e.preventDefault();
		dispatch({
			type: 'UPDATE',
			payload: todo
		});
    const nextStage = eventsReducer([eventItem], {type: 'UPDATE', payload: todo});
    console.log(`ここ注目：${JSON.stringify(nextStage)}`);
	}

	console.log(`これが理想なんだ: ${JSON.stringify(todo)}`);

	return (
			<div>
				<p>{todo.title}</p>
				さまりー：
				<input type="text" name="summary" onChange={handleChange} value={todo.summary} />
				おーなー：
				<input type="text" name="owner" onChange={handleChange} value={todo.owner} />
				{/* <select value={todo.done} onChange={handleChange}>
					{options.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
				</select> */}
				<button onClick={handleUpdate}>送信</button>
			</div>
	);
}