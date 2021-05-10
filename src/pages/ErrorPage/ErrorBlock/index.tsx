import { useLocation } from "react-router-dom"

import ErrorMessage from "../ErrorMessage"

const ErrorBlock = () => {
  const query = new URLSearchParams(useLocation().search)
  switch (query.get("type")) {
    case "invalid_search":
      return (
        <ErrorMessage
          code="404"
          title="Invalid Search"
          subtitle="Search Terms: "
          terms={query.get("terms")}
          message="Your search returned no results."
        />
      )
    case "bad_block":
      return (
        <ErrorMessage
          code="404"
          title="Bad Block"
          subtitle="Search Terms: "
          terms={query.get("terms")}
          message="No block with that number exists."
        />
      )
    case "bad_transaction":
      return (
        <ErrorMessage
          code="404"
          title="Bad Transaction"
          subtitle="Search Terms: "
          terms={query.get("terms")}
          message="No transaction with that hash exists."
        />
      )
    case "no_response":
      return (
        <ErrorMessage
          code="400"
          title="No Response"
          subtitle="No response from: "
          terms={query.get("terms")}
          message="The server did not respond."
        />
      )
    case "no_wallet_hash":
      return (
        <ErrorMessage
          code="404"
          title="Page Doesn't Exist"
          subtitle="Invalid wallet address:"
          terms=""
          message="No wallet address found."
        />
      )
    default:
      return (
        <ErrorMessage
          code="404"
          title="Error"
          subtitle="An"
          terms="Error"
          message="An error occurred."
        />
      )
  }
}

export default ErrorBlock
