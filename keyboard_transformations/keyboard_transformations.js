// define global configuration
let keyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

let copied_keyboard = [];

// log the table to console
function log_table(table) {
    console.table(table);
}

// string to array conversion
function process_str_to_arr(str, split_param='') {
    return str.split(split_param).filter(i => i)
}

function is_transformations_valid(str) {
    if(Number.isInteger(Number(str)) || ['H', 'V'].includes(str)) {
        return true;
    }
    return false;
}

function horizontal_table_flip() {
    for(i=0; i<copied_keyboard.length; i++) {
        copied_keyboard[i] = copied_keyboard[i].reverse();
    }
}
const transpose = arr => {
    for (let i = 0; i < arr.length; i++) {
       for (let j = 0; j < i; j++) {
          const tmp = arr[i][j];
          arr[i][j] = arr[j][i];
          arr[j][i] = tmp;
       };
    }
 }

function vertical_table_flip() {
    copied_keyboard = copied_keyboard[0].map((col, c) => copied_keyboard.map((row, r) => copied_keyboard[r][c]));
    horizontal_table_flip()
    copied_keyboard = copied_keyboard[0].map((col, c) => copied_keyboard.map((row, r) => copied_keyboard[r][c]));

    // copied_keyboard[0].map((val, index) => copied_keyboard.map(row => row[index]).reverse())
    // copied_keyboard = transpose(copied_keyboard)
    

}

function table_shift() {

}

// perform actual transformations
function execute_transformation(str) {
    if(is_transformations_valid(str)) {
       
        switch(str) {
            case 'H':
                horizontal_table_flip();
                break;
            case 'V':
                vertical_table_flip();
                break;
            case str:
                table_shift()
                break;
            default: break;
        }
    }
}

// process transformations on keyboard
function process_transformation_arr(transformation_arr) {
    for (var i = 0; i < transformation_arr.length; i++) {
        execute_transformation(transformation_arr[i]);  
        log_table(copied_keyboard) 
    }
}

// iterate through existing string input characters to find the transformed string at same position
function process_text_arr(text_arr) {
    let output = ''; // to print output on single line
    for(i=0; i<text_arr.length; i++) {
        // get position of character from original keyboard
        let row = keyboard.findIndex(row => row.includes(text_arr[i]));
        let col = keyboard[row].indexOf(text_arr[i]);
        
        // for the same position, output new character from transformed keyboard 
        output += copied_keyboard[row][col]
    }
    console.log(output)
}

// main
function keyboard_transformations() {
    
    // inputs 
    let input_transformation_str = "H,V";
    let input_text_str = "qw";

    // make copy of keyboard for reference
    copied_keyboard = JSON.parse(JSON.stringify(keyboard)); 

    let transformtion_arr = process_str_to_arr(input_transformation_str, ',');
    let text_arr = process_str_to_arr(input_text_str);
    
    log_table(keyboard)

    console.log('copied keyboard')
    process_transformation_arr(transformtion_arr);
    process_text_arr(text_arr);

    
}

// execute the main
keyboard_transformations();