import { useState } from "react";
import { useHourScope } from "../../contexts/hourAnimation";
import styles from "./menuMap.module.css";
import { buttonStyle } from "../../constants/constants";
import PropTypes from "prop-types";
import { UseRadarIsChecked } from "../../contexts/radarIsChecked";
import { UsePreviousAndNextImage } from "../../contexts/previousAndNextImage";

export const MenuMap = ({ selectImage }) => {
  const { getHourScope, handleSelectChange } = useHourScope();
  const actualHour = new Date().getHours();
  const [initHour, setInitHour] = useState(6);
  const [clickedButtonId, setClickedButtonId] = useState();
  const {handleCangucuChange, handleMorroDaIgrejaChange,handleSantiagoChange, cangucuChecked,morroDaIgrejaChecked,santiagoChecked} = UseRadarIsChecked()
  const {setClickHoursIndexImage,indexImage}= UsePreviousAndNextImage()

  const handleChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    handleSelectChange(selectedValue);
    const initIndex = actualHour - selectedValue;
    
    if (initIndex < 0) {
      initIndex * -1;
      setInitHour(initIndex);
    }

    setInitHour(initIndex);
    selectIndex(0);
  };
  const selectIndex = (index) => {
    setClickHoursIndexImage(index)
    selectImage();
    console.log('indice da imagem MenuMap',indexImage)
    setClickedButtonId(indexImage);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerSelect}>
          <p>Horas</p>
          <div className="select is-primary">
            <select
              id="selectAnimation"
              onChange={handleChange}
              value={getHourScope}
            >
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={18}>18 horas</option>
              <option value={24}>24 horas</option>
            </select>
          </div>
        </div>
        <div className={styles.containerButtonHours}>
          <p>Mapa de horas</p>

          <div style={{ display: "flex" }}>
            <div className="buttons" id="buttons">
              {Array.from({ length: actualHour - initHour }, (_, index) => {
                const hour = index + initHour + 1;
                const isClicked = clickedButtonId === index;
                return (
                  <>
                    <button
                      className="button"
                      onClick={() => {
                        selectIndex(index);
                      }}
                      id={index}
                      style={{ ...(isClicked && buttonStyle) }}
                    >
                      {hour < 0
                        ? `${(-24 - hour) * -1}:00 Dia Ant.`
                        : `${hour}:00`}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.containerRadar}>
          <p className={styles.title}>Radares</p>
          <label className="checkbox">
            <input type="checkbox" checked={cangucuChecked}
            onChange={(event) => handleCangucuChange(event.target.checked)}/>
            Canguçu - RS
          </label>
          <label className="checkbox">
            <input type="checkbox"  checked={morroDaIgrejaChecked}
            onChange={(event) => handleMorroDaIgrejaChange(event.target.checked)} />
            Morro da Igreja - SC
          </label>
          <label className="checkbox">
            <input type="checkbox"  checked={santiagoChecked}
            onChange={(event) => handleSantiagoChange(event.target.checked)} />
            Santiago - RS
          </label>
        </div>
      </div>
    </>
  );
};
MenuMap.propTypes = {
  selectImage: PropTypes.func,
};
