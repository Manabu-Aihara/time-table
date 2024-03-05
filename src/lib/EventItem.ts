import { Event } from 'react-big-calendar';
// import { TimelineEventProps } from './TimelineType';

// export type EventItem = Event & {
// 	summary: string;
// 	owner: string;
// 	done: string;
// }
export interface EventItem extends Event {
	staff_id: number;
	summary?: string;
	// owner?: string;
	done?: string;
}
