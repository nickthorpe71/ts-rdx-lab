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
    const [delay, setDelay] = useState<number>(0); // [ms]
    const [running, setRunning] = useState<boolean>(false);

    // Selection sort
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
                    await sleep(delay);
                }
            }

            setConsideringIndex(null);
            await sleep(delay * 2);
            setCurrentIndex(smallestIndex);
            setChosenIndex(i);
            swap(arrayClone, smallestIndex, i);
            setArray([...arrayClone]);
            await sleep(delay * 4);
            setChosenIndex(null);
        }
        setHighlightsOn(false);
    };

    const swap = (array: number[], s1: number, s2: number): void => {
        const temp: number = array[s2];
        array[s2] = array[s1];
        array[s1] = temp;
    };

    // Quick sort
    const quickSort = async (): Promise<void> => {
        let arrayClone: number[] = [...array];
        let stack: { x: number; y: number }[] = [];

        let start = 0;
        let end = arrayClone.length - 1;

        stack.push({ x: start, y: end });

        // The stack is simulating the recursive calls

        while (stack.length > 0) {
            //Get the start and end from the stack
            const { x, y } = stack.shift() || { x: -1, y: -1 };

            //Partition the array along the pivot
            const PI = partitionHigh(arrayClone, x, y);

            //Push sub array with less elements than pivot into the stack
            if (PI - 1 > x) stack.push({ x: x, y: PI - 1 });

            //Push sub array with greater elements than pivot into the stack
            if (PI + 1 < y) stack.push({ x: PI + 1, y: y });

            setArray([...arrayClone]);
            await sleep(delay);
        }

        setArray([...arrayClone]);
    };

    const partitionHigh = (arr: number[], low: number, high: number) => {
        let pivot: number = arr[high];
        let i: number = low;

        // Partition the array into two parts using the pivot
        for (let j: number = low; j < high; j++) {
            if (arr[j] < pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, high);
        return i;
    };

    const handleReset = async () => {
        setArray(randomArray(20));
        setNumItems(20);
        setDelay(0);
    };

    const handleSort = async () => {
        setRunning(true);
        await quickSort();
        setRunning(false);
    };

    const handleChangeNumItems = (n: number) => {
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
            <button className='flex gap-4 hover:text-black hover:border-black focus:ring-stone-900'>
                <h1 className='text-3xl font-bold'>Selection Sort</h1>
                <p className='text-xl font-semibold mt-1'>v</p>
            </button>
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
                    <div className='flex flex-col md:flex-row gap-2'>
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
                                onChange={handleChangeNumItems}
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
