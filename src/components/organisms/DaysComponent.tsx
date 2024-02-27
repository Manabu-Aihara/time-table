import { useState, useMemo } from 'react';
import Timeline from 'react-calendar-timeline';
import { ViewStatic, ViewsProps } from 'react-big-calendar';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { EventItem } from '../../lib/EventItem';

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

export const MyTimeline = () => {

  // console.log(`ダイアログ外: ${JSON.stringify(eventItem)}`);
  return (
    <div>
      Rendered by react!
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      />
    </div>
  );
}

type Props = ViewsProps<EventItem, object>

const CustomView: React.ComponentType<any> & ViewStatic = (vprop: ViewStatic) => {
  const { navigate, title } = vprop
  const [evtItem, setEvtItem] = useState<EventItem>({});

  return <MyTimeline />
}

export const customView: Props = useMemo(() => (
  {
    month: true,
    week: true,
    day: CustomView
  }
  // ... other props
), []);
