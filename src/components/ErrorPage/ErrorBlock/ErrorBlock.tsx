import { useLocation } from "react-router-dom"

import ErrorMessage from "../ErrorMessage/ErrorMessage"

import "./ErrorBlock.css"

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
