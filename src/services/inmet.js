import { apiINMETKey } from "../constants/constants";
import { formattedDataInit, formattedDataFinal } from "../utils/formattedData";


export const DataINMET = async () => {
  const response = await fetch(
    `https://apitempo.inmet.gov.br/token/estacao/${formattedDataInit}/${formattedDataFinal}/A802/${apiINMETKey}`
  );
  if (!response.ok) {
    throw new Error("Não foi possível obter dados do inmet");
  }
  const data = await response.json();

  const windDegreesToDirection = (degree) => {
     let degreeNumber = Number(degree.VEN_DIR)
     console.log(degreeNumber)
    if (degreeNumber > 0 && degreeNumber < 45) {
        return "NORTE";
    } else if (degreeNumber >= 45 && degreeNumber < 90) {
        return "NORDESTE";
    } else if (degreeNumber >= 90 && degreeNumber < 135) {
        return "LESTE";
    } else if (degreeNumber >= 135 && degreeNumber < 180) {
        return "SUDESTE";
    } else if (degreeNumber >= 180 && degreeNumber < 225) {
        return "SUL";
    } else if (degreeNumber >= 225 && degreeNumber < 270) {
        return "SUDOESTE";
    } else if (degreeNumber >= 270 && degreeNumber < 315) {
        return "OESTE";
    } else if (degreeNumber >= 315 && degreeNumber < 360) {
        return "NOROESTE";
    } else {
        return "NORTE"; // Caso o valor seja 360 graus (o equivalente a 0 graus)
    }
};

  const filteredData = data.filter(item => item !== null && item.PRE_INS !== null);
  const pressure = filteredData
  .map(item => item.PRE_INS);

  const hour = filteredData
  .map(item => `${item.HR_MEDICAO.slice(0,2)}:${item.HR_MEDICAO.slice(2,4)}`)

  const windDireciton  = filteredData.map(item => windDegreesToDirection(item))
  const windSpeed = filteredData.map(item => item.VEN_VEL)


  return {pressure, hour, windDireciton, windSpeed};
};