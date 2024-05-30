import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Views, View } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import { chakra } from '@chakra-ui/system';

import { useEventsState } from '../../hooks/useContextFamily';
import { TimelineEventProps } from '../../lib/TimelineType';
import { useMouseEvents } from '../../hooks/useMouseHandle';
import { CustomContainerWrapper, CustomEventWrapper, CustomEventCard } from '../molecules/WrapComponent';
import { TimesUpdateButton } from '../molecules/UpdateButtonComponent';
import { MyWeek } from '../organisms/DaysClassComponent';
import views from '../organisms/DaysComponent';
import { TitleInputModal } from '../organisms/DialogComponent'; 
import { AddChildForm } from "../organisms/InputItem";
import localizer from '../../lib/Localization';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import cx from 'classnames';
import { topWidth } from '../sprinkles.responsive.css';
import { flexXmandatory, gridArea } from './CalendarComponent.css';
// import { eventData } from '../../lib/SampleState';

interface EventFormProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventFormProps) => {
  const state = useEventsState();

  /**
   * Drag and Drop
   */
  const DnDCalendar = withDragAndDrop(Calendar<TimelineEventProps>);
  const { onEventResize, onEventDrop, eventList, prevRef } = useMouseEvents();

  const eventPropGetter = useCallback((event: TimelineEventProps) => {
    console.log(`Getter: ${JSON.stringify(event)}`);
    return event.isDraggabled ? { className: 'isDraggable' } : { className: 'nonDraggable' }
  }, []);

  state.map((evt, j) => {
    if(prevRef){
      (prevRef.current?.isDraggabled === true && prevRef.current.id === evt.id)
        && (delete state[j] && console.log(`Exclude event id: ${prevRef.current?.id}, ${j}`));
    }
  });
  console.log(`Old state: ${JSON.stringify(state)}`);
  const newState = eventList ? state.concat(eventList) : state;
  console.log(`Expect update events: ${JSON.stringify(eventList)}`);

  // Viewの切り替え調節、このまんま使える
  const [displayDate, setDisplayDate] = useState(new Date());
  console.log(`What rbc date: ${displayDate}`);
  const onNavigate = useCallback((newDate: Date) => setDisplayDate(newDate), [setDisplayDate]);
  const [returnView, setReturnView] = useState<View>();
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

  useEffect(() => {
    divRef.current?.scrollIntoView({behavior: 'smooth'});
    // console.log(`Calender outer: ${divRef.current?.outerHTML}`);
    // console.log(`Form Apparance: ${JSON.stringify(targetEvent)}`);
    // const month_elem = calendarRef.current?.querySelector('.rbc-month-view');
    // console.log(`Month view: ${month_elem?.classList.add()}`);
  }, [targetEvent]);

  const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
    console.log(`Selected event: ${JSON.stringify(callingEvent)}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

  const closeInputForm = () => {
    setShowModal(false);
  }

  const customComponents = useMemo(() => ({
    event: CustomEventCard,
    eventWrapper: CustomEventWrapper,
    eventContainerWrapper: CustomContainerWrapper
  }), []);

  return (
    <chakra.div>
      <TitleInputModal />
      <TimesUpdateButton timeChangeEvents={eventList} />
      <chakra.div className={flexXmandatory}>
        <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          {/* 【CSS】overflowの使い方解説！要素のはみ出し解決
           https://zero-plus.io/media/overflow/ */}
          <chakra.div overflowX="hidden">
            <DnDCalendar
              date={displayDate}
              localizer={localizer}
              events={newState}
              // ドラッグ・アンド・ドロップ、リサイズ後、weekに戻ります
              defaultView="week"
              startAccessor="start"
              endAccessor="end"
              onNavigate={onNavigate}
              eventPropGetter={eventPropGetter}
              onEventDrop={onEventDrop}
              onEventResize={onEventResize}
              resizable
              onSelectEvent={handleSelectEvent}
              // onSelectSlot={}
              selectable
              onView={onView}
              // components={customComponents}
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
    </chakra.div>
  );
}
