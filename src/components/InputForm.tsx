import { useState, FormEvent } from 'react';
import { Event } from 'react-big-calendar'

import { useEventsDispatch, useEventsState } from '../lib/UseContext';
// import { MyCalendar } from './date-fns';

type InputElementProps = React.ComponentProps<'input'>;

export const InputComponent = (inputProps: InputElementProps) => {
  const [title, setTitle] = useState<string>('');
  const dispatch = useEventsDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // このコンポーネントで onChange 発火時に必ず実行したい振る舞いを書く
    // inputProps?.onChange?.(e);
    setTitle(e.target.value);
    // console.log(`ここにも注目：${state}`);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      title: title
    });
    // console.log(inputProps);
    console.log(`ここ注目：${title}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          {...inputProps}
          placeholder="やることを入力してくださいー"
          onChange={handleChange}
        />
        <button>追加</button>
      </form>
      {/* <MyCalendar title={title} /> */}
    </div>
  );
};