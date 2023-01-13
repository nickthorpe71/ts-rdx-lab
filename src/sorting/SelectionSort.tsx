import { useState } from "react";
import { range } from "lodash";
import { sleep } from "../utils";

const randomArray = (len: number) =>
    range(len).map(() => Math.floor(Math.random() * 100));

const SelectionSort: React.FC = () => {
    const [array, setArray] = useState<number[]>(randomArray(10));
    const [running, setRunning] = useState<boolean>(false);

    const selectionSort = async () => {
        let arrayClone: number[] = [...array];

        for (let i = 0; i < array.length - 1; i++) {
            const smallestIndex: number =
                findIndexOfSmallest(arrayClone.slice(i)) + i;
            if (smallestIndex === i) continue;
            const smallest: number = arrayClone[smallestIndex];
            const temp = arrayClone[i];
            arrayClone[i] = smallest;
            arrayClone[smallestIndex] = temp;
            setArray([...arrayClone]);
            await sleep(1000);
        }
    };

    const findIndexOfSmallest = (array: number[]): number => {
        const smallest: number = array.reduce(
            (acc, _, index) => (array[acc] < array[index] ? acc : index),
            0
        );
        return smallest;
    };

    const handleReset = async () => {
        setArray(randomArray(10));
    };

    const handleSort = async () => {
        setRunning(true);
        await selectionSort();
        setRunning(false);
    };

    const getBarClass = (value: number) => {
        const height = Math.floor((value / 100) * 64);
        return `bg-zinc-700 w-5 text-center mx-1 h-${height}`;
    };

    return (
        <div className={`h-screen flex flex-col items-center justify-center`}>
            <h1 className='text-3xl font-bold'>Selection Sort</h1>
            <div className={`w-full flex items-center justify-center h-3/6`}>
                {array.map((value, index) => (
                    <div key={index} className={getBarClass(value)}>
                        {value}
                    </div>
                ))}
            </div>
            {running ? (
                <p>Running...</p>
            ) : (
                <div>
                    <button onClick={handleReset}>Reset</button>
                    <button onClick={handleSort}>Sort</button>
                </div>
            )}
        </div>
    );
};

export default SelectionSort;
