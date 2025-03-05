import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Columns, Column2 } from "./styles/ContainerWithSlider.styled";
import { WordCloud } from "./WordCloud";

export const ContainerWithSliderAndWordCloud = ({ nodes, children }) => {
  debugger;
  return (
    <Slider infinite="true" autoplay="true" className="overflow-hidden">
      <img src="https://www.umr-lastig.fr/img/lastig_1920_EN.png" alt="" />
      <img src="https://www.umr-lastig.fr/img/lastig_crop1.jpeg" alt="" />
      <img src="https://www.umr-lastig.fr/img/Labo_2021_03_18_bis.png" alt="" />
      <img src="https://www.umr-lastig.fr/img/larzac1.png" alt="" />
      <img
        src="https://www.umr-lastig.fr/img/GautierLobo_covid_2021.png"
        alt=""
      />
      <img src="https://www.umr-lastig.fr/img/panop.png" alt="" />
      <img src="https://www.umr-lastig.fr/img/dti3d.jpg" alt="" />
      <img src="https://www.umr-lastig.fr/img/trees.png" alt="" />
      <WordCloud nodes={nodes} />
    </Slider>
  );
};
