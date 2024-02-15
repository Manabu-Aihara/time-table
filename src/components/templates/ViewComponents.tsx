import { useState } from "react";
import { chakra, ThemeProvider } from "@chakra-ui/system";
// import { Event } from 'react-big-calendar';
import { EventItem } from '../../lib/EventItem';
import { MyCalendar } from '../pages/ContainComponent';

import { customTheme } from '../../lib/Theme';

export const ViewComponent = () => {
	const [item, setItem] = useState<EventItem>();

  return (
    <ThemeProvider theme={customTheme}>
      <MyCalendar onShowDialogView={(event: EventItem) => setItem(event)} targetEvent={item} />
    </ThemeProvider>
  )
}
