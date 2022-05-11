export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    let sign = 0;
    let value_a = a[orderBy];
    let value_b = b[orderBy];

    if (typeof value_a === 'object' && typeof value_b === 'object') {
        value_a = Object.values(value_a)[0];
        value_b = Object.values(value_b)[0];
    }
    if (value_b < value_a) {
        sign = -1;
    } else if (value_b > value_a) {
        sign = 1;
    }
    if (typeof value_a === 'number' && typeof value_b === 'number')
        sign *= -1;
    return sign;
}