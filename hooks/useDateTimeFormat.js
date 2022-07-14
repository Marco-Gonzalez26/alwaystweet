const isSuportedIntl = typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (timestamp, { language = "es" } = {}) => {
  const date = new Date(timestamp)

  if (!isSuportedIntl) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    }

    return date.toLocaleDateString(language, options)
  }
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }

  return new Intl.DateTimeFormat("es", options).format(date)
}
export default function useDateFormat(timestamp) {
  return formatDate(timestamp, { language: "es" })
}
