export const range = (start, end) => {
    let output = []

    if (end === undefined) {
        end = start;
        start = 0
    }

    for (let index = start; index < end; index++){
        output.push(index)
    }

    return output
};

// console.log(range(2, 7));