import { useMemo } from 'react';
import { DateLocalizer, Navigate, TitleOptions } from 'react-big-calendar';
// 🙆‍♂️ valid (@ts-expect-error のあとに続けて説明を書く必要がある)
// @ts-expect-error どうしても "foo" から bar() が呼びたいんです
import * as TimeGrid from 'react-big-calendar/lib/TimeGrid'
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment';

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

export const SampleTimeline = () => {

  return (
    <div>
      Rendered by react!
      {/* <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      /> */}
    </div>
  );
}

SampleTimeline.range = (date: Date, localizer: DateLocalizer ) => {
  console.log(localizer);
  const range: Date[] = [];
  const start = date
  const end = localizer.add(start, 2, 'day')

  let current = start

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range;
}

SampleTimeline.navigate = (date: Date, action: 'PREV' | 'NEXT' | 'DATE', localizer: DateLocalizer) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

SampleTimeline.title = (date: Date, option: TitleOptions): string => {
  // type AnyType = ComponentProps<typeof option['']>
  // const l: DateLocalizer | AnyType = option
  // const castLocalizer: DateLocalizer = l as DateLocalizer
  // const [start, ...rest] = MyTimeline.range(date, l);
  console.log(`option.dateFormats: ${option.formats}`);
  console.log(date);
  //   return localizer.format(new Date(), 'dayRangeHeaderFormat')/* + ' — ' + castLocalizer.format(rest.pop()!, 'dayRangeHeaderFormat')*/
  return date.toISOString();
}
  
export const {views, ...otherprops} = {
  views: {
    month: true,
    week: true,
    day: SampleTimeline
  }
  // ... other props
}
