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
    if (degree > 0 && degree < 45) {
        return "NORTE";
    } else if (degree >= 45 && degree < 90) {
        return "NORDESTE";
    } else if (degree >= 90 && degree < 135) {
        return "LESTE";
    } else if (degree >= 135 && degree < 180) {
        return "SUDESTE";
    } else if (degree >= 180 && degree < 225) {
        return "SUL";
    } else if (degree >= 225 && degree < 270) {
        return "SUDOESTE";
    } else if (degree >= 270 && degree < 315) {
        return "OESTE";
    } else if (degree >= 315 && degree < 360) {
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