import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Columns, Column2 } from './styles/ContainerWithSlider.styled';

export const ContainerWithSlider = ({children}) => {
    return (
        <Columns>
            <Column2>
                <Slider infinite="true" autoplay="true" className="overflow-hidden">
                    <img src="https://www.umr-lastig.fr/img/lastig_1920_EN.png" />
                    <img src="https://www.umr-lastig.fr/img/lastig_crop1.jpeg" />
                    <img src="https://www.umr-lastig.fr/img/Labo_2021_03_18_bis.png" />
                    <img src="https://www.umr-lastig.fr/img/larzac1.png" />
                    <img src="https://www.umr-lastig.fr/img/GautierLobo_covid_2021.png" />
                    <img src="https://www.umr-lastig.fr/img/panop.png" />
                    <img src="https://www.umr-lastig.fr/img/dti3d.jpg" />
                    <img src="https://www.umr-lastig.fr/img/trees.png" />
                </Slider>
            </Column2>
            <Column2>
                {children}
            </Column2>
        </Columns>
    );
};
