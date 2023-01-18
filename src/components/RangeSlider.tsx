import React, { FC } from "react";

interface RangeSliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
}

const Button: FC<RangeSliderProps> = ({ min, max, value, onChange }) => {
    return (
        <input
            type='range'
            className='w-full h-1 rounded-lg appearance-none cursor-pointer bg-stone-700 accent-stone-500'
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
        />
    );
};

export default Button;
