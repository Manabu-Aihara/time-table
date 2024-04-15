// import { Event } from 'react-big-calendar';
import moment from 'moment';

import { TimelineItemBase as TimelineItem } from 'react-calendar-timeline';

import { EventItem } from './AppType';

type Merge<T, U> = Omit<T, keyof U> & U

type NewTimelineItem = Omit<TimelineItem<moment.Moment | Date> & EventItem, 'title'>

/**
 * Before App type
 * export type EventItem = Event & {
	summary: string;
	owner: string;
	done: string;
}
 */
/**
 * Finally Event type
 * type TimelineEventProps = {
	id: Id;
	group: Id;
	// title?: React.ReactNode;
	start_time: DateType;
	end_time: DateType;

	staff_id: number;
	title: React.ReactNode;
	summary?: string;
	progress?: string;
}
 */
export type TimelineEventProps = Merge<NewTimelineItem, {
  title: React.ReactNode;
  onClick?: () => void;
}>;

// TimelineItemBaseのやっかいなId = string | numberを何とかしたい
type ComposeDataType<T> = {
	[Key in keyof T]: number;
}
type PickTypeId = Pick<TimelineEventProps, 'id'>;
type NumberOfId = ComposeDataType<PickTypeId>;
type X = NumberOfId['id']
const y : NumberOfId = {id: 123}
