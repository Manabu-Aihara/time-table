import { Box } from "@chakra-ui/react";

import { TitleInput } from './InputTitleDialog';
import { useDialog } from '../../hooks/useDialog';
import { AuthInfoProp } from '../../lib/TimelineType';
import { useAuthContext } from '../../hooks/useContextFamily';
import { useAuthQuery } from '../../resources/queries';

import { addButton } from "./AddButtonComponent.css";
import { topWidth } from '../sprinkles.responsive.css';

export const TitleInputModal = () => {
  const { Dialog, open, close } = useDialog();

  const authContext = useAuthContext();  
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  
  const { data } = useAuthQuery(tokenContext!);
  // or const { data } = useSearchQuery('userID');
  console.log(`Json stringfy: ${JSON.stringify(data)}`);
  const strData = JSON.stringify(data);
  const value = JSON.parse(strData);
  console.log(`Json parse: ${JSON.stringify(value)}`);
  const guard: AuthInfoProp = {
    authId: value.staff_id, group: value.group_id, type: 'auth'
  };

  return (
    // <Box className={topWidth}>
    <Box>
      <button onClick={open} className={addButton}>Add Event</button>
      <Dialog>
        <p>入力フォームコンテンツ</p>
        <TitleInput {...guard} />
        <button onClick={close}>close</button>
      </Dialog>
    </Box>
  );
}
