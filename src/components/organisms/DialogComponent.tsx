import { useEffect, useState } from 'react';

import { TitleInput } from './InputTitleDialog';
import { useDialog } from '../../hooks/useDialog';
import { AuthGuardContext } from '../../lib/AppType';
import { useAuthQuery } from '../../resources/queries';

export const TitleInputModal = () => {

  const { Dialog, close } = useDialog();
  const { data, isError } = useAuthQuery();
  const [authInfo, setAuthInfo] = useState<AuthGuardContext>();

  useEffect(() => {
    if(isError === false)
      setAuthInfo(authInfo);
  })

  return (
    <Dialog>
      <p>入力フォームコンテンツ</p>
      <TitleInput {...authInfo!} />
      <button onClick={close}>close</button>
    </Dialog>
  );
}
