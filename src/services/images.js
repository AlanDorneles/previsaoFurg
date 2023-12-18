import { apiKey } from "../constants/constants";

export const getImages = async () => {
  const listImage = []; // array de urls
  const hoursSetting = localStorage.getItem("hourScope"); //escopo de horas selecionado pelo usuário
  try {
    const currentHour = new Date().getHours() + 3;
    const actualDay = new Date().getDate();
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth() + 1;
    let initialHour = currentHour - hoursSetting; // hora inicial

    if (initialHour > 0) {
      console.log("hora inicial maior que 0");
      if (currentHour > 23) {
        console.log("hora de agora maior que 23", currentHour);
        console.log("hora inicial ", currentHour - hoursSetting);

        for (let h = currentHour - hoursSetting; h <= 23; h++) {
          //percorre da hora inicial até a hora atual
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKey}&data=${actualYear}${actualMonth}${actualDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();

          const morroDaIgreja = data.data.radar[0].find((item) => item.id === 16);
          const cangucu = data.data.radar[0].find((item) => item.id === 8);
          if (morroDaIgreja && cangucu) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
            });
          }
        }

        const nextDay = actualDay + 1;
        const newHour = currentHour - 23;
        console.log("hora final", newHour);
        for (let h = 0; h <= newHour; h++) {
          //percorre da hora inicial até a hora atual
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKey}&data=${actualYear}${actualMonth}${nextDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();
          const morroDaIgreja = data.data.radar[0].find((item) => item.id === 16);
          const cangucu = data.data.radar[0].find((item) => item.id === 8);
          if (morroDaIgreja && cangucu) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
            });
          }
        }
      } //se a hora inicial for maior que 0 isso signifca que o escopo é do mesmo dia
      else {
        for (let h = initialHour; h <= currentHour; h++) {

          //percorre da hora inicial até a hora atual
          const response = await fetch(
            `https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKey}&data=${actualYear}${actualMonth}${actualDay}${h}`
          );
          if (!response.ok) {
            throw new Error("Não foi possível obter dados do radar");
          }
          const data = await response.json();
          const morroDaIgreja = data.data.radar[0].find((item) => item.id === 16);
          const cangucu = data.data.radar[0].find((item) => item.id === 8);
          if (morroDaIgreja && cangucu) {
            listImage.push({
              // coloca o objeto com as url's de imagem de radar em listImage
              morroDaIgreja: morroDaIgreja.path,
              cangucu: cangucu.path,
            });
          }
          console.log(morroDaIgreja.path)
        }
      }
    }

    if (initialHour < 0) {
      // se a hora inicial for menor que 0 significa que o escopo pegará horas do dia anterior
      const previousDay = actualDay - 1; //Dia anterior
      initialHour = 24 - initialHour; // Hora inicial do dia anterior

      //LOOP DE IMAGENS DO DIA ANTERIOR
      for (let h = initialHour; h <= 23; h++) {
        //percorre o loop até a ultima hora do dia anterior
        const response = await fetch(
          `https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKey}&data=${actualYear}${actualMonth}${previousDay}${h}`
        );
        if (!response.ok) {
          throw new Error("Não foi possível obter dados do radar");
        }
        const data = await response.json();
        const morroDaIgreja = data.data.radar[0].find((item) => item.id === 16);
        const cangucu = data.data.radar[0].find((item) => item.id === 8);
        if (morroDaIgreja && cangucu) {
          listImage.push({
            morroDaIgreja: morroDaIgreja.path,
            cangucu: cangucu.path,
          });
        }
      }

      //LOOP DAS IMAGENS DO DIA ATUAL
      for (let h = 0; h <= currentHour; h++) {
        //percorre o loop até a ultima imagem do dia atual
        const response = await fetch(
          `https://api-redemet.decea.mil.br/produtos/radar/maxcappi?api_key=${apiKey}&data=${actualYear}${actualMonth}${actualDay}${h}`
        );
        if (!response.ok) {
          throw new Error("Não foi possível obter dados do radar");
        }
        const data = await response.json();
        const morroDaIgreja = data.data.radar[0].find((item) => item.id === 16);
        const cangucu = data.data.radar[0].find((item) => item.id === 8);
        if (morroDaIgreja && cangucu) {
          listImage.push({
            morroDaIgreja: morroDaIgreja.path,
            cangucu: cangucu.path,
          });
        }
      }
    }

    console.log(listImage);
    return listImage;
  } catch (error) {
    console.error("Erro ao obter os dados do radar:", error);
    throw error;
  }
};
