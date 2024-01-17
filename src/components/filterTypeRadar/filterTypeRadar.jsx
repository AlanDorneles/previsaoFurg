import styles from "./filterTypeRadar.module.css";
import { useState } from "react";
import { useStationsVisible } from "../../contexts/radarFilter";
import { useFilterTypeRadarContext } from "../../contexts/typeRadar";

export const FilterTypeRadar = () => {
  const [selectedOption, setSelectedOption] = useState('maxcappi');
  const [isChecked, setIsChecked] = useState(false);
  const { setStationsVisible } = useStationsVisible();
  const {handleTypeRadar} = useFilterTypeRadarContext()

  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    console.log(value)
    handleTypeRadar(value)
  };

  const handleCheckBoxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setStationsVisible(isChecked);
    
  };
  return (
    <>
      <div className={styles.container}>
        <h6 className="title is-6" >
          Tipo de Radar
        </h6>
        <div className={`control ${styles.control}`}>
        <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="maxcappi"
              checked={selectedOption === "maxcappi"}
              onChange={handleRadioButtonChange}
            />
            maxcappi
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="10km"
              checked={selectedOption === "10km"}
              onChange={handleRadioButtonChange}
            />
            10km
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="07km"
              checked={selectedOption === "07km"}
              onChange={handleRadioButtonChange}
            />
            07km
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="05km"
              checked={selectedOption === "05km"}
              onChange={handleRadioButtonChange}
            />
            05km
          </label>
          <label className="radio">
            <input
              name="typeRadio"
              type="radio"
              value="03km"
              checked={selectedOption === "03km"}
              onChange={handleRadioButtonChange}
            />
            03km
          </label>
          <h6 className="title is-6" >
          Estações
        </h6>
        <label className="checkbox">
          <input type="checkbox" checked={isChecked}
          onChange={handleCheckBoxChange} />
            Mostrar estações
        </label>

        </div>
      </div>
    </>
  );
};
