// define global configuration. hard coded for easiness
let keyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
];

let trans_keyboard = [];
let txt_indexes = {};

// convert string to string array
convert_str_to_arr = (str, split_param="") => {
    return str.replace(/\s+/g, "").split(split_param)
}

is_transformations_valid = (trans) => {
    if(Number.isInteger(Number(trans)) || ["H", "V"].includes(trans)) {
        return true
    }
    return false
}

horizontal_table_flip = () => {
    trans_keyboard = trans_keyboard.map(row => row.reverse())
}

vertical_table_flip = () => {
    trans_keyboard = trans_keyboard[0].map((_, colIndex) => trans_keyboard.map(row => row[colIndex]));
    horizontal_table_flip()
    trans_keyboard = trans_keyboard[0].map((_, colIndex) => trans_keyboard.map(row => row[colIndex]));
}

rotate_arr = (arr, reverse=true) => {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

table_shift = (num) => {
    let flat_trans_keyboard = [].concat(...trans_keyboard);

    if(num > 0) {
        for (var i=0; i<num; i++) {
            flat_trans_keyboard = rotate_arr(flat_trans_keyboard)
        }
    } else {
        for (var i=0; i>num; i--) {
            flat_trans_keyboard = rotate_arr(flat_trans_keyboard, false)
        }
    }

    trans_keyboard = [];
    while(flat_trans_keyboard.length) trans_keyboard.push(flat_trans_keyboard.splice(0,10));
}

execute_trans = (trans) => {
    if(is_transformations_valid(trans)) {
        switch(trans) {
            case "H":
                horizontal_table_flip()
                break
            case "V":
                vertical_table_flip()
                break
            case trans:
                table_shift(Number(trans))
                break
            default: break
        }
    }
}

// iterate trans arr to perform transformation in a sequence
process_trans_arr = (trans_arr) => {
    trans_arr.forEach((trans, i) => {
        execute_trans(trans)
    })
}

// iterate txt arr to find the new str in tranformed keyboard
process_text_arr = (txt_arr) => {
    let output = "" // to print output on single line
    txt_arr.forEach((txt, i) => {
        // check if txt index record exists
        if(txt in txt_indexes) {
            // retrive index for txt from txt indexes
            output += trans_keyboard[txt_indexes[txt][0]][txt_indexes[txt][1]]
        } else {
            // get index of txt from keyboard
            let row = keyboard.findIndex(row => row.includes(txt))
            let col = keyboard[row].indexOf(txt)

            // for the same index, output new txt from transformed keyboard
            output += trans_keyboard[row][col]
            txt_indexes[txt] = [row, col]
        }
    })
    console.log("output: ", output)
}

// main
keyboard_transformations = () => {

    // inputs hardcoded
    let input_trans_str = "H,V,4"
    let input_txt_str = "qw"

    // deep clone of original keyboard to avoid transformation changes
    trans_keyboard = JSON.parse(JSON.stringify(keyboard))

    // create string array from input string
    let trans_arr = convert_str_to_arr(input_trans_str, ",")
    let txt_arr = convert_str_to_arr(input_txt_str)

    // before transformation
    console.log("before transformation")
    console.table(keyboard)

    process_trans_arr(trans_arr)

    // after transformation
    console.log("after transformation")
    console.table(trans_keyboard)

    process_text_arr(txt_arr)
}

// execute the main
keyboard_transformations()
