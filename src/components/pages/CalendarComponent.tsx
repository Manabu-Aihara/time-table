import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chakra } from '@chakra-ui/system';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';

import { useAuthContext, useEventsState } from '../../hooks/useContextFamily';
import { TimelineEventProps } from '../../lib/TimelineType';
import { ItemComponent } from '../molecules/EventCardComponent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { topWidth } from '../sprinkles.responsive.css';
import { gridArea } from './CalendarComponent.css';
import { MyWeek } from '../organisms/DaysClassComponent';
import views from '../organisms/DaysComponent';
import { useAuthQuery } from '../../resources/queries';

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

export const MyCalendar = () => {
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

  const info = useAuthQuery();
  console.log(`ID in calendar: ${info.data}`);

	// const [showModal, setShowModal] = useState(false);

  // ここは後にツールチップか何かで
  // const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
  //   const { title, start, end } = callingEvent;
  //   console.log(`選んだイベント: ${start}:${end}:${title}`);
  //   onShowFormView(callingEvent);
  //   setShowModal(true);
  // }, []);

  console.log(`ダイアログ外: ${JSON.stringify(state)}`);
  return (
    <div>
      <chakra.div className={topWidth} flexShrink="0" scrollSnapAlign="start">
        <button>
          <Link to="/timeline">サンプルタイムライン</Link>
        </button>
        <div>
          <Calendar
            localizer={localizer}
            events={state}
            defaultView='week'
            startAccessor="start"
            endAccessor="end"
            // onSelectEvent={handleSelectEvent}
            // onSelectSlot={handleSelectSlot}
            selectable
            components={components}
            views={views.views}
          />
        </div>
      </chakra.div>
    </div>
  );
}
