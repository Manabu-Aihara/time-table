import { Event } from 'react-big-calendar';

// type CustomEvent = Omit<Event, 'title'>
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
