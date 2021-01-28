import { LoadingIcon } from "../ui/LoadingIcon/LoadingIcon"
import { memo } from "react"

import "./SiteSection.css"

type Props = {
  children: React.ReactNode
  title: string
  scrollable?: boolean
  loading?: boolean
}

export const SiteSection = memo((props: Props) => {
  console.log("Site Section Rendered: ", props.title)
  let sectionStyle = "section-block"
  if (props.scrollable) {
    sectionStyle += " block-scrollable"
  }
  return (
    <section className="section">
      <div className="section-title">{props.title}</div>
      {props.loading ? (
        <LoadingIcon />
      ) : (
        <div className={sectionStyle}>{props.children}</div>
      )}
    </section>
  )
})
