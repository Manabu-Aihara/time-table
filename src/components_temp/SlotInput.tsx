import { useState, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer, Event, SlotInfo, stringOrDate } from 'react-big-calendar';
// import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
// import enUS from 'date-fns/locale/en-US'
import ja from 'date-fns/locale/ja'
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog } from '../components/Dialog';
// import { InputComponent } from './InputTitle';

const locales = {
    'ja-JP': ja,
  }
  
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

interface CalendarProps {
	onShowDialogView: (slotInfo: SlotInfo) => void;
}

export const MyCalendar = ({ onShowDialogView }: CalendarProps) => {
	const [slot, setSlot] = useState<SlotInfo>();
	// const navigate = useNavigate();

	const handleSelectEvent = useCallback(
		(event: Event) => {
			window.alert(event);
		},
		[]
	);
    
	// const handleSelectSlot = useCallback(
	// 	(data: Event) => {
	// 		const { start, end } = data
	// 		const title = window.prompt('New Event name')
	// 		if (title) {
	// 			setSlotEvents((prev) => [...prev, { start, end, title }])
	// 		}
	// 	},
	// 	[setSlotEvents]
	// );
	const handleSelectSlot = useCallback((info: SlotInfo) => {
			console.log("クリックされました");
			setSlot(info);
			onShowDialogView(info);
		},
			// console.log(`${event.start}:${event.end}::${states}`);
		[]
	);

	const components = {
    event: ({ event }: { event: SlotInfo }) => {
			console.log(`反応します:${JSON.stringify(event)}`);
			return (
				<div>
					いべんと
				</div>
			);
    }
  };

	// const onClickPageForm = useCallback(() => {
	// 	navigate("/form");
	// 	},
	// []
	// );

	return (
		<Calendar
			defaultView='week'
			events={slot ? [slot].concat(slot) : []}
			localizer={localizer}
			components={components}
			onSelectEvent={handleSelectEvent}
			onSelectSlot={handleSelectSlot}
			selectable
			style={{ height: '75vw' }}
		/>
  );
}

export const View = () => {
	const [info, setInfo] = useState<SlotInfo>();
	return (
		<>
			<MyCalendar onShowDialogView={(info) => setInfo(info)} />
			<div>
				{info &&
					<Dialog>
					コレ見える？
					</Dialog>}
			</div>
		</>
	)
}