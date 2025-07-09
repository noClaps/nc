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

For loops will always loop over an [array](./types/array):

- [Ranges](./types/range) like `1:20` or `1:2:20` are arrays of numbers, and it loops over the values of that array.
- [Structs](./types/struct) are converted into an array of [tuples](./types/tuple) of `(member, value)`, and it loops over each of those tuples.
- Arrays, [strings](./types/string) and [maps](./types/map) are looped over by their indices, [`uint`](./types/int#uint) for arrays and strings and the key defined for maps.

## While loops

```
mut int j = 2
while j > 0 {
  j--
}
// `j` is available here since it was declared outside
```
