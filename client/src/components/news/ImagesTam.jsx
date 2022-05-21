import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { useStylesImageGalery } from './styles';
import ReactImageMagnify from 'react-image-magnify';

const ImagesTam = ( {images} ) => {
    console.log(images);
    const styles = useStylesImageGalery();
    const [ biggerImage, setBiggerImage ] = useState(images);


    return (
        <Container className={styles.imageContainer} >
            <Container className={styles.thumbContainer} >
                
                    <Container key={images} className={styles.image} onClick={() => setBiggerImage(images)} >
                        <img className={styles.img} src={images} alt={images} />
                    </Container>
            </Container>
            <ReactImageMagnify {...{
                        smallImage: {
                            src: biggerImage,
                            alt: 'biggerImage',
                            isFluidWidth: true,
                        },
                        largeImage: {
                            src: biggerImage,
                            width: 1200,
                            height: 1800
                        },
                        enlargedImageContainerStyle: {zIndex: 10000},
                        enlargedImageContainerDimensions: {
                            width: '125%',
                            height: '100%'
                        },
                        enlargedImagePosition: 'over',
                    }} 
            />
        </Container>
    );
};

export default ImagesTam;
