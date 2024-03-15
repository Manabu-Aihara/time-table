import { TitleInput } from './InputTitle';

import { useDialog } from '../../hooks/useDialog';

export const TitleInputModal = () => {

  const { Dialog, close } = useDialog();

  return (
    <Dialog>
      <p>入力フォームコンテンツ</p>
      <TitleInput />
      <button onClick={close}>close</button>
    </Dialog>
  );
}
