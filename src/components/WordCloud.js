import React from "react";
import { StyledWordCloud } from "../components/styles/MemberPage.styled";

export const WordCloud = ({ nodes, keywordAttribute = "keywords_lastig" }) => {
  // console.log("WordCloud nodes = ",nodes);
  if (!nodes) return ;
  const allWords = nodes
    .flatMap((node) => node[keywordAttribute] ? node[keywordAttribute] : [])
    .filter((x) => x.length > 2)
    .filter((x) => x.length < 20)
    .map((x) => x.toLowerCase());
  const counts = {};
  for (const word of allWords) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  const words = Object.entries(counts)
    .map(([k, v], _i) => [{ text: k, value: v }])
    .flat(); //.filter((w)=>w.value>1)
  const minOccurences = Math.min(...Object.entries(counts).map(([_k,v], _i) => v));
  const maxOccurences = Math.max(...Object.entries(counts).map(([_k,v], _i) => v));
  const rotationWeights = [0, 0, 90, 270];
  const resolveRotate = () => {
    return rotationWeights[Math.floor(Math.random() * rotationWeights.length)];
  };
  const minSize = 20;
  const maxSize = 100;
  const resolveFontSize = (word) => {
    const value = word.value;
    return minSize + (value - minOccurences) / (maxOccurences - minOccurences) * (maxSize - minSize);
  }
  return (
    words.length > 0 && (
      <StyledWordCloud
        // options={{
        //   colors: [
        //     "#1f77b4",
        //     "#ff7f0e",
        //     "#2ca02c",
        //     "#d62728",
        //     "#9467bd",
        //     "#8c564b",
        //   ],
        //   deterministic: false,
        //   fontFamily: "impact",
        //   fontSizes: [20, 100],
        //   fontStyle: "normal",
        //   fontWeight: "normal",
        //   padding: 1,
        //   rotations: 2,
        //   rotationAngles: [-90, 0],
        //   scale: "log",
        //   spiral: "archimedean",
        //   transitionDuration: 0,
        // }}
        //size={[548, 400]}
        words={words}
        width={1200} height={400}
        enableTooltip
        fontSize={resolveFontSize}
        rotate={resolveRotate}
        spiral = "archimedean"
      />
    )
  );
};
