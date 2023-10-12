import { useEffect, useRef, useCallback } from 'react'
import { Calendar, SlotInfo, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";

const mLocalizer = momentLocalizer(moment)

export function OnSelectSlot() {
    const clickRef = useRef<number | undefined>(undefined)
  
    useEffect(() => {
      /**
       * What Is This?
       * This is to prevent a memory leak, in the off chance that you
       * teardown your interface prior to the timed method being called.
       */
      return () => {
        window.clearTimeout(clickRef?.current)
      }
    }, [])
  
    const onSelectSlot = useCallback((slotInfo: SlotInfo) => {
      /**
       * Here we are waiting 250 milliseconds (use what you want) prior to firing
       * our method. Why? Because both 'click' and 'doubleClick'
       * would fire, in the event of a 'doubleClick'. By doing
       * this, the 'click' handler is overridden by the 'doubleClick'
       * action.
       */
      window.clearTimeout(clickRef?.current)
      clickRef.current = window.setTimeout(() => {
        // window.alert(slotInfo)
        console.log(JSON.stringify(slotInfo));
      }, 250)
    }, [])
  
    // const defaultDate = useMemo(() => new Date(2015, 3, 1), [])

    const demoEvents = [
        {
          title: 'Event 1',
          start: new Date(),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),
        },
        {
          title: 'Event 2',
          start: new Date(new Date().setDate(new Date().getDate() + 1)),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),
        }
      ];

    return (
      <div className="height600">
        <Calendar
          // defaultDate={defaultDate}
          events={demoEvents}
          localizer={mLocalizer}
          onSelectSlot={onSelectSlot}
          selectable
        />
      </div>
    )
  }