import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WordCloud } from "./WordCloud";
import lastig_1920_EN from "../images/lastig_1920_EN.png";
import lastig_crop1 from "../images/lastig_crop1.jpeg";
import Labo_2021_03_18_bis from "../images/Labo_2021_03_18_bis.png";
import larzac1 from "../images/larzac1.png";
import GautierLobo_covid_2021 from "../images/GautierLobo_covid_2021.png";
import panop from "../images/panop.png";
import dti3d from "../images/dti3d.jpg";
import trees from "../images/trees.png";

export const ContainerWithSliderAndWordCloud = ({ nodes, children }) => {
  debugger;
  return (
    <Slider infinite="true" autoplay="true" className="overflow-hidden">
      <img src={lastig_1920_EN} alt="lastig_1920_EN" />
      <img src={lastig_crop1} alt="lastig_crop1" />
      <img src={Labo_2021_03_18_bis} alt="Labo_2021_03_18_bis" />
      <img src={larzac1} alt="larzac1" />
      <img src={GautierLobo_covid_2021} alt="GautierLobo_covid_2021" />
      <img src={panop} alt="panop" />
      <img src={dti3d} alt="dti3d" />
      <img src={trees} alt="trees" />
      <WordCloud nodes={nodes} />
    </Slider>
  );
};
