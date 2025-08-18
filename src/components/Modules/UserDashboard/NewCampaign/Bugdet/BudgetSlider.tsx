import type React from "react";
import { useEffect, useState } from "react";

interface BudgetSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  showEstimate?: boolean;
}

export function BudgetSlider({
  value,
  min,
  max,
  step,
  onChange,
  showEstimate = true,
}: BudgetSliderProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value);
    setInputValue(newValue.toString()); // Update input value when slider changes
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (/^\d+$/.test(newValue) || newValue === "") {
      setInputValue(newValue);
      const numValue = Number.parseInt(newValue);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    }
  };

  const handleInputBlur = () => {
    const numValue = Number.parseInt(inputValue);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      setInputValue(value.toString());
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2 max-w-5xl mx-auto">
      {showEstimate && (
        <div className="text-center text-title-color text-base md:text-xl  ">
          Estimated 2.6k - 7.4k Accounts Center accounts reached per day
        </div>
      )}

      <div className="flex items-center justify-center gap-2  mt-6">
        <div className="flex items-center">
          <span className="text-2xl te md:text-5xl font-medium text-secondary-color mr-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="bg-transparent text-2xl md:text-5xl text-secondary-color w-14 focus:outline-none md:w-28"
              min={min}
              max={max}
            />{" "}
            $
          </span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #38B6FF 0%, #38B6FF ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-title-color mt-2">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>
    </div>
  );
}
