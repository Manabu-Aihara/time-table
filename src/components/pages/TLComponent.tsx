import { useState, useEffect, useRef, useCallback } from 'react';
import { chakra } from '@chakra-ui/system';

import Timeline from 'react-calendar-timeline';

import { TimelineEventProps } from '../../lib/TimelineType';
import { useEventsState } from '../../lib/UseContext';
import { AddChildForm } from "../organisms/InputItem";
import { AddEventButton } from '../molecules/AddButtonComponent';

// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';
import { topWidth } from '../sprinkles.responsive.css';

import moment from 'moment';

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

interface EventProps {
  targetEvent: TimelineEventProps;
	onShowFormView: (targetEvent: TimelineEventProps) => void;
}

export const SampleTimeline = ({onShowFormView, targetEvent}: EventProps) => {

	const [showModal, setShowModal] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

  const state = useEventsState();

  // TypeScriptでReactのイベントにどう型指定するか
  // https://komari.co.jp/blog/10724/
  const handleOuterBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!(e.target instanceof HTMLButtonElement)){
      return;
    }
    setShowModal(false);
  }

  useEffect(() => {
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
    // console.log(`Container: ${ref.current?.outerHTML}`);
  }, [targetEvent]);

  const handleSelectEvent = useCallback((callingEvent: TimelineEventProps) => {
    const { title, start_time, end_time } = callingEvent;
    console.log(`選んだイベント: ${start_time}: ${end_time}: ${title}`);
    onShowFormView(callingEvent);
    setShowModal(true);
  }, []);

  const closeInputForm = () => {
    setShowModal(false);
  }

  return (
    <div>
      Rendered by react!
      <AddEventButton />
      <chakra.div display="flex" justifyContent="flex-start" overflowY="auto" scrollSnapType="y mandatory">
        <Timeline
          groups={groups}
          items={state.map((item) => {
            return (
              {
                itemProps: {
                  onDoubleClick: () => handleSelectEvent(item),
                },
                // id: item.id,
                // staff_id: item.staff_id,
                // group: item.group,
                // start_time: item.start_time,
                // end_time: item.end_time,
                // onClick: () => handleSelectEvent(item)
                ...item
              }
            );
          })}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
        />
      </chakra.div>
      <chakra.div flexShrink="0" scrollSnapAlign="start" className={topWidth} onClick={handleOuterBubbling}>
        {showModal && <AddChildForm timelineEvent={targetEvent} closeClick={closeInputForm} ref={divRef} />}
      </chakra.div>
    </div>
  );
}
