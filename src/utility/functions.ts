export const truncate = (hashString: string, tight: boolean = false) => {
  if (hashString.length > 24) {
    let limit = 5
    if (tight) {
      limit = 3
    }

    return (
      hashString.substring(0, limit) +
      "..." +
      hashString.slice(hashString.length - 4)
    )
  }
  return hashString
}
