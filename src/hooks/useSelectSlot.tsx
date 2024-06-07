import { useRef, useCallback, PropsWithChildren } from "react";
import { SlotInfo } from "react-big-calendar";

import { useDialog } from "./useDialog"
import { useAuthContext } from './useContextFamily';
import { useAuthQuery } from '../resources/queries';
import { AuthInfoProp } from '../lib/TimelineType';

const useSelectSlot = () => {
  const { Dialog, open, close } = useDialog();

  const authContext = useAuthContext();  
  const tokenContext = authContext.type === 'token' ? authContext.accessToken : undefined;  
  const { data } = useAuthQuery(tokenContext!);

  const strData = JSON.stringify(data);
  // パターン 1
  const objValue = JSON.parse(strData);
  console.log(`Json type: ${typeof objValue.staff_id}, ${typeof objValue.group_id}`);
  const guard: AuthInfoProp = {
    authId: objValue.staff_id, group: objValue.group_id, type: 'auth'
  } as const;

  const getSlotStart = () => {
    open();
    return 
  }

  const DialogElement: React.FC<PropsWithChildren<SlotInfo>> = useCallback((props) => {
    
    return (
      <div>
        <Dialog>
          <p>入力フォームコンテンツ</p>
          {props.children}
          <button onClick={close}>close</button>
        </Dialog>
      </div>
    );
  }, []);

}
