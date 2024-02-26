import { useState, useEffect, FormEvent, forwardRef, Ref } from 'react';
import { ChakraProvider, Box, Text, Input, Button, Select } from '@chakra-ui/react';
// import Select, { ActionMeta, SingleValue } from 'react-select';

import { useEventsDispatch, useEventsState } from '../../lib/UseContext';
import { EventItem } from '../../lib/EventItem';
import { eventsReducer } from '../EventsParent';

import { boundaryTop, boundaryY } from '../sprinkles.responsive.css';
import { fixedClose, formParent } from './InputItem.css';

type InputItemProps = {
	eventItem: EventItem;
	closeClick: () => void;
}

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

export const AddChildForm = forwardRef(({eventItem, closeClick}: InputItemProps, childRef: Ref<HTMLDivElement>) => {
	const initialValue: EventItem = {
		title: eventItem.title, start: eventItem.start, end: eventItem.end,
		summary: '', owner: '', done: ''
	}
	const [todo, setTodo] = useState<EventItem>(initialValue);
	// const [done, setDone] = useState<string | undefined>(options[0].value);

  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  console.log(`Childの今のイベント: ${JSON.stringify(eventItem)}`);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
		// name, valueという変数名で決まっているようだ
		const {name, value} = e.target;
		setTodo({...todo, [name]:value});
	}

	// const handleSelectChange = (selectedOption: SingleValue<OptionType>/*, actionMeta: ActionMeta<OptionType>*/) => {
	// 	setDone(selectedOption?.label);
	// 	// console.log(actionMeta);
	// }

	const handleUpdate = (e: FormEvent) => {
		e.preventDefault();
		dispatch({
			type: 'UPDATE',
			payload: todo
		});
    const nextStage = eventsReducer([eventItem], {type: 'UPDATE', payload: todo});
    console.log(`ここ注目：${JSON.stringify(nextStage)}`);
	}

	useEffect(() => {
		setTodo({...eventItem, summary: eventItem.summary, owner: eventItem.owner, done: eventItem.done});
		console.log(`setTodo: ${JSON.stringify(todo)}`);
	}, []);

	return (
		<ChakraProvider>
			<Box ref={childRef} className={formParent}>
				<Button type='button' position='fixed' color='gainsboro' onClick={closeClick}>
					<Text fontSize='2rem' color='white'>×</Text><Text color='white'>閉じる</Text>
				</Button>
				<Text fontSize='2rem' fontWeight='bold' className={boundaryTop}>{todo.title}</Text>
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
					<Select name="done" value={todo.done} onChange={handleChange}>
						{options.map((option) => {
							return (
								<option value={option.label} key={option.value}>{option.label}</option>
							);
							})
						}
					</Select>
					{/* <Select options={options} onChange={handleSelectChange} /> */}
				</section>
				<section className={boundaryY}>
					<Button onClick={handleUpdate}>送信</Button>
				</section>
			</Box>
		</ChakraProvider>
	);
});

// export const AddSideForm = forwardRef<HTMLDivElement, EventItem>((prop, _ref) => {
// 	return <AddChildForm {...prop} ref />}
// );
