import ReactApexChart from "react-apexcharts";
import { useEffect, useState} from 'react';
import { DataINMETAPI } from '../../services/inmet';
import { titlePressure } from "./options";
import { useCodeStation } from "../../contexts/codeStation";

export const GraphicPressure = () => {
    const [pressure, setPressure] = useState(null); 
    const [hour, setHour] = useState(null);
    const {codeStation} = useCodeStation()
    const storageCodeStation = localStorage.getItem('codeStation')
    const [trigger,setTrigger] = useState(false)

    useEffect(() => {
      if (codeStation !== storageCodeStation) {
        setTrigger(prevTrigger => !prevTrigger);
      }
    }, [codeStation, storageCodeStation]);


    useEffect(() => {
        const fetchData = async() => {
          try {
            const dataMeteorologic = await DataINMETAPI();
            
            
            console.log(dataMeteorologic[0].pressure)
            setPressure(dataMeteorologic[0].pressure);
            setHour(dataMeteorologic[0].hour)
            console.log(dataMeteorologic.windDirection)
            console.log(pressure)
            console.log('hora',hour)
          } catch (error) {
            console.error("Erro ao obter informações do radar:", error);
          }
        };
    
        fetchData();
      }, [trigger]);


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
      <ReactApexChart options={options} series={series} type="line"  />
    </div>
  );
};
