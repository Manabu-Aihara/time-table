import { useState, FormEvent } from 'react';
import moment from 'moment';

import { useEventsState, useAuthContext } from '../../hooks/useContextFamily';
import { useCreateMutation } from '../../hooks/useEventMutation';
import { AuthInfoProp } from '../../lib/TimelineType';

type InputElementProps = React.ComponentProps<'input'>;

export const TitleInput = (auth: AuthInfoProp) => {
  // const authContext = useAuthContext();  
  // const infoObj = authContext.type === 'auth' ? {staffId: authContext.authId, groupId: authContext.group} : undefined;  
  console.log(`In modal auth info: ${JSON.stringify(auth)}`);
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
        group: auth.group,
        staff_id: auth.authId!,
        title: title,
        start_time: moment(startDT),
        end_time: moment(endDT)
      });
      // eventsState.concat(eventItem!);
    }
  }

  return (
    <div>
      <h4>{auth.type === 'auth' ? auth.authId : 'IDなし'}</h4>
      <h4>{auth.type === 'auth' ? auth.group : 'グループなし'}</h4>
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
