import { Event } from 'react-big-calendar';

export type AccessToken = string | undefined;
export type TokenProp = {
	accessToken: string;
}
// export interface AuthGuardContext<T, U = 'auth'> {
export interface AuthGuardContext {
	type: 'auth',
  // accessToken: string,
  auth_id: number
}

// type None = { type: 'None' };
// type Option<T> = None | AuthGuardContext<T>;
/**
 * ValueOfOption<V>: Option<T>を受け取って、渡されたのがAuthGuardContext型なら、
 * 中身の値の型を返す。
 * 渡されたのがNone型ならundefinedを返す。
 */
// type ValueOfOption<V extends Option<unknown>> = V extends AuthGuardContext<infer R> ? R : undefined;
// export type AuthNumber = ValueOfOption<AuthGuardContext<number>>;

// type CustomEvent = Omit<Event, 'title'>
export interface EventItem extends Event {
	staff_id: number,
	summary?: string,
	progress?: string
}
