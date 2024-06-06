import { FormEvent } from 'react';

import { useUpdateEventMutation } from '../../hooks/useEventMutation';
import { useSearchQuery } from '../../resources/queries';
import { TimelineEventProps } from '../../lib/TimelineType';

const DeleteButton = (eventItem: TimelineEventProps) => {
	const updateEvent = useUpdateEventMutation(selectedEvent.id);

	// リテラルタイプ化
	const selectedStaff = `${eventItem.staff_id}` as const;
	const { data: infoContext } = useSearchQuery('userID');
	// infoContext === selectedStaff
	// 	? console.log(`Target event staff: ${infoContext}, Passing!`)
	// 	: console.log(`Parse staff: ${selectedStaff}, Dout!`);

	const handleUpdate = (e: FormEvent) => {
		e.preventDefault();
		// dispatch({
		// 	type: 'UPDATE',
		// 	payload: eventItem
		// });
		if(infoContext !== selectedStaff) {
			e.stopPropagation();
			console.log('上通りました');
			// open();
		} else {
			console.log('下通りました');
			updateEvent.mutate({
				...eventItem,
				summary: eventItem.summary,
				progress: eventItem.progress
			});
			console.log(`Update!: ${JSON.stringify(eventItem)}`);
		}
	}


  return (
    <>
      <Button onClick={handleUpdate}>送信</Button>
    </>
  );
}