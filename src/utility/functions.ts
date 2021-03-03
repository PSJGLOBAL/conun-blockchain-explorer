export const truncate = (hashString: string, truncation: number = 0) => {
  if (hashString.length > 24) {
    let limit = 6
    if (truncation > 0) {
      limit = truncation
    }

    return (
      hashString.substring(0, limit) +
      "..." +
      hashString.slice(hashString.length - 4)
    )
  }
  return hashString
}
