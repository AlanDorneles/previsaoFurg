import { useState } from "react";
import { GraphicPressure} from "../components/chart/chartPressure.jsx";
import { GraphicWindSpeed} from "../components/chart/chartWindSpeed.jsx";
import { CardPressure } from "../components/card/CardPressure.jsx";
import { CardWind } from "../components/card/CardWind.jsx";
import { Tabs } from "../components/tabs/tabs.jsx";

export default function Clima(){
const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
    return(
        <>
        
        <Tabs activeTab={activeTab} onClick={handleTabClick} />

        {activeTab === 0 ? <p>CLIMA</p> :
        (
            <>
          
            <div style={{display:"flex"}}>
              <div style={{width:"70%"}}>
                <GraphicPressure />
              </div>
              <div style={{width:"30%"}}>
                <CardPressure/>
              </div>
            </div>
            <div style={{display:"flex"}}>
              <div style={{width:"70%"}}>
              <GraphicWindSpeed/>
              </div>
              <div style={{width:"30%"}}>
                <CardWind/>
              </div>
            </div>
            
           
            </>
          )}
        </>
    )
}