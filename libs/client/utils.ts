import moment from "moment";

export function setClassName(...classnames: string[]) {
  return classnames.join(" ");
}

export function formatTime(date: Date) {
  const nowDate = moment();
  const dayDiff = moment(nowDate).diff(date, "days");
  const hourDiff = moment(nowDate).diff(date, "hours");
  if (dayDiff <= 0) {
    if (hourDiff <= 0) {
      return moment(nowDate).diff(date, "minutes") + "분 전";
    }
    return hourDiff + "시간 전";
  } else return dayDiff + "일 전";
}
