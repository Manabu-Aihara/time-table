import { useState, useEffect, FormEvent, forwardRef, Ref } from 'react';
import { ChakraProvider, Box, Text, Input, Button, Select } from '@chakra-ui/react';
// import Select, { ActionMeta, SingleValue } from 'react-select';

import { useEventsDispatch, useEventsState } from '../../hooks/useContextFamily';
// import { EventItem } from '../../lib/EventItem';
import { TimelineEventProps } from '../../lib/TimelineType';
import { timelineEventsReducer } from '../../lib/reducer';

import { boundaryTop, boundaryY, buttonPosition } from '../sprinkles.responsive.css';
import { fixedClose, formParent } from './InputItem.css';

type InputEventProps = {
	timelineEvent: TimelineEventProps;
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

export const AddChildForm = forwardRef(({timelineEvent, closeClick}: InputEventProps, childRef: Ref<HTMLDivElement>) => {
	const initialValue: TimelineEventProps = {
		// staff_id: timelineEvent.staff_id, group: timelineEvent.group,
		// title: timelineEvent.title,
		// start: timelineEvent.start, end: timelineEvent.end,
		// summary: '', done: ''
		...timelineEvent
	}
	const [todo, setTodo] = useState<TimelineEventProps>(initialValue);
	// const [done, setDone] = useState<string | undefined>(options[0].value);

  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  console.log(`Childの今のイベント: ${JSON.stringify(timelineEvent)}`);

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
    const nextStage = timelineEventsReducer([timelineEvent], {type: 'UPDATE', payload: todo});
    console.log(`ここ注目：${JSON.stringify(nextStage)}`);
	}

	useEffect(() => {
		setTodo({...timelineEvent, summary: timelineEvent.summary, done: timelineEvent.done});
		console.log(`setTodo: ${JSON.stringify(todo)}`);
	}, []);

	return (
		<ChakraProvider>
			<Box ref={childRef} className={formParent}>
				<Button type='button' color='gainsboro' onClick={closeClick} className={buttonPosition}>
					<Text fontSize='2rem' color='white'>×</Text><Text color='white'>閉じる</Text>
				</Button>
				<Text fontSize='2rem' fontWeight='bold' className={boundaryTop}>{todo.title}</Text>
				<section className={boundaryTop}>
					<Text>さまりー：</Text>
					<Input name="summary" onChange={handleChange} value={todo.summary} />
				</section>
				{/* <section className={boundaryTop}>
					<Text>誰が：</Text>
					<Input name="owner" onChange={handleChange} value={todo.owner} />
				</section> */}
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

// export const AddSideForm = forwardRef<HTMLDivElement, timelineEvent>((prop, _ref) => {
// 	return <AddChildForm {...prop} ref />}
// );
