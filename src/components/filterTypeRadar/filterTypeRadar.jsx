import styles from "./filterTypeRadar.module.css";

export const FilterTypeRadar = () => {
  return (
    <>
      <div className={styles.container}>
        <h6 className="title is-6" >
          Tipo de Radar
        </h6>
        <div className={`control ${styles.control}`}>
          <label className="radio">
            <input name='typeRadio' type="radio" />
            maxcappi
          </label>
          <label className="radio">
            <input name='typeRadio' type="radio" />
            10km
          </label>
          <label className="radio">
            <input name='typeRadio' type="radio" />
            07km
          </label>
          <label className="radio">
            <input name='typeRadio' type="radio" />
            05km
          </label>
          <label className="radio">
            <input name='typeRadio' type="radio" />
            03km
          </label>
        </div>
      </div>
    </>
  );
};
