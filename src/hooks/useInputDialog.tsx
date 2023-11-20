import { useState, useCallback, FormEvent, ReactNode } from 'react';
import { Event } from 'react-big-calendar'

import { useEventsDispatch, useEventsState } from '../lib/UseContext';
import { eventsReducer } from '../components/EventsParent';

type InputElementProps = React.ComponentProps<'input'>;

type DialogProps = {
  isOpen: boolean;
  children: ReactNode;
  close: () => void;
};

export const useInputDialog = () => {
  const [title, setTitle] = useState<string>('');
  // const [isOpen, setIsOpen] = useState(false);
  // const open = useCallback(() => setIsOpen(true), []);
  // const close = useCallback(() => setIsOpen(false), []);
  const currentState = useEventsState();
  const dispatch = useEventsDispatch();

  const InputDialog = ({children}: {children: ReactNode}) => {

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
      const nextStage = eventsReducer(currentState, {type: 'CREATE', title: title});
      console.log(`ここ注目：${JSON.stringify(nextStage)}`);
    };

    return (
      <div>
        {children}
        {/* <form onSubmit={onSubmit}> */}
          <input
            // {...inputProps}
            placeholder="やることを入力してくださいー"
            onChange={handleChange}
          />
          <button onClick={onSubmit}>追加</button>
        {/* </form> */}

      </div>
    );
  }

  return InputDialog;
}