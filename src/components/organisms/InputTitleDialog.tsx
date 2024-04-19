import { useState, FormEvent } from 'react';
import moment from 'moment';

import { useEventsState } from '../../hooks/useContextFamily';
import { useCreateMutation } from '../../hooks/useEventMutation';
import { AuthGuardContext } from '../../lib/AppType';

type InputElementProps = React.ComponentProps<'input'>;

export const TitleInput = (auth: AuthGuardContext) => {
  const eventsState = useEventsState();

  const createEvent = useCreateMutation();
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const startDT = moment().format('YYYY-MM-DD HH:mm:ss');
  const endDT = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(`end_time: ${moment(endDT)}`);
    if(auth.type === 'auth'){
      // createEvent.mutate(eventItem!);
      createEvent.mutate({
        id: Number(eventsState.slice(-1)[0].id) + 1,
        group: 1,
        staff_id: auth.auth_id,
        title: title,
        start_time: moment(startDT),
        end_time: moment(endDT)
      });
      // eventsState.concat(eventItem!);
    }
  }

  return (
    <div>
      <h3>{auth.auth_id}</h3>
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
