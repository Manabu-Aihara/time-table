// import { Event } from 'react-big-calendar';
import { TimelineItem, TimelineItemBase } from 'react-calendar-timeline';

import { EventItem } from './EventItem';

type Merge<T, U> = Omit<T, keyof U> & U

type NewTimelineItem = Omit<TimelineItemBase<Date> & EventItem, "title">

export type TimelineEventProps = Merge<NewTimelineItem, {
  // id: number | string;
  title: React.ReactNode;
  // start_time: Date;
  // end_time: Date;
  onClick?: () => void;
}>;
