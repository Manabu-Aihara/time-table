import { Box } from "@chakra-ui/react";

import { useDialog } from '../../hooks/useDialog';

import { addButton } from "./AddButtonComponent.css";

export const AddEventButton = () => {

  const { open } = useDialog();
  return (
    <Box>
      <button onClick={open} className={addButton}>Add Event</button>
    </Box>
  )
}