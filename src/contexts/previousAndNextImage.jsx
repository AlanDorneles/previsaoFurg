import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'

const PreviousAndNextImage = createContext();

export const PreviousAndNextImageProvider = ({ children }) => {

    const[indexImage, setIndexImage] = useState(0)
    const hourScope = JSON.parse(localStorage.getItem('hourScope'))

    const handleNextImage =  (index) => {
        localStorage.setItem('imageId', index)
        console.log('count', index)
        setIndexImage(index)

        console.log('count +1',JSON.parse(localStorage.getItem('imageId')))
        if(indexImage > hourScope){
            setIndexImage(0)
        }
        console.log('Escopo',hourScope)

    }

    const handlePreviousImage = (index) => {
        if (indexImage <= 0) {
            setIndexImage(hourScope);
            console.log('Setting to hourScope - 1', indexImage);
        } else {
            setIndexImage(index - 1);
            console.log('Decrementing indexImage by 1', indexImage - 1);
        }
    };

    const setClickHoursIndexImage = (index) => {
        setIndexImage(index)

    }
    const imageCount = {
        indexImage,handleNextImage, handlePreviousImage, setClickHoursIndexImage
    }

    console.log(indexImage)

    return (
        <PreviousAndNextImage.Provider value={imageCount}>
          {children}
        </PreviousAndNextImage.Provider>
      );


}

export const UsePreviousAndNextImage = () => {
    return useContext(PreviousAndNextImage );
  };
PreviousAndNextImageProvider.propTypes = {
    children: PropTypes.node,

  }