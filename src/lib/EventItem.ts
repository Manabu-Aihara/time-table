import { Event } from 'react-big-calendar';

// type Filter = {
//   <T>(array: T[], f: (item: T) => boolean): T[]
// }
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
