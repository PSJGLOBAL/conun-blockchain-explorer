import { ReactElement } from "react"

type Props = {
  howMany: number
  children: ReactElement
}

const DuplicateSkeleton = (props: Props) => {
  const payload = []
  for (let i = 0; i < props.howMany; i++) {
    payload.push(props.children)
  }
  return <>{payload}</>
}

export default DuplicateSkeleton
