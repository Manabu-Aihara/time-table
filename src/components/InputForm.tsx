import { useState, FormEvent } from 'react';

import { useEventsDispatch } from './EventContext';

type InputElementProps = React.ComponentProps<'input'>;
export type EventState = {
  title: string; // コンポーネント独自のprops
  errorMessage?: string; // コンポーネント独自のprops
  inputElementProps?: InputElementProps; // inputElementのprops
};

export const InputComponent = ({
  title,
  errorMessage,
  inputElementProps,
}: EventState) => {
  const [value, setValue] = useState('');
  const dispatch = useEventsDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      title: value
    });
    setValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // このコンポーネントで onChange 発火時に必ず実行したい振る舞いを書く
    inputElementProps?.onChange?.(e);
    console.log(inputElementProps);
    console.log(inputElementProps?.onChange?.(e));
  };

  return (
    <div>
      <p>{title}</p>
      <input {...inputElementProps} onChange={handleChange} />
      <p>{errorMessage}</p>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          placeholder="やることを入力してくださいー"
          onChange={e => setValue(e.target.value)}
        />
        <button>追加</button>
      </form>
    </div>
  );
};