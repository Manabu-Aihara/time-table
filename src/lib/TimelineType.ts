import { Event } from 'react-big-calendar';
import { TimelineItem } from 'react-calendar-timeline';

import { EventItem } from './EventItem';

type Merge<T, U> = Omit<T, keyof U> & U

type NewTimelineItem = Omit<TimelineItem<EventItem>, "id" | "start_time" | "end_time">

export type TimelineEventProps = Merge<Event & NewTimelineItem, {
  title: React.ReactNode
}>;
