import React from "react";
import { StyledWordCloud } from "../components/styles/MemberPage.styled";

export const WordCloud = ({ nodes }) => {
  const allWords = nodes
    .flatMap((node) =>
      node.keywords_lastig
        ? node.keywords_lastig /*.flatMap((k) => k.split(" "))*/
        : [],
    )
    .filter((x) => x)
    .filter((x) => x.length > 2)
    .map((x) => x.toLowerCase());
  const counts = {};
  for (const word of allWords) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  const words = Object.entries(counts)
    .map(([k, v], _i) => [{ text: k, value: v }])
    .flat(); //.filter((w)=>w.value>1)
  return (
    words.length > 0 && (
      <StyledWordCloud
        options={{
          colors: [
            "#1f77b4",
            "#ff7f0e",
            "#2ca02c",
            "#d62728",
            "#9467bd",
            "#8c564b",
          ],
          deterministic: false,
          fontFamily: "impact",
          fontSizes: [20, 100],
          fontStyle: "normal",
          fontWeight: "normal",
          padding: 1,
          rotations: 2,
          rotationAngles: [-90, 0],
          scale: "log",
          spiral: "archimedean",
          transitionDuration: 1000,
        }}
        size={[548, 400]}
        words={words}
      />
    )
  );
};
