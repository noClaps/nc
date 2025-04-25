# Loops

## For loops

```
for i in 1:20 {
  print(i) // Prints 1, 2, 3, ..., 20
}

for j in 1:2:20 { // You can increment/decrement by other values
  print(j) // Prints 1, 3, 5, ..., 19
}
```

For loops will always loop over an [array](./variables.md#arrays):

- [Ranges](./variables.md#ranges) like `1:20` or `1:2:20` are arrays of numbers, and it loops over the values of that array.
- [Structs](./variables.md#structs) are converted into an array of [tuples](./variables.md#tuples) of `(member, value)`, and it loops over each of those tuples.
- Arrays, [strings](./variables.md#strings) and [maps](./variables.md#maps) are looped over by their indices, [`uint`](./variables.md#int-and-bigint) for arrays and strings and the key defined for maps.

## While loops

```
mut int j = 2
while j > 0 {
  j--
}
// `j` is available here since it was declared outside
```
