const formatDate = (timestamp: string) => {
  let stringDate = new Date(timestamp).toLocaleString('en-us', {
    month: "short",
    day: "2-digit",
    hour: "numeric", minute: "numeric"
  });
  return stringDate
}

export {formatDate}