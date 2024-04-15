import { useEffect, useState } from 'react';

import { TitleInput } from './InputTitleDialog';
import { AddEventButton } from '../molecules/AddButtonComponent';
import { useDialog } from '../../hooks/useDialog';
import { AuthGuardContext } from '../../lib/AppType';
import { useAuthQuery } from '../../resources/queries';

// import { addButton } from "./AddButtonComponent.css";

export const TitleInputModal = () => {

  const { Dialog, open, close } = useDialog();
  const { data, isError } = useAuthQuery();
  const guard: AuthGuardContext = {auth_id: Number(JSON.stringify(data)), type: 'auth'}
  // const [authInfo, setAuthInfo] = useState<AuthGuardContext>();

  // useEffect(() => {
  //   if(isError === false)
  //     setAuthInfo(authInfo);
  // })

  return (
    <div>
      <button onClick={open}>Add Event</button>
      <Dialog>
        <p>入力フォームコンテンツ</p>
        <TitleInput {...guard} />
        <button onClick={close}>close</button>
      </Dialog>
    </div>
  );
}
