import { Box, Button, Text } from "@chakra-ui/react";

import { useDialog } from "../../hooks/useDialog";

export const ErrorModal = () => {
  const { Dialog, open, close } = useDialog();

  return (
    <Box>
      <Dialog>
        <Text>異なるスタッフの、変更はできません</Text>
        <Button onClick={close}></Button>
      </Dialog>
    </Box>
  );
}