/*

The goal of this exercise is to have a workable efficient code for the problem given below. It need not be production level code but we expect clean readable code.


Problem statement:

You have a keyboard which has 40 keys - 

4 rows and 10 columns


The rows are as follows - 

1st row - 1 to 0 

2nd row - q to p

3rd row - a to ;

4th row - z to /


You can apply three “transformations” to a keyboard where the keys are exchanged in the following manner - 


Horizontal Transform (H) - This flips the keyboard on a vertical axis. i.e. the axis is between 5th and 6th columns and all the keys on the left are interchanged with the right. 

Example - In the first row - 1 is exchanged with 0, 2 is exchanged with 9, 3 is exchanged with 8 … and so on.


Vertical Transform (V) - This flips the keyboard on a horizontal axis. ie. the axis between the 2nd and the 3rd row. All the keys on the top most row are exchanged with the bottom. 

Example - In the first row - 1 is exchanged with z, 2 is exchanged with x … and so on

In the second row - q is exchanged with a, w is exchanged with s … and so on


Shift - Its an integer. This shifts the keys on the keyboard by that many spots. 

So for a Shift of 2, the keys are moved to the right by 2 spots. So q moves to e, w moves to r … and so on. 


For negative values of integer, the keys shift to the left. When a key is at the end of the row, it just moves onto the next row for the positive shift. It moves to the previous row for negative shift.


Note that shift transform works across rows and not just within the row itself. For eg. Shifting the keyboard by 1 will result in 0 moving to q, p moving to a and so on


You can chain these transforms, that is, you can have a horizontal transform, shift and a vertical transform chained together denoted as H, 2, V


Your program has two inputs - 

1. A string containing the list of transforms like “H,V,-5,H,2,V,V,H”

2. A large amount of text like “asdfgrerwfasdf12333resdf”


The program takes 2) and applies transforms to each character in that string as specified in 1) and outputs the resulting string.

Example - 

1) H,V

2) qw


Output of program will be - ;l 


If your program encounters strings not on your “keyboard” (like “]”) you can just pass it through untransformed to output.

Key points to remember - 

Write clean and readable code

Assume that you are processing a huge text file which you are applying to transform. Like a 1GB big file. So design your logic putting that into consideration.

You can use any language to implement the program.

It is not necessary that the program take the input from a file or command line arguments, You can use static string variables which can be changed.

Output can be printed to a file or the console.
 
*/

// solution

// define global configuration. hard coded for easiness
let keyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
]

let trans_keyboard = []
let txt_indexes = {}

// convert string to string array
convert_str_to_arr = (str, split_param='') => {
    return str.replace(/\s+/g, '').split(split_param)
}

is_transformations_valid = (trans) => {
    if(Number.isInteger(Number(trans)) || ['H', 'V'].includes(trans)) {
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

table_shift = (num) => {

}

execute_trans = (trans) => {
    if(is_transformations_valid(trans)) {
        switch(trans) {
            case 'H':
                horizontal_table_flip()
                break
            case 'V':
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
    let output = '' // to print output on single line
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
    console.log(output)
}

// main 
keyboard_transformations = () => {

    // inputs hardcoded 
    let input_trans_str = "H,V"
    let input_txt_str = "qw"

    // deep clone of original keyboard to avoid transformation changes
    trans_keyboard = JSON.parse(JSON.stringify(keyboard))

    // create string array from input string
    let trans_arr = convert_str_to_arr(input_trans_str, ',')
    let txt_arr = convert_str_to_arr(input_txt_str)

    console.table(keyboard)

    process_trans_arr(trans_arr)
    process_text_arr(txt_arr)
    
    console.table(trans_keyboard)
}

// execute the main
keyboard_transformations()
