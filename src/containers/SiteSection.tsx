import "./SiteSection.css"

type Props = {
  children: React.ReactNode
  title: string
  scrollable?: boolean
  loading?: boolean
}

export const SiteSection = (props: Props) => {
  let sectionStyle = "section-block"
  if (props.scrollable) {
    sectionStyle += "-scrollable"
  }
  return (
    <section className="section">
      <div className="section-title">{props.title}</div>
      {props.loading ? (
        <div className="loading-block">Loading Data</div>
      ) : (
        <div className={sectionStyle}>{props.children}</div>
      )}
    </section>
  )
}
