import { useState,useEffect } from "react";
import styles from "./MenuSatelite.module.css";
import PropTypes from "prop-types";

export const MenuSatelite = ({ selectedOption, onOptionChange, getDate }) => {
  const [hourUTC, setHourUTC] = useState("");
  const handleRadioButtonChange = (event) => {
    const { value } = event.target;
    onOptionChange(value);
    console.log(value);
  };
  console.log(getDate)
  useEffect(() => {
    const date = getDate.indexOf(getDate.slice(11, 13));
    const hour = parseInt(getDate.slice(11, 13));
    const dateUTC = getDate;

    if (date !== -1) {
      const before = dateUTC.slice(0, 11);
      const after = dateUTC.slice(14);
      const newDate= before + (hour - 3) + ":" + after;

      const brazilFormatDate = new Date(newDate);
      const day = String(brazilFormatDate.getDate()).padStart(2, '0');
      const mounth = String(brazilFormatDate.getMonth() + 1).padStart(2, '0'); 
      const year = brazilFormatDate.getFullYear();
      const hours = String(brazilFormatDate.getHours()).padStart(2, '0');
      const minutes = String(brazilFormatDate.getMinutes()).padStart(2, '0');
      const seconds = String(brazilFormatDate.getSeconds()).padStart(2, '0');

      const formattedData = `${day}/${mounth}/${year} ${hours}:${minutes}:${seconds}`;
      setHourUTC(formattedData);

    } else {
      console.log("Substring não encontrada na string.");
    }
  }, [getDate]);

  return (
    <div className={styles.container}>
      <div className="control">
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"realçada"}
              checked={selectedOption === "realçada"}
              onChange={handleRadioButtonChange}
            />
            INFRA-VERMELHO REALÇADA
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"ir"}
              checked={selectedOption === "ir"}
              onChange={handleRadioButtonChange}
            />
            INFRA-VERMELHO
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input
              type="radio"
              name="answer"
              value={"vis"}
              checked={selectedOption === "vis"}
              onChange={handleRadioButtonChange}
            />
            VISÍVEL
          </label>
        </div>
      </div>
      <div>
        <p>Data da imagem</p>
        {hourUTC}
        </div>
      {/*<div className="control">
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'AS'} checked
             
            />
            AMERICA DO SUL
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'BR'}  />
            BRASIL
          </label>
        </div>
        <div className={styles.containerOption}>
          <label className="radio">
            <input type="radio" name="answer" value={'S'}   />
            SUL
          </label>
        </div>
  </div>*/}
    </div>
  );
};
MenuSatelite.propTypes = {
  selectedOption: PropTypes.string,
  onOptionChange: PropTypes.func,
  getDate: PropTypes.any,
};
