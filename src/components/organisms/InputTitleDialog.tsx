import { useState, FormEvent } from 'react';

import { useAuthContext, useEventsState } from '../../hooks/useContextFamily';
import { useCreateMutation } from '../../hooks/useEventMutation';
import { TimelineEventProps } from '../../lib/TimelineType';
import { AuthNumber } from '../../lib/AppType';

type InputElementProps = React.ComponentProps<'input'>;

export const TitleInput = (authId: AuthNumber) => {
  const eventsState = useEventsState();

  const auth = useAuthContext();
  const createEvent = useCreateMutation(authId);
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  type ComposeDataType<T extends any> = {
    [Key in keyof T]: number;
  }
  type PickTypeId = Pick<TimelineEventProps, 'id'>;
  type NumberOfId = ComposeDataType<PickTypeId>;
  const y : NumberOfId = {id: 123}
  /**
   * ValueOfOption<V>: Option<T>を受け取って、渡されたのがSome型なら中身の値の型を返す。
   * 渡されたのがNone型ならundefinedを返す。
   */
  // https://qiita.com/uhyo/items/da21e2b3c10c8a03952f
  // type ValueOfOption<V> = V extends Some<infer R> ? R : undefined;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // createEvent.mutate(eventItem!);
    createEvent.mutate({
      id: Number(eventsState.slice(-1)[0].id) + 1,
      group: 0,
      staff_id: authId,
      title: title,
      start_time: new Date(),
      end_time: new Date(new Date().getHours() + 1)
    });
    // eventsState.concat(eventItem!);
  }

  return (
    <div>
      {/* <form onSubmit={onSubmit}> */}
      <input
        // {...inputAttr}
        placeholder="やることを入力してください"
        onChange={handleChange}
      />
      <button onClick={onSubmit}>追加</button>
      {/* </form> */}
      <p></p>
      {/* <button onClick={close}>close</button> */}
    </div>
  );
}
