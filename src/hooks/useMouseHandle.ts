import { useState, useCallback } from "react";
import { withDragAndDropProps, EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'

import { PickDate, TimelineEventProps } from '../lib/TimelineType';

export const useMouseEvents = () => {
  // const [eventsDate, setEventsDate] = useState<PickDate[]>([]);
  const [eventList, setEventList] = useState<TimelineEventProps[]>([]);
  
  // const onEventResize: withDragAndDropProps<TimelineEventProps>['onEventResize'] = data => {
  const onEventResize = useCallback(({ event: handleEvent, start, end }: EventInteractionArgs<TimelineEventProps>) => {
    // const { event: handleEvent, start, end } = data;

    setEventList(currentEvents => {
      // const target = currentEvents.find((evt) => evt.id === handleEvent.id);
      const resizedEvent: TimelineEventProps =  {
        // スプレッドが先だったんですね…
        ...handleEvent,
        start: new Date(start),
        end: new Date(end)
      }
      console.log(`before: ${JSON.stringify(currentEvents)}, resize: ${JSON.stringify(resizedEvent)}`);
      return [...currentEvents, resizedEvent]
    });
      // console.log(`Pick time R: ${JSON.stringify(eventsDate)}`);
  // }
  }, []);

  // const onEventDrop: withDragAndDropProps<TimelineEventProps>['onEventDrop'] = data => {
  const onEventDrop = useCallback(({ event: handleEvent, start, end }: EventInteractionArgs<TimelineEventProps>) => {
    // const { event: handleEvent, start, end } = data;

    setEventList(currentEvents => {
      // const target = currentEvents.find((evt) => evt.id === handleEvent.id);
      const movedEvent: TimelineEventProps =  {
        ...handleEvent,
        start: new Date(start),
        end: new Date(end)
      }
      console.log(`before: ${JSON.stringify(currentEvents)}, move: ${JSON.stringify(movedEvent)}`);
      return [...currentEvents, movedEvent]
    });
    // console.log(`Pick time D: ${JSON.stringify(eventsDate)}`);
    // }
  }, []);

  return {onEventResize, onEventDrop, eventList};
}

const useMouseEvent = () => {
  const [eventDate, setEventDate] = useState<PickDate>({
    id: '',
    start: new Date(),
    end: new Date()
  });
  
  const onEventResize: withDragAndDropProps<TimelineEventProps>['onEventResize'] = data => {
    const { event: handleEvent, start, end } = data;

    setEventDate({...eventDate, id: handleEvent.id, start: new Date(start), end: new Date(end)});
    console.log(`Resize action: ${handleEvent.start}, ${handleEvent.end}, "ID ${handleEvent.id}"`);
  }

  const onEventDrop: withDragAndDropProps<TimelineEventProps>['onEventDrop'] = data => {
    const { event: handleEvent, start, end } = data;
  
    setEventDate({...eventDate, id: handleEvent.id, start: new Date(start), end: new Date(end)});
    console.log(`Drop action: ${handleEvent.start}, ${handleEvent.end}, "ID ${handleEvent.id}"`);
  }

  return {onEventResize, onEventDrop, eventDate};
}
