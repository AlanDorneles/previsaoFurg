import { apiNOAAKey} from "../constants/constants";
export const openWeather = async () => {
    const response = await fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/locations/?locationcategoryid=ST&limit=52`,{
      headers: {
        'token':apiNOAAKey
      }
    });
      if (!response.ok) {
        throw new Error('Não foi possível obter dados do radar');
      }
      const data = await response.json();
      console.log(data)
      return data

    }
