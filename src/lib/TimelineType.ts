// import { Event } from 'react-big-calendar';
import { TimelineItemBase as TimelineItem } from 'react-calendar-timeline';

import { EventItem } from './AppType';

type Merge<T, U> = Omit<T, keyof U> & U

type NewTimelineItem = Omit<TimelineItem<Date> & EventItem, "title">

export type TimelineEventProps = Merge<NewTimelineItem, {
  title: React.ReactNode;
  onClick?: () => void;
}>;
