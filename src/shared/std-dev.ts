export const calculateStdDev = (inp: number[]) => {
    const mean = inp.reduce((result, val) => {
        result += val;
        return result;
    }, 0) / inp.length;
    const variance = inp.reduce((result, val) => {
        result += Math.pow(val - mean, 2);
        return result;
    }, 0) / inp.length;
    return Math.sqrt(variance);
};
