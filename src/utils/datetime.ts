import differenceInDays from "date-fns/differenceInDays"
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from "date-fns/differenceInMinutes"
import format from "date-fns/format"
import isThisHour from "date-fns/isThisHour"
import isThisMinute from "date-fns/isThisMinute"
import isThisWeek from "date-fns/isThisWeek"
import isThisYear from "date-fns/isThisYear"
import isToday from "date-fns/isToday"
import isYesterday from "date-fns/isYesterday"
import parseISO from "date-fns/parseISO"

import { Lang } from "~/enums"

const DIFFS = {
  [Lang.zh]: {
    justNow: "剛刚",
    minuteAgo: " 分钟前",
    minutesAgo: " 分钟前",
    hourAgo: " 小时前",
    hoursAgo: " 小时前",
    dayAgo: " 天前",
    daysAgo: " 天前",
  },
  [Lang.en]: {
    justNow: "just now",
    minuteAgo: " minute ago",
    minutesAgo: " minutes ago",
    hourAgo: " hour ago",
    hoursAgo: " hours ago",
    dayAgo: " day ago",
    daysAgo: " days ago",
  },
}

const FORMATS = {
  [Lang.zh]: {
    absoluteToday: "今天 H:mm",
    absoluteYesterday: "昨天 H:mm",
    absoluteThisYear: "M 月 d 日",
    absoluteFull: "yyyy 年 M 月 d 日",
  },
  [Lang.en]: {
    absoluteToday: `'Today' H:mm`,
    absoluteYesterday: `'Yesterday' H:mm`,
    absoluteThisYear: "MM-dd",
    absoluteFull: "yyyy-MM-dd",
  },
}

export const toAbsoluteDateTime = (
  date: Date | string | number,
  lang: Lang
) => {
  if (typeof date === "string") {
    date = parseISO(date)
  }

  if (isToday(date)) {
    return format(date, FORMATS[lang].absoluteToday)
  }

  if (isYesterday(date)) {
    return format(date, FORMATS[lang].absoluteYesterday)
  }

  if (isThisYear(date)) {
    return format(date, FORMATS[lang].absoluteThisYear)
  }

  return format(date, FORMATS[lang].absoluteFull)
}

export const toRelativeDateTime = (
  date: Date | string | number,
  lang: Lang
) => {
  if (typeof date === "string") {
    date = parseISO(date)
  }

  if (isThisMinute(date)) {
    return DIFFS[lang].justNow
  }

  if (isThisHour(date)) {
    const diffMins = differenceInMinutes(new Date(), date) || 1
    return diffMins + DIFFS[lang][diffMins === 1 ? "minuteAgo" : "minuteAgo"]
  }

  if (isToday(date)) {
    const diffHrs = differenceInHours(new Date(), date) || 1
    return diffHrs + DIFFS[lang][diffHrs === 1 ? "hourAgo" : "hoursAgo"]
  }

  if (isThisWeek(date)) {
    const diffDays = differenceInDays(new Date(), date) || 1
    return diffDays + DIFFS[lang][diffDays === 1 ? "dayAgo" : "daysAgo"]
  }

  return toAbsoluteDateTime(date, lang)
}
