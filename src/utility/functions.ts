export const truncate = (hashString: string) => {
  if (hashString.length > 24) {
    return (
      hashString.substring(0, 8) +
      "..." +
      hashString.slice(hashString.length - 4)
    )
  }
  return hashString
}
