import { AxiosResponse } from "axios";
import { AuthInfoProp } from "./TimelineType";

export type ValueOf<T> = T[keyof T]

// ValueOf<{ key1: 'hoge'; key2: 'fuga'}>  => 'hoge' | 'fuga'

// TypeScript でのタイプセーフな JSON シリアル化をマスターする
// https://hackernoon.com/ja/TypeScript-%E3%81%A7%E3%81%AE%E3%82%BF%E3%82%A4%E3%83%97-%E3%82%BB%E3%83%BC%E3%83%95%E3%81%AA-JSON-%E3%82%B7%E3%83%AA%E3%82%A2%E3%83%AB%E5%8C%96%E3%82%92%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%E3%81%99%E3%82%8B
type JSONPrimitive = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimitive | JSONValue[] | { [key: string]: JSONValue; };
type NotAssignableToJson = | bigint | symbol | (() => NonNullable<unknown>);
export type JSONCompatible<T> = unknown extends T ? never
  : { [P in keyof T]: T[P] extends JSONValue ? T[P]
  : T[P] extends NotAssignableToJson ? never : JSONCompatible<T[P]>; };
  
export function safeJsonStringify<T>(data: JSONCompatible<T>) { return JSON.stringify(data); }
export function toJsonValue<T>(value: JSONCompatible<T>): JSONValue { return value; }
export function safeJsonParse(text: string) { return JSON.parse(text) as unknown; }

export type ExcludeAxios<T extends AxiosResponse | undefined> = T extends AxiosResponse<infer R> ? R : never;
// const deyta: ExcludeAxios<typeof data> = data?.data!
// type X = typeof deyta
