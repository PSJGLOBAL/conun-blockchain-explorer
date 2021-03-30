export const truncate = (
  input: string | number | null,
  truncation: number = 0
) => {
  if (!input) {
    return ""
  }
  const hashString = input.toString()

  if (hashString.length > 24) {
    let limit = 5

    if (truncation < 0) {
      return hashString
    }

    if (truncation > 0) {
      limit = truncation
    }

    return (
      hashString.substring(0, limit) +
      "..." +
      hashString.substring(hashString.length - 5)
    )
  }
  return hashString
}

let willLog = false
if (process.env.NODE_ENV !== "production") {
  willLog = true
}

export const logger = (message: string, level: string, ...data: any[]) => {
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
    case "coin":
    case "token":
    case "mycoin":
    case "conToken":
    case "conun":
    case "conos":
      return "coin"

    case "ConunDrive":
    case "drive_1":
    case "drive":
      return "drive"

    case undefined:
    default:
      return "basic"
  }
}
