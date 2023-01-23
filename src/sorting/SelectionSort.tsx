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
    const [highlightsOn, setHighlightsOn] = useState<boolean>(false);
    const [array, setArray] = useState<number[]>(randomArray(20));
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [consideringIndex, setConsideringIndex] = useState<number | null>(0);
    const [chosenIndex, setChosenIndex] = useState<number | null>(0);
    const [numItems, setNumItems] = useState<number>(20);
    const [delay, setDelay] = useState<number>(50); // [ms]
    const [running, setRunning] = useState<boolean>(false);

    const selectionSort = async (): Promise<void> => {
        setHighlightsOn(true);
        let arrayClone: number[] = [...array];

        for (let i = 0; i < array.length - 1; i++) {
            setCurrentIndex(i);
            let smallestIndex: number = i;
            for (let j = i + 1; j < array.length; j++) {
                setConsideringIndex(j);
                await sleep(delay);
                if (arrayClone[j] < arrayClone[smallestIndex]) {
                    setChosenIndex(j);
                    smallestIndex = j;
                    await sleep(Math.min(250, delay * 2.5));
                }
            }

            setConsideringIndex(null);
            await sleep(Math.min(400, delay * 4));
            setCurrentIndex(smallestIndex);
            setChosenIndex(i);
            swap(arrayClone, smallestIndex, i);
            setArray([...arrayClone]);
            await sleep(Math.min(900, delay * 9));
            setChosenIndex(null);
        }
        setHighlightsOn(false);
    };

    const swap = (array: number[], smallestIndex: number, i: number): void => {
        const smallest: number = array[smallestIndex];
        const temp = array[i];
        array[i] = smallest;
        array[smallestIndex] = temp;
    };

    const handleReset = async () => {
        setArray(randomArray(20));
        setNumItems(20);
        setDelay(50);
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

    const determineColor = (index: number): string => {
        if (!highlightsOn) return "border-stone-700";
        switch (index) {
            case currentIndex:
                return "border-stone-900 bg-stone-900";
            case chosenIndex:
                return "border-red-700 bg-red-700";
            case consideringIndex:
                return "border-stone-200 bg-stone-500";
            default:
                return "border-stone-700";
        }
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
                        className={`${determineColor(
                            index
                        )} w-5 border-2 mx-1 transition-all`}
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
