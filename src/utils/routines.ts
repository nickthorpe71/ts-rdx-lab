export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const delayedMap = async <T, R>(
    inputArray: T[],
    delay: number,
    callback: (item: T, index: number) => R
): Promise<R[]> => {
    return Promise.all(
        inputArray.map(async (item, index) => {
            await sleep(delay);
            return callback(item, index);
        })
    );
};
