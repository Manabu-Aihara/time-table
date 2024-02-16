import { useState, FormEvent, forwardRef, Ref, MutableRefObject } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import Select, { ActionMeta, SingleValue } from 'react-select';

import { useEventsDispatch, useEventsState } from '../../lib/UseContext';
import { EventItem } from '../../lib/EventItem';
import { eventsReducer } from '../EventsParent';

import { boundaryTop, boundaryY, topWidth } from '../sprinkles.responsive.css';
import { formParent } from './InputItem.css';

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

const AddChildForm = ((eventItem: EventItem, ref: Ref<HTMLDivElement>) => {
	const initialValue: EventItem = {
		title: eventItem.title, start: eventItem.start, end: eventItem.end,
		summary: '', owner: '', done: options[0].value
	}
	
	const [todo, setTodo] = useState<EventItem>(initialValue);
	const [done, setDone] = useState<string | undefined>(options[0].value);

  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
		// name, valueという変数名で決まっているようだ
		const {name, value} = e.target;
		setTodo({...todo, [name]:value});
	}

	const handleSelectChange = (selectedOption: SingleValue<OptionType>/*, actionMeta: ActionMeta<OptionType>*/) => {
		setDone(selectedOption?.label);
	}

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

	return (
		<Box scrollSnapAlign="start" ref={ref} className={`${topWidth} ${formParent}`}>
			<Text className={boundaryTop}>{todo.title}</Text>
			<section className={boundaryTop}>
				<Text>さまりー：</Text>
				<Input name="summary" onChange={handleChange} value={todo.summary} />
			</section>
			<section className={boundaryTop}>
				<Text>誰が：</Text>
				<Input name="owner" onChange={handleChange} value={todo.owner} />
			</section>
			<section className={boundaryTop}>
				<Text>どんな感じ：</Text>
				{/* <select name="done" value={todo.done} onChange={handleChange}>
					{options.map((option) => {
						return (
							<option value={option.label} key={option.value}>{option.label}</option>
						);
						})
					}
				</select> */}
				<Select options={options} onChange={handleSelectChange} />
			</section>
			<section className={boundaryY}>
				<Button onClick={handleUpdate}>送信</Button>
			</section>
		</Box>
	);
});

export const AddSlideForm = forwardRef<HTMLDivElement, EventItem>(AddChildForm);
