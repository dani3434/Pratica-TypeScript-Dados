export default function countBy(arr) {
    return arr.reduce((acc, atual) => {
        if (acc[atual]) {
            acc[atual] += 1;
        }
        else {
            acc[atual] = 1;
        }
        return acc;
    }, {});
}
//# sourceMappingURL=countBy.js.map