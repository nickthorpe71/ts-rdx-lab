import React, { useState } from "react";
import { range } from "lodash";

// utils
import { sleep } from "../utils";

// components
import Button from "../components/Button";
import RangeSlider from "../components/RangeSlider";

const randomArray = (len: number) =>
    range(len).map(() => Math.ceil(Math.random() * 100));

const SelectionSort: React.FC = () => {
    const [array, setArray] = useState<number[]>(randomArray(20));
    const [numItems, setNumItems] = useState<number>(20);
    const [delay, setDelay] = useState<number>(210); // [ms]
    const [running, setRunning] = useState<boolean>(false);

    const selectionSort = async (): Promise<void> => {
        let arrayClone: number[] = [...array];

        for (let i = 0; i < array.length - 1; i++) {
            const smallestIndex: number =
                findIndexOfSmallest(arrayClone.slice(i)) + i;
            if (smallestIndex === i) continue;
            swap(arrayClone, smallestIndex, i);
            setArray([...arrayClone]);
            await sleep(delay);
        }
    };

    const swap = (array: number[], smallestIndex: number, i: number): void => {
        const smallest: number = array[smallestIndex];
        const temp = array[i];
        array[i] = smallest;
        array[smallestIndex] = temp;
    };

    const findIndexOfSmallest = (array: number[]): number => {
        const smallest: number = array.reduce(
            (acc: number, _: number, index: number): number =>
                array[acc] < array[index] ? acc : index,
            0
        );
        return smallest;
    };

    const handleReset = async () => {
        setArray(randomArray(20));
        setNumItems(20);
        setDelay(210);
    };

    const handleSort = async () => {
        setRunning(true);
        await selectionSort();
        setRunning(false);
    };

    const handleNumItemsRange = (n: number) => {
        setNumItems(n);
        setArray(randomArray(n));
    };

    return (
        <div className={`h-screen flex flex-col items-center justify-center`}>
            <h1 className='text-3xl font-bold'>Selection Sort</h1>

            <div
                className={`w-full flex items-center justify-center h-3/6 my-10`}
            >
                {array.map((value, index) => (
                    <div
                        key={index}
                        style={{ height: `${value}%` }}
                        className='border-stone-700 w-5 border-2 mx-1 transition-all'
                    >
                        {}
                    </div>
                ))}
            </div>
            <div className='h-12'>
                {running ? (
                    <div>
                        <p className='font-bold'>Running...</p>
                    </div>
                ) : (
                    <div className='flex gap-2'>
                        <div>
                            <Button text='Reset' onClick={handleReset} />
                            <Button text='Sort' onClick={handleSort} />
                        </div>
                        <div>
                            <p className='font-bold text-sm'>{`Num items: ${numItems}`}</p>
                            <RangeSlider
                                min={2}
                                max={80}
                                value={numItems}
                                onChange={handleNumItemsRange}
                            />
                        </div>
                        <div>
                            <p className='font-bold text-sm'>{`Delay: ${
                                delay / 1000
                            }s`}</p>
                            <RangeSlider
                                min={0}
                                max={1000}
                                value={delay}
                                onChange={setDelay}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectionSort;
