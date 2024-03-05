import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { InputComponent } from '../organisms/InputTitle';
import { useEventsState } from '../../lib/UseContext';
import { TimelineEventProps } from '../../lib/TimelineType';
import { useDialog } from '../../hooks/useDialog';
import { AddChildForm } from "../organisms/InputItem";
import { ItemComponent } from '../molecules/EventItemComponent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { topWidth } from '../sprinkles.responsive.css';
import { addButton, gridArea } from './ContainComponent.css';
import { MyWeek } from '../organisms/DaysClassComponent';
// import { views } from '../organisms/DaysComponent';

const locales = {
  'ja-JP': ja,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const MyCalendar = ({onShowFormView, targetEvent}: EventProps) => {
  const components = useMemo(() => ({
    event: ({ event }: { event: TimelineEventProps }) => {
      // console.log(`入ってくるもの: ${JSON.stringify(event)}`);
      return (
        <>
          <ItemComponent {...event} />
        </>
      );
    }
  }), []);

  const state = useEventsState();
  const { Dialog, open, close } = useDialog();

	const divRef = useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(false);

  const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
    const { title, start, end } = callingEvent;
    console.log(`選んだイベント: ${start}:${end}:${title}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

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
    // console.log(`Container: ${ref.current?.outerHTML}`);
  }, [targetEvent]);

  const closeInputForm = () => {
    setShowModal(false);
  }

  // console.log(`ダイアログ外: ${JSON.stringify(state)}`);
  return (
    <div>
      <chakra.div display="flex" justifyContent="flex-start" overflowX="auto" scrollSnapType="x mandatory">
        <chakra.div className={`${topWidth} ${gridArea}`} flexShrink="0" scrollSnapAlign="start">
          <button onClick={open} className={addButton}>Add Event</button>
          <button>
            <Link to="/timeline">サンプルタイムライン</Link>
          </button>
          <Calendar
            localizer={localizer}
            events={state}
            defaultView='month'
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            // onSelectSlot={handleSelectSlot}
            selectable
            components={components}
            views={{
              month: true,
              week: MyWeek
            }}
          />
        </chakra.div>
        <chakra.div flexShrink="0" scrollSnapAlign="start" className={topWidth} onClick={handleOuterBubbling}>
          {showModal && <AddChildForm timelineEvent={targetEvent} closeClick={closeInputForm} ref={divRef} />}
        </chakra.div>
      </chakra.div>
      <Dialog>
        <p>入力フォームコンテンツ</p>
        <InputComponent />
        <button onClick={close}>close</button>
      </Dialog>
    </div>
  );
}
