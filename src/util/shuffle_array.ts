/**
 * Performs an in-place Fischer-Yates shuffle on the provided array,
 * returning a reference to that same array.
 *
 * Make copies at your own peril if so required.
 * @param array
 */
export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
