import { useState, useCallback } from "react";
import { withDragAndDropProps, EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop'

import { PickDate, TimelineEventProps } from '../lib/TimelineType';

export const useMouseEvents = () => {
  const [eventsDate, setEventsDate] = useState<PickDate[]>([]);
  
  const onEventResize: withDragAndDropProps<TimelineEventProps>['onEventResize'] = data => {
  // const onEventResize = useCallback(({ event: handleEvent, start, end }: EventInteractionArgs<TimelineEventProps>) => {
    const { event: handleEvent, start, end } = data;

    setEventsDate(currentEvents => {
      // const target = currentEvents.find((evt) => evt.id === handleEvent.id);
      const resizedTime: PickDate =  {
        id: handleEvent.id,
        start: new Date(start),
        end: new Date(end)
      }
      console.log(`before: ${JSON.stringify(currentEvents)}, resize: ${JSON.stringify(resizedTime)}`);
      return [...currentEvents, resizedTime]
    });
      // console.log(`Pick time R: ${JSON.stringify(eventsDate)}`);
  }
    // }, []);

  const onEventDrop: withDragAndDropProps<TimelineEventProps>['onEventDrop'] = data => {
  // const onEventDrop = useCallback(({ event: handleEvent, start, end }: EventInteractionArgs<TimelineEventProps>) => {
    const { event: handleEvent, start, end } = data;

    setEventsDate(currentEvents => {
      const target = currentEvents.find((evt) => evt.id === handleEvent.id);
      const movedTime: PickDate =  {
        id: handleEvent.id,
        start: new Date(start),
        end: new Date(end)
      }
      console.log(`before: ${JSON.stringify(currentEvents)}, move: ${JSON.stringify(movedTime)}`);
      return [...currentEvents, movedTime]
    });
    // console.log(`Pick time D: ${JSON.stringify(eventsDate)}`);
    }
  // }, []);

  return {onEventResize, onEventDrop, eventsDate};
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
