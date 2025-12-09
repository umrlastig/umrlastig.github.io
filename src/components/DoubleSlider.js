import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const DoubleSliderBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 300px;
    margin: auto;
`;

const RangeSlider = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  margin: 30px 0;
  background-color: #8a8a8a;
  border-radius: 5px;
  input {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-50%);
    background: none;
    pointer-events: none;
    appearance: none;
    height: 5px;
    &::-webkit-slider-thumb {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 3px solid #fff;
        background: #fe696a;
        pointer-events: auto;
        appearance: none;
        cursor: pointer;
        box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 2; /* Ensure thumbs appear above the track */
    }
    &::-moz-range-thumb {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        border: 3px solid #fff;
        background: #fe696a;
        pointer-events: auto;
        cursor: pointer;
        box-shadow: 0 0.125rem 0.5625rem -0.125rem rgba(0, 0, 0, 0.25);
        position: relative;
        z-index: 2;
        }
  }
`;

const SliderTrack = styled.div`
  height: 100%;
  position: absolute;
  background-color: #fe696a;
  left: 0;
  right: 100%;
  border-radius: 5px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MinBox = styled.div`
  width: 50%;
  margin-right: 10px;
  input {
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
`;

const MaxBox = styled.div`
  width: 50%;
  input {
    float: right;
    width: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
`;


const MinTooltip = styled.div`
  position: absolute;
  top: -35px;
  font-size: 12px;
  color: #555;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1;
  left: 0;
  transform: translateX(-50%);
  &::-webkit-inner-spin-button;
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const MaxTooltip = styled.div`
  position: absolute;
  top: -35px;
  font-size: 12px;
  color: #555;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1;
  right: 0;
  transform: translateX(50%);
  &::-webkit-inner-spin-button;
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

/*
 A Double Slider very much inspired by https://codesandbox.io/p/sandbox/blissful-allen-km9p4z
*/
export const DoubleSlider = ({ sliderMinValue, sliderMaxValue, minVal, maxVal, setMinVal, setMaxVal }) => {

  const track = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const minGap = 1;

  useEffect(() => {
    const range = track.current;

    if (range) {
      const minPercent =
        ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }

  }, [minVal, maxVal, sliderMinValue, sliderMaxValue]);

  const slideMin = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
    }
  };

  const slideMax = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
    }
  };

  const handleMinInput = (e) => {
    const value =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (value >= sliderMinValue && value < maxVal - minGap) {
      setMinVal(value);
    }
  };

  const handleMaxInput = (e) => {
    const value =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value > minVal + minGap) {
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (e, type) => {
    if (e.key === "Enter") {
      const value = parseInt(e.target.value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value < maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value > minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  return (
    <DoubleSliderBox>
      <InputBox>
        <MinBox>
          <input
            type="number"
            value={minVal}
            onChange={handleMinInput}
            onKeyDown={(e) => handleInputKeyDown(e, "min")}
            className="min-input"
            min={sliderMinValue}
            max={maxVal - minGap}
          />
        </MinBox>
        <MaxBox>
          <input
            type="number"
            value={maxVal}
            onChange={handleMaxInput}
            onKeyDown={(e) => handleInputKeyDown(e, "max")}
            className="max-input"
            min={minVal + minGap}
            max={sliderMaxValue}
          />
        </MaxBox>
      </InputBox>
      <RangeSlider>
        <SliderTrack ref={track}/>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="max-val"
        />
        {isDragging && <MinTooltip>{minVal}</MinTooltip>}
        {isDragging && <MaxTooltip>{maxVal}</MaxTooltip>}
      </RangeSlider>
    </DoubleSliderBox>
  );
};
