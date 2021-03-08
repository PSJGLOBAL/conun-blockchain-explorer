export const truncate = (hashString: string, truncation: number = 0) => {
  if (hashString.length > 24) {
    let limit = 7

    if (truncation < 0) {
      return hashString
    }

    if (truncation > 0) {
      limit = truncation
    }

    return hashString.substring(0, limit) + "..."
  }
  return hashString
}
