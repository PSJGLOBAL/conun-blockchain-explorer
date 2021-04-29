export const truncate = (
  input: string | number | null,
  truncation: number = 0,
  skipEnd: boolean = false
) => {
  if (!input) {
    return ""
  }
  const hashString = input.toString()

  // Eject if hashstring is already short enough
  if (hashString.length < truncation) {
    return hashString
  }

  // If truncation is 0, ignore truncation (allows truncation cancelling)
  if (truncation < 0) {
    return hashString
  }
  // Controls whether double-ended truncation occurs or not
  if (skipEnd) {
    return hashString.substring(0, truncation) + "..."
  } else {
    return (
      hashString.substring(0, truncation) +
      "..." +
      hashString.substring(hashString.length - truncation)
    )
  }
}

let willLog = false
if (process.env.NODE_ENV !== "production") {
  willLog = true
}

type logType =
  | "info"
  | "success"
  | "get"
  | "warn"
  | "error"
  | "special"
  | "log"
  | string
export const logger = (message: string, level: logType, ...data: any[]) => {
  if (willLog) {
    switch (level) {
      case "info":
        console.log(`%c${message}`, "color:DodgerBlue;", ...data)
        break

      case "success":
        console.log(`%c${message}`, "color:MediumSeaGreen;", ...data)
        break

      case "get":
        console.log(`%c${message}`, "color:Teal;", ...data)
        break

      case "warn":
        console.warn(message, ...data)
        break

      case "error":
        console.error(message, ...data)
        break

      case "special":
        console.log(`%c${message}`, "color:BlueViolet;", ...data)
        break

      case "log":
      default:
        console.log(message, ...data)
        break
    }
  }
}

export const getContractType = (serviceType: string | undefined) => {
  switch (serviceType) {
    case "CONX":
      return "coin"

    case "DRIVE":
      return "drive"

    case "ENGINE":
      return "engine"

    default:
      return "basic"
  }
}

export const multiclass = (...args: Array<string>) => {
  return args.join(" ")
}
