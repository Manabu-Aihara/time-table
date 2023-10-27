import { useState, FormEvent } from 'react';

import { useEventsDispatch } from '../lib/UseContext';
import { MyCalendar } from './date-fns';

type InputElementProps = React.ComponentProps<'input'>;

// const InputFormContext = createContext('')

export const InputComponent = (inputProps: InputElementProps) => {
  const [value, setValue] = useState('');
  const dispatch = useEventsDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // このコンポーネントで onChange 発火時に必ず実行したい振る舞いを書く
    inputProps?.onChange?.(e);
    // console.log(inputProps);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      title: value
    });
    setValue(value);
    console.log(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          {...inputProps}
          // value={value}
          placeholder="やることを入力してくださいー"
          // onChange={e => setValue(e.target.value)}
          onChange={(e) => handleChange(e)}
        />
        <button>追加</button>
      </form>
      <MyCalendar />
    </div>
  );
};