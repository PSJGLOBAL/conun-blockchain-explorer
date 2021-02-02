import { LoadingIcon } from "../ui/LoadingIcon/LoadingIcon"

import "./SiteSection.css"

type Props = {
  children: React.ReactNode
  title: string
  scrollable?: boolean
  loading?: boolean
}

export const SiteSection = (props: Props) => {
  console.log("Site Section Rendered: ", props.title)
  let sectionStyle = "section-block"
  if (props.scrollable) {
    sectionStyle += " block-scrollable"
  }
  return (
    <section className="section">
      {props.loading ? (
        <LoadingIcon />
      ) : (
        <div className={sectionStyle}>{props.children}</div>
      )}
    </section>
  )
}
