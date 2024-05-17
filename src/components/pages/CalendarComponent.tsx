import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import { chakra } from '@chakra-ui/system';

import { useEventsState } from '../../hooks/useContextFamily';
import { TimelineEventProps, PickDate } from '../../lib/TimelineType';
import { useUpdateDateListMutation } from '../../hooks/useEventMutation';
import { ItemComponent } from '../molecules/EventCardComponent';
import { MyWeek } from '../organisms/DaysClassComponent';
import views from '../organisms/DaysComponent';
import { TitleInputModal } from '../organisms/DialogComponent'; 
import { AddChildForm } from "../organisms/InputItem";
import localizer from '../../lib/Localization';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import cx from 'classnames';
// import { topWidth } from '../sprinkles.responsive.css';
import { gridArea } from './CalendarComponent.css';
import { useMouseEvents } from '../../hooks/useMouseHandle';
import { eventData } from '../../lib/SampleState';

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: PickDate }) => {
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();
  console.log(`Calendar state: ${JSON.stringify(state)}`);

  const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
  const { onEventResize, onEventDrop, eventsDate } = useMouseEvents();

  // idのだけの配列
  const eventDateIds = eventsDate.map(eventDate => eventDate.id.toString());
  console.log(`Calendar pick id: ${eventDateIds}`);
  const updateEvents = useUpdateDateListMutation(eventDateIds);

  // useEffect(() => {
  //   const nowEvent = eventsDate.find(evtDate => {
  //     evtDate.id !== undefined ? evtDate : {}
  //   });
  //   console.log(`Now get event: ${JSON.stringify(nowEvent)}`);
  //   const newState = state.filter(s => {
  //     console.log(`Transform state: ${s.start}, ${s.end}, "ID ${s.id}"`);
  //     s.id === nowEvent?.id && {id: nowEvent.id, start: nowEvent.start, end: nowEvent.end}
  //   });
  //   newState && state.concat(newState);
  //   eventsDate.map((evtDate) => {
  //     console.log(`Mouse action: ${evtDate.start}, ${evtDate.end}, "ID ${evtDate.id}"`);
  //   });
  // }, [onEventDrop, onEventResize]);
  // updateEvent.mutate({
  //   id: eventDate!.id,
  //   start: eventDate?.start,
  //   end: eventDate?.end
  // });
  console.log(`Pick time: ${JSON.stringify(eventsDate)}`);

  const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

  // TypeScriptでReactのイベントにどう型指定するか
  // https://komari.co.jp/blog/10724/
  const handleOuterBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    setShowModal(false);
  }

  const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
    // console.log(`Calender outer: ${divRef.current?.outerHTML}`);
    const month_elem = calendarRef.current?.querySelector('.rbc-month-view');
    // console.log(`Month view: ${month_elem?.classList.add()}`);
  }, [targetEvent]);

  // コンソールでの話し
  const toString = Object.prototype.toString;
  // toString.call(new Date()); // [object Date]
  const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
    const { id, title } = callingEvent;
    console.log(`選んだイベント: ${title}: ${toString.call(id)}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

  const closeInputForm = () => {
    setShowModal(false);
  }

  return (
    <div>
      <chakra.div display="flex" justifyContent="flex-start" overflowX="auto" scrollSnapType="x mandatory">
        <chakra.div className={gridArea} flexShrink="0" scrollSnapAlign="start">
          {/* <button className={topWidth}> */}
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          <TitleInputModal />
          {/* <div className={topWidth}> */}
          <div ref={calendarRef}>
            <DnDCalendar
              localizer={localizer}
              events={state}
              defaultView='week'
              startAccessor="start"
              endAccessor="end"
              onEventDrop={useMemo(() => onEventDrop, [])}
              onEventResize={useMemo(() => onEventResize, [])}
              resizable
              onSelectEvent={handleSelectEvent}
              // onSelectSlot={handleSelectSlot}
              selectable
              components={components}
              views={views.views}
            />
          </div>
        </chakra.div>
        <chakra.div>
          <button onClick={() => updateEvents.mutate(eventsDate)}>UpdateUpdate</button>
        </chakra.div>
        <chakra.div flexShrink="0" scrollSnapAlign="start"
          onClick={handleOuterBubbling}>
          {showModal &&
            <AddChildForm selectedEvent={targetEvent}
            closeClick={closeInputForm} ref={divRef} />
          }
        </chakra.div>
      </chakra.div>
    </div>
  );
}
