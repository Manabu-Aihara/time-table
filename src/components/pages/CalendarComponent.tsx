import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Views, View } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { chakra } from '@chakra-ui/system';

import { useEventsState } from '../../hooks/useContextFamily';
import { TimelineEventProps } from '../../lib/TimelineType';
import { useMouseEvents } from '../../hooks/useMouseHandle';
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
import { topWidth } from '../sprinkles.responsive.css';
import { gridArea } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: TimelineEventProps }) => {
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();

  /**
   * Drag and Drop
   */
  const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
  const { onEventResize, onEventDrop, eventList } = useMouseEvents();

  // idのだけの配列
  const eventDateIds = eventList.map(eventItem => eventItem.id.toString());
  console.log(`Calendar pick id: ${eventDateIds}`);
  const updateEvents = useUpdateDateListMutation(eventDateIds);

  const newState = eventList ? state.concat(eventList) : state;
  console.log(`Pick time: ${JSON.stringify(eventList)}`);

  const [displayDate, setDisplayDate] = useState(new Date());
  console.log(`What rbc date: ${displayDate}`);
  const [returnView, setReturnView] = useState<View>();
  const onNavigate = useCallback((newDate: Date) => setDisplayDate(newDate), [setDisplayDate]);
  const onView = useCallback((newView: View) => setReturnView(newView), [setReturnView]);

  console.log(`Calendar state: ${JSON.stringify(newState)}`);


  /**
   * Issue summary & progress
   */
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

  // const calendarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
    console.log(`Calender outer: ${divRef.current?.outerHTML}`);
    // console.log(`Modal Apparance: ${JSON.stringify(targetEvent)}`);
    // const month_elem = calendarRef.current?.querySelector('.rbc-month-view');
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
      <TitleInputModal />
      <chakra.div display="flex" justifyContent="flex-start" overflowX="auto" scrollSnapType="x mandatory">
        <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
          <button onClick={() => updateEvents.mutate(eventList)}>UpdateUpdate</button>
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          {/* <div className={topWidth}> */}
          <chakra.div overflowX='hidden'>
            <DnDCalendar
              date={displayDate}
              localizer={localizer}
              events={newState}
              // defaultView='week'
              startAccessor="start"
              endAccessor="end"
              onNavigate={onNavigate}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              resizable
              onSelectEvent={handleSelectEvent}
              // onSelectSlot={handleSelectSlot}
              selectable
              onView={onView}
              components={components}
              views={views.views}
            />
          </chakra.div>
        </chakra.div>
        <chakra.div flexShrink="0" scrollSnapAlign="start"
          className={topWidth}
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
