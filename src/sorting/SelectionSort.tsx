import { useState } from "react";
import { range } from "lodash";

const randomArray = (len: number) =>
    range(len).map(() => Math.floor(Math.random() * 100));

const SelectionSort: React.FC = () => {
    const [array, setArray] = useState<number[]>(randomArray(10));

    const selectionSort = (array: number[]): number[] => {
        let arrayClone: number[] = [...array];

        const newArray: number[] = range(arrayClone.length).map(() => {
            const smallestIndex: number = findIndexOfSmallest(arrayClone);
            const smallest: number = arrayClone[smallestIndex];
            arrayClone.splice(smallestIndex, 1);
            return smallest;
        });

        return newArray;
    };

    const findIndexOfSmallest = (array: number[]): number => {
        const smallest: number = array.reduce(
            (acc, _, index) => (array[acc] < array[index] ? acc : index),
            0
        );
        return smallest;
    };

    return (
        <div>
            <h1 className='text-3xl font-bold underline text-red-600'>
                Selection Sort
            </h1>
            <div>
                {array.map((value, index) => (
                    <div key={index}>{value}</div>
                ))}
            </div>
            <button onClick={() => setArray(randomArray(10))}>Reset</button>
            <button onClick={() => setArray(selectionSort(array))}>Sort</button>
        </div>
    );
};

export default SelectionSort;
