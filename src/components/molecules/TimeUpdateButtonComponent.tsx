import { forwardRef, Ref, useEffect, useState } from "react";
import { ChakraProvider, Box, Button, Text } from "@chakra-ui/react";

import { useUpdateDateListMutation } from "../../hooks/useEventMutation";
import { TimelineEventProps } from "../../lib/TimelineType";
import { updateButtonArea } from "./TimeUpdateButtonComponent.css";

type ChangingProp = {
  timeChangeEvents: TimelineEventProps[]
}

export const TimesUpdateButton = forwardRef(
  ({timeChangeEvents}: ChangingProp, buttonRef: Ref<HTMLDivElement>) => {
  console.log(`Event list =: `, timeChangeEvents);

  // idのだけの配列
  const timeChangeEventIds = timeChangeEvents.map(
    timeChangeEvent => timeChangeEvent.id.toString()
  );

  const updateEvents = useUpdateDateListMutation(timeChangeEventIds);
  const handleUpdateAction = () => {
    updateEvents.mutate(timeChangeEvents);
    // console.log('Updateしたつもり');
    timeChangeEvents.splice(0);
  }

  return (
    <ChakraProvider>
      {timeChangeEvents.length > 0 &&
        <Box className={updateButtonArea.container} ref={buttonRef}>
          <Button onClick={handleUpdateAction}>変更する</Button>
          <Text className={updateButtonArea.countText}>変更回数: {timeChangeEvents.length}</Text>
        </Box>
      }
    </ChakraProvider>
  );
});
