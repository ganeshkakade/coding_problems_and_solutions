const input = [{hname: 'abc'}, {hname: 'abc'}, {hname: 'abc'}, {hname: 'xyz'}, {hname: 'pqr'}, {hname: 'pqr'}, {hname: 'abc'}, {hname: 'ijk'}]

// const expected_output = [{hname: 'abc', colSpan: 3}, {hname: 'xyz', colSpan: 1}, {hname: 'pqr', colSpan: 2}, {hname: 'abc', colSpan: 1}, {hname: 'ijk', colSpan: 1}]

const output =[]

for(let i=0; i<input.length; i++) {
    if(output[output.length - 1] && (input[i]['hname'] === output[output.length - 1]['hname'])) {
        output[output.length - 1]['colSpan'] = output[output.length - 1]['colSpan'] + 1
    } else {
        output.push({
            hname: input[i].hname,
            colSpan: 1
        })
    }
}

console.log('input: ', input)
console.log('output: ', output)