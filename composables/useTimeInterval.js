import moment from "moment";

export default function useTimeInterval() {
  const timeInterval = (start, end) => {
    const timeStart = moment(start, "HH:mm");
    const timeEnd = moment(end, "HH:mm");

    const interval = [];

    let currentTime = moment(timeStart);

    while (currentTime.isSameOrBefore(timeEnd)) {
      interval.push(currentTime.format("HH:mm"));
      currentTime.add(30, "minutes");
    }

    return interval;
  };

  return { timeInterval };
}
