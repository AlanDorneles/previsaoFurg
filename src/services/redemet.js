import { apiKeyRedeMet} from "../constants/constants"



export const getRadarInformation = async () => {
    try {
      let actualHour = new Date().getHours() + 3;
      let actualDay = new Date().getDate()
      const actualMonth = new Date().getMonth() + 1
      const actualYear = new Date().getFullYear()

      if(actualHour > 23){
        actualHour = actualHour - 24
        actualDay = actualDay + 1
      }
      const response = await fetch(`https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKeyRedeMet}&data=${actualYear}${actualMonth}${actualDay}${actualHour}`);
      if (!response.ok) {
        throw new Error('Não foi possível obter dados do radar');
      }
      const data = await response.json();
      const morroDaIgreja = data.data.radar[0].find(item => item.id === 16);
      const cangucu = data.data.radar[0].find(item => item.id === 8)
      const santiago = data.data.radar[0].find( item=> item.id === 34)

      console.log(santiago)
      
    return {cangucu,morroDaIgreja, santiago}
    
    } catch (error) {
      console.error('Erro ao obter os dados do radar:', error);
      throw error;
    }
  };