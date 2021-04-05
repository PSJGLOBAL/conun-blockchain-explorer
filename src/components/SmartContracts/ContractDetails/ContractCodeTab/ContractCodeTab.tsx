// import Gist from "react-gist"
import ReactEmbedGist from "react-embed-gist"

import style from "./ContractCodeTab.module.css"

const ContractCodeTab = () => {
  // Use GIST to get code, embed it in the page here.
  const gistID = "Aziiiz/64e1d17da3cc8ec2af55ba056d136603"

  return (
    <div className={style.block}>
      <ReactEmbedGist
        gist={gistID}
        wrapperClass={style.gist}
        contentClass={style.sectio}
      />
    </div>
  )
}

export default ContractCodeTab
