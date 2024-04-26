import { TitleInput } from './InputTitleDialog';
import { useDialog } from '../../hooks/useDialog';
import { Auth } from '../../lib/TimelineType';
import { useAuthContext } from '../../hooks/useContextFamily';
import { useAuthQuery } from '../../resources/queries';

// import { addButton } from "./AddButtonComponent.css";

export const TitleInputModal = () => {
  const { Dialog, open, close } = useDialog();

  const authContext = useAuthContext();  
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  
  const { data } = useAuthQuery(tokenContext!);
  // or const { data } = useSearchQuery('userID');
  const guard: Auth = {authId: Number(data), type: 'auth'};

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
