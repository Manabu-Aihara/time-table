import { useState, FormEvent, useEffect, useCallback } from 'react';
import { Event } from 'react-big-calendar'

import { useEventsDispatch, useEventsState } from '../lib/UseContext';
import { MyCalendar } from './date-fns';
import { eventsReducer } from './EventsParent';
import { Dialog } from './Dialog';

type InputElementProps = React.ComponentProps<'input'>;

export const InputComponent = (inputProps: InputElementProps) => {
  const [title, setTitle] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // このコンポーネントで onChange 発火時に必ず実行したい振る舞いを書く
    // const {name, value} = e.target;
    setTitle(e.target.value);
    // dispatch({
    //   type: 'CREATE',
    //   title: value
    // });
    // console.log(`ここにも注目：${title}`);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      title: title
    });
    console.log(`ここ注目：${JSON.stringify(currentState)}`);
    // I’ve dispatched an action, but logging gives me the old state value
    // https://react.dev/reference/react/useReducer
    const nextStage = eventsReducer(currentState, {type: 'CREATE', title: title});
    console.log(`ここ注目：${JSON.stringify(nextStage)}`);
  };

  return (
    <div>
      {/* <Dialog>
        <button onClick={close}>close</button>
      </Dialog> */}
      {/* <form onSubmit={onSubmit}> */}
        <input
          {...inputProps}
          placeholder="やることを入力してくださいー"
          onChange={handleChange}
        />
        <button onClick={onSubmit}>追加</button>
      {/* </form> */}
      {/* <MyCalendar events={currentState} /> */}
    </div>
  );
};