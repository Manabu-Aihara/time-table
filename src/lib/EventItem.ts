import { Event } from 'react-big-calendar';

// export type EventItem = Event & {
// 	summary: string;
// 	owner: string;
// 	done: string;
// }
export interface EventItem extends Event {
	summary?: string;
	owner?: string;
	done?: string;
}
