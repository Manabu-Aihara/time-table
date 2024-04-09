import { Event } from 'react-big-calendar';

// export type EventItem = Event & {
// 	summary: string;
// 	owner: string;
// 	done: string;
// }

export type AuthGuardContext = {
  accessToken: string;
  auth_id: number;
}
export type AuthNumber = Pick<AuthGuardContext, 'auth_id'>;

// type CustomEvent = Omit<Event, 'title'>
export interface EventItem extends Event {
	staff_id: AuthNumber;
	summary?: string;
	progress?: string;
}

// type TimelineEventProps = {
// 	id: Id;
// 	group: Id;
// 	// title?: React.ReactNode;
// 	start_time: DateType;
// 	end_time: DateType;

// 	staff_id: number;
// 	title: React.ReactNode;
// 	summary?: string;
// 	progress?: string;
// }
