import * as Plot from "@observablehq/plot";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { WordCloud } from "./WordCloud";
import { DoubleSlider } from "./DoubleSlider";

export default function KeywordsPlot({ nodes }) {
  const allDates = [...new Set(nodes.map((node) => node.producedDate))];
  const minDate = Math.min(...allDates);
  const maxDate = Math.max(...allDates);
  const [kwType, setKwType] = useState("keywords_lastig");
  // const [maxPossibleOccurences, setMaxPossibleOccurences] = useState(null);
  const [minNbOccurences, setMinNbOccurences] = useState(25);
  const [maxNbOccurences, setMaxNbOccurences] = useState(null);
  const [startDate, setStartDate] = useState(2018);
  const [endDate, setEndDate] = useState(maxDate);
  const nbDates = endDate - startDate + 1;
  // const [kwNodes, setKwNodes] = useState(null);
  const containerRef1 = useRef();
  const containerRef2 = useRef();
  const dates = Array.from({ length: nbDates }, (_, g) => g + startDate);
  const kwNodes = useMemo(
    () =>
      nodes
        .flatMap((node) => [
          {
            producedDate: node.producedDate,
            keywords: node.keywords.map((k) => k.toLowerCase()),
            keywords_lastig: node.keywords_lastig.map((k) => k.toLowerCase()),
          },
        ])
        .filter(
          (node) =>
            (node.producedDate >= startDate) & (node.producedDate <= endDate),
        ),
    [nodes, startDate, endDate],
  );
  const allWords = kwNodes
    .flatMap((node) => (node[kwType] ? node[kwType] : []))
    .filter((x) => x.length > 2 && x.length < 20);
  const counts = {};
  for (const word of allWords) {
    counts[word] = counts[word] ? counts[word] + 1 : 1;
  }
  const maxPossibleOccurences = Math.max(
    ...Object.entries(counts).map(([_k, v], _i) => v),
  );
  // console.log(startDate,endDate,minNbOccurences,maxNbOccurences,maxPossibleOccurences,kwType);
  if (maxNbOccurences > maxPossibleOccurences || !maxNbOccurences) {
    // console.log("setMaxNbOccurences",maxNbOccurences,"to",maxPossibleOccurences);
    setMaxNbOccurences(maxPossibleOccurences);
  }
  // console.log("maxPossibleOccurences",maxPossibleOccurences,"maxNbOccurences",maxNbOccurences);
  const words = Object.entries(counts)
    .sort(([, a], [, b]) => a - b)
    .map(([k, v], _i) => [{ text: k, value: v }])
    .flat()
    .filter((w) => w.value > minNbOccurences && w.value < maxNbOccurences);
  const filteredNodesByDate = Object.fromEntries(
    dates.map((date) => [
      date,
      kwNodes.filter((node) => node.producedDate.includes(String(date))),
    ]),
  );
  const keywordCountsPerDate = words.flatMap((word) =>
    dates.map((date) => ({
      word: word.text,
      date: date,
      count: filteredNodesByDate[String(date)].filter((n) =>
        n[kwType].includes(word.text),
      ).length,
    })),
  );
  useEffect(() => {
    // console.log(startDate,endDate,minNbOccurences,maxNbOccurences,kwType);
    // console.log("nb dates",nbDates,"words",words.length);
    const plot1 = Plot.plot({
      width: 120 + nbDates * 35,
      height: 60 + words.length * 35,
      r: { range: [0, 20] },
      x: {
        label: null,
        tickFormat: "",
        axis: "both",
        type: "point",
        tickSize: 0,
      },
      y: {
        label: null,
        domain: words.map((d) => d.text),
        type: "point",
        tickSize: 0,
      },
      marks: [
        Plot.dot(keywordCountsPerDate, {
          r: "count",
          x: "date",
          y: "word",
          fill: "black",
        }),
      ],
    });
    const plot2 = Plot.plot({
      color: { legend: true },
      width: 1000,
      height: 600,
      r: { range: [0, 20] },
      x: {
        label: null,
        tickFormat: "",
        axis: "both",
        type: "point",
        tickSize: 0,
      },
      y: { label: null, tickSize: 0 },
      marks: [
        Plot.lineY(keywordCountsPerDate, {
          x: "date",
          y: "count",
          stroke: "word",
          curve: "catmull-rom",
        }),
      ],
    });
    if (words.length > 0) {
      containerRef1.current.append(plot1);
    }
    if (nbDates > 1 && words.length > 0) {
      containerRef2.current.append(plot2);
    }
    return () => {
      plot1.remove();
      plot2.remove();
    };
  }, [
    nodes,
    kwType,
    minNbOccurences,
    maxNbOccurences,
    startDate,
    endDate,
    keywordCountsPerDate,
    nbDates,
    words,
  ]);
  return (
    <div style={{ display: "contents" }}>
      <div>
        <label htmlFor="keyword-select">keyword type: </label>
        <select
          id="keyword-select"
          value={kwType}
          onChange={(e) => setKwType(e.target.value)}
        >
          <option key="keywords" value="keywords">
            keywords
          </option>
          <option key="keywords_lastig" value="keywords_lastig">
            keywords_lastig
          </option>
        </select>
      </div>
      <span>Filter by date:</span>
      <DoubleSlider
        sliderMinValue={minDate}
        sliderMaxValue={maxDate}
        minVal={startDate}
        maxVal={endDate}
        setMinVal={setStartDate}
        setMaxVal={setEndDate}
      />
      <span>Filter by number of occurences:</span>
      {maxNbOccurences && (
        <DoubleSlider
          sliderMinValue={0}
          sliderMaxValue={maxPossibleOccurences}
          minVal={minNbOccurences}
          maxVal={maxNbOccurences}
          setMinVal={setMinNbOccurences}
          setMaxVal={setMaxNbOccurences}
        />
      )}
      {kwNodes && <WordCloud nodes={kwNodes} keywordAttribute={kwType} />}
      <div ref={containerRef1} />
      <div ref={containerRef2} />
    </div>
  );
}
