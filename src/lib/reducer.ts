import { TimelineEventPropsList, Action } from '../components/EventsParent';

// * Reducer *
export const timelineEventsReducer = (timelineEventventState: TimelineEventPropsList, action: Action): TimelineEventPropsList => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE':
      return timelineEventventState.concat({
        id: payload.id,
        staff_id: payload.staff_id,
        group: payload.group,
        title: payload.title,
        start_time: new Date(),
        end_time: new Date(new Date().setHours(new Date().getHours() + 1)),
      });
    case 'UPDATE':
      return timelineEventventState.map(evt => evt.title === action.payload.title ? action.payload : evt)
    default:
      throw new Error('Invalid action');
  }
}

