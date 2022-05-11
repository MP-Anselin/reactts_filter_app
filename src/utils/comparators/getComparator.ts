import {descendingComparator} from "./descendingComparator";
import {Order} from "../utils";

export const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | any },
    b: { [key in Key]: number | string | any },
) => number => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}