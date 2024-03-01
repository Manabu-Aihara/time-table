import React, { Component } from 'react';
// @ts-ignore
import * as TimeGrid from 'react-big-calendar/lib/TimeGrid';
import { NavigateAction } from 'react-big-calendar';
import moment from 'moment';
// import { TimeGrid } from 'react-big-calendar';

interface MyWeekProps {
  date: Date
}

export const MyWeek = () => {
  // let {date} = this.props
  const range = MyWeek.range(new Date())

  // return <TimeGrid range={range} eventOffset={15}/>
  return <div>{`${range}`}</div>
}

MyWeek.title = (date: Date) => {
    return `My awesome week: ${date.toLocaleDateString()}`
}

MyWeek.navigate = (date: Date, action: NavigateAction) => {
    switch (action) {
      case 'PREV':
        return moment(date).add(-3, 'day').toDate()

      case 'NEXT':
        return moment(date).add(3, 'day').toDate()

      default:
        return date
    }
  }

MyWeek.range = (date: Date) => {
    const start = date
    const end = moment(start).add(2, 'day')

    let current = start
    const range = []

    while (moment(current).isSameOrBefore(moment(end), 'day')) {
      range.push(current)
      current = moment(current).add(1, 'day').toDate()
    }

    return range
  }

// export default MyWeek
// export class MyWeek extends React.Component<MyWeekProps> {
//   static title = (date: Date) => {
//     return `My awesome week: ${date.toLocaleDateString()}`
//   }

//   static navigate = (date: Date, action: NavigateAction) => {
//     switch (action) {
//       case 'PREV':
//         return moment(date).add(-3, 'day').toDate()

//       case 'NEXT':
//         return moment(date).add(3, 'day').toDate()

//       default:
//         return date
//     }
//   }

//   static range = (date: Date) => {
//     let start = date
//     let end = moment(start).add(2, 'day')

//     let current = start
//     let range = []

//     while (moment(current).isSameOrBefore(moment(end), 'day')) {
//       range.push(current)
//       current = moment(current).add(1, 'day').toDate()
//     }

//     return range
//   }

//   render() {
//     let {date} = this.props
//     let range = MyWeek.range(date)

//     return <TimeGrid {...this.props} range={range} eventOffset={15}/>
//     // return <div>{`${range}`}</div>
//   }
// }