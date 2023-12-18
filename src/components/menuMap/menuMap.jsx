import { useState } from "react";
import { useHourScope } from "../../contexts/hourAnimation";
import styles from './menuMap.module.css'
import { buttonStyle } from "../../constants/constants";



export const MenuMap =  () => {
  const { getHourScope, handleSelectChange } = useHourScope();
  const actualHour = new Date().getHours();
  const [initHour, setInitHour] = useState();
  const [clickedButtonId, setClickedButtonId] = useState();

  const handleChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    handleSelectChange(selectedValue);
    const initIndex = actualHour - selectedValue;
    if (initIndex < 0) {
      initIndex * -1;
      setInitHour(initIndex);
    }

    setInitHour(initIndex);
    selectIndex(0)

  };
  
  const selectIndex = (imageId ) => {
    localStorage.setItem("imageId", imageId)
    setClickedButtonId(imageId);
  }
  

  
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
              const hour = index + initHour+1;
              const isClicked = clickedButtonId === index;
              return (
            <>
                <button className="button" onClick={() => selectIndex(index) } id={index} style={{ ...(isClicked && buttonStyle) }}>
                  {hour < 0 ? `${(-24 - hour) * -1}:00 Dia Ant.` : `${hour}:00`}
                </button> 
            </>
              );
              
            })} 
               
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
