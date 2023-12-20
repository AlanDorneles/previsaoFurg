import ReactApexChart from "react-apexcharts";
import { useEffect, useState} from 'react';
import { DataINMET } from '../../services/inmet';
import { titlePressure } from "./options";

export const GraphicPressure = () => {
    const [pressure, setPressure] = useState(null); 
    const [hour, setHour] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
          try {
            const dataMeteorologic = await DataINMET();
            console.log(dataMeteorologic)
            setPressure(dataMeteorologic.pressure);
            setHour(dataMeteorologic.hour)
            console.log(dataMeteorologic.windDirection)
          } catch (error) {
            console.error("Erro ao obter informações do radar:", error);
          }
        };
    
        fetchData();
      }, []);


  const series = [{
    name: 'Series 1',
    data: pressure,
  }];

  const options = {
    ...titlePressure,
    chart: {
      id: 'chart-line',
    },
    grid:{
        show:false
    },
    xaxis: {
      categories: hour,
      type:'string',
      tickAmount:4
    },
    stroke: {
        curve:'smooth'
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};
