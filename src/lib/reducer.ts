import { TimelineEventPropsList, Action } from '../components/EventsParent';

// * Reducer *
export function timelineEventsReducer (timelineEventventState: TimelineEventPropsList, action: Action): TimelineEventPropsList {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return timelineEventventState.concat({
          staff_id: 0,
          title: payload.title,
          start: new Date(),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),
          group: 1,
        });
    case 'UPDATE':
      return timelineEventventState.map(evt => evt.title === action.payload.title ? action.payload : evt)
    default:
      throw new Error('Invalid action');
  }
}

