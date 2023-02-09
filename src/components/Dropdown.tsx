import React, { FC, useState } from "react";

interface DropdownProps {
    items: {
        id: string;
        label: string;
        onClick: () => void;
    }[];
}

const Dropdown: FC<DropdownProps> = ({ items }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(items[0].label || "");

    const handleClick = (item: {
        id: string;
        label: string;
        onClick: () => void;
    }) => {
        setSelected(item.label);
        setOpen(false);
        item.onClick();
    };

    return (
        <div>
            <button
                className='bg-transparent hover:text-black hover:border-black focus:ring-stone-900 font-bold rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative'
                type='button'
                onClick={() => setOpen(!open)}
            >
                {selected}{" "}
                <svg
                    className='w-4 h-4 ml-2'
                    aria-hidden='true'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M19 9l-7 7-7-7'
                    />
                </svg>
            </button>
            {open && (
                <div className='bg-transparent absolute'>
                    <ul
                        className='py-2 text-sm font-bold'
                        aria-labelledby='dropdownDefaultButton'
                    >
                        {items.map((item) => (
                            <li key={item.id} className='h-10'>
                                <a
                                    onClick={() => handleClick(item)}
                                    className='block px-4 py-2 text-stone-800 hover:text-black hover:border-b-2 hover:border-black cursor-pointer'
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
