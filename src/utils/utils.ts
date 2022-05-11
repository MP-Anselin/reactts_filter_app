export type Order = 'asc' | 'desc';

export const floatTwoNb = (value: number): number => {
    const num = Number(value)
    const roundedString = num.toFixed(2);
    return Number(roundedString);
}
