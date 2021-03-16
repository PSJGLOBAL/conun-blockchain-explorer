import { useState } from "react"

import TabMenu from "../TabMenu/TabMenu"

const ContractTextBlock = () => {
  const [activeTab, setActiveTab] = useState<string>("description")

  return (
    <section className="contract-description-container">
      <TabMenu doChangeTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "description" ? (
        <div className="contract-description-tab">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
          voluptatum in aspernatur, ducimus sunt enim molestias perspiciatis
          nihil impedit odit suscipit ex dolorum! Laudantium quaerat dicta,
          tempore deserunt qui labore. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Et autem doloribus consectetur? Dolore delectus,
          repudiandae vitae magnam, quasi autem corporis neque atque, ratione
          quas error. Alias saepe rerum ad ab.
        </div>
      ) : (
        <div className="contract-description-tab monofont">CODE TIME FOOLS</div>
      )}
    </section>
  )
}

export default ContractTextBlock
