import { FC } from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            className='focus:outline-none rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-transparent font-bold text-stone-800 border-2 border-stone-800 border-solid hover:text-black hover:border-black focus:ring-stone-900'
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
