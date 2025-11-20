# Loops

## For loops

```nc
for i in 1:20 {
  print("{i}") // Prints 1, 2, 3, ..., 20
}

for j in 1:2:20 { // You can increment/decrement by other values
  print("{j}") // Prints 1, 3, 5, ..., 19
}
```

For loops will always loop over an [array](./types/array):

- [Ranges](./types/range) like `1:20` or `1:2:20` are arrays of numbers, and it loops over the values of that array.
- [Structs](./types/struct) are converted into an array of [tuples](./types/tuple) of `(member, value)`, and it loops over each of those tuples.
- Arrays, [strings](./types/string) and [maps](./types/map)  are looped over by their indices, [`uint`](./types/int#uint) for arrays and strings, and the key defined for maps.

## While loops

```nc
mut int j = 2
while j > 0 {
  j--
}
// `j` is available here since it was declared outside
```

## Labels, `break`, and `continue`

There are `break` and `continue` keywords for breaking out of the loop, and skipping to the next iteration, respectively.

However, if you have a label on your loop, you can put the label name after `break` or `continue` to break or continue from that label. This is very useful if you have nested loops, for instance.

```nc
int[][] table = [[...]]

rows: for row in table {
// ^ This is a label

  for col in table[row] {
    int val = table[row][col]

    if val {
      2 -> { continue } // This will skip to the next value in the inner loop
      3 -> { break } // This will break out of the inner loop
      5 -> { continue :rows } // This will skip to the next value in the outer loop
      10 -> { break :rows } // This will break out of the outer loop and go to the `print("Hello world")` below
      else -> {}
    }

    print("{val}")
  }
}

print("Hello world")
```
