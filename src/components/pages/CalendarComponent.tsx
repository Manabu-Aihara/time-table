import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'react-big-calendar'
import { chakra } from '@chakra-ui/system';
import cx from 'classnames';

import { useEventsState } from '../../hooks/useContextFamily';
import { TimelineEventProps } from '../../lib/TimelineType';
import { ItemComponent } from '../molecules/EventCardComponent';
import { MyWeek } from '../organisms/DaysClassComponent';
import views from '../organisms/DaysComponent';
import { TitleInputModal } from '../organisms/DialogComponent'; 
import { AddChildForm } from "../organisms/InputItem";
import localizer from '../../lib/Localization';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { topWidth } from '../sprinkles.responsive.css';
import { gridArea } from './CalendarComponent.css';
import { ClassNames } from '@emotion/react';

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: TimelineEventProps }) => {
      // console.log(`When move?: ${JSON.stringify(event)}`);
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();
  console.log(`Calendar state: ${JSON.stringify(state)}`);

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
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
    // console.log(`Calender outer: ${divRef.current?.outerHTML}`);
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
        <chakra.div className={cx(gridArea, topWidth)} flexShrink="0" scrollSnapAlign="start">
          {/* <button className={topWidth}> */}
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          <TitleInputModal />
          {/* <div className={topWidth}> */}
          <div>
            <Calendar
              localizer={localizer}
              events={state}
              defaultView='week'
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              // onSelectSlot={handleSelectSlot}
              selectable
              components={components}
              views={views.views}
            />
          </div>
        </chakra.div>
        <chakra.div flexShrink="0" scrollSnapAlign="start"
          className={topWidth} onClick={handleOuterBubbling}>
          {showModal &&
            <AddChildForm timelineEvent={targetEvent}
            closeClick={closeInputForm} ref={divRef} />
          }
        </chakra.div>
      </chakra.div>
    </div>
  );
}
