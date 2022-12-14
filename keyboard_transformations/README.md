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