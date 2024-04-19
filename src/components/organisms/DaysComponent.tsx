import { useMemo, useState } from 'react';
import { DateLocalizer, Navigate, TitleOptions } from 'react-big-calendar';
// 🙆‍♂️ valid (@ts-expect-error のあとに続けて説明を書く必要がある)
//// @ts-expect-error どうしても "foo" から bar() が呼びたいんです
// import * as TimeGrid from 'react-big-calendar/lib/TimeGrid'
// import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import moment from 'moment';
import { SampleTimeline } from '../pages/TLComponent';
import { TimelineEventProps } from '../../lib/TimelineType';

import 'react-calendar-timeline/lib/Timeline.css'

export const MyWeek = () => {

  const [event, setEvent] = useState<TimelineEventProps>();

  // return <TimeGrid range={range} eventOffset={15}/>
  return (
    <div>
      Render Timeline!
      <SampleTimeline onShowFormView={
        (event: TimelineEventProps) => setEvent(event)}
        targetEvent={event!} />
    </div>
  );
}

MyWeek.range = (date: Date) => {
  const start = date;
  const end = moment(start).add(2, 'day').toDate();

  let current = start;
  const range = [];

  while (moment(current).isSameOrBefore(moment(end), 'day')) {
    range.push(current);
    current = moment(current).add(1, 'day').toDate();
  }

  return range;
}

MyWeek.navigate = (date: Date, action: 'PREV' | 'NEXT' | 'DATE', localizer: DateLocalizer) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = (date: Date, options: TitleOptions): string => {
  const [start, ...rest] = MyWeek.range(date);
  options.formats = [];
  console.log(`TitleOptions: ${JSON.stringify(options)}`);
  // return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
  return options.formats.concat(start.toISOString())
    + ' — ' + options.formats.concat(rest.pop()!.toISOString());
}
  
// export const {views, ...otherprops} = {
const views = {
  views: {
    month: true,
    week: true,
    day: true
  },
  // ... other props
};

export default views;
