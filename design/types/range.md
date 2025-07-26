# Range

You can declare a range using `<start>:<stop>` or `<start>:<step>:<stop>`. Though this is not a data type on its own, you can use it to quickly create arrays of integers:

```nc
int[] nums = [1:10]
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

int[] evens = [0:2:10]
// [0, 2, 4, 6, 8, 10]
```

The range cannot be infinite. If `<step>` is positive or not included (in which case it's 1), then `<start>` must be less than `<stop>`. If `<start>` is greater than `<stop>`, then `<step>` must be negative. The range will start at the `<start>` value, and stop at less than or equal to the `<stop>` value if `<step>` is positive, and greater than or equal to the `<stop>` value if `<step>` is negative. For example:

```nc
int[] odds = [1:2:20]
// [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
```

Ranges are inclusive on both ends. You can also use a range to get a slice out of an array or string, and create a new array or string from that:

```nc
int[] fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
int[] fib5 = fibonacci[0:4] // [0, 1, 1, 2, 3]
int[] fibEven = fibonacci[0:2:$] // [0, 1, 3, 8, 21, 55]

str helloWorld = "Hello World"
str hello = helloWorld[0:4] // "Hello"
```

When using ranges for indexing, you can use `$` to signify the last index, basically equivalent to `array.len-1`. You can then subtract a number from `$` to access previous values:

```nc
fibonacci[1:$-1] == [1, 1, 2, 3, 5, 8, 13, 21, 34]
```

You can also use ranges to quickly reverse arrays or strings:

```nc
int[] nums = [1, 2, 3, 4, 5]
int[] reversedNums = nums[$:-1:0] // [5, 4, 3, 2, 1]

str hello = "Hello"
str reversedHello = hello[$:-1:0] // "olleH"
```

When using ranges to get a slice, you cannot have negative values, and this will throw an error. Negative indexing is only allowed when accessing a single value.

The type of range created depends on the types of the `<start>`, `<step>` and `<stop>` values. All three values must be of the same type.

To create an `int` range, you can simply use integers for these values, e.g. `1:2:20`. To create a `uint` or `bigint` range, you can use the `u` and `n` suffixes, respectively. For example:

```nc
uint[] unums = [1u:2u:20u]
bigint[] bignums = [1n:2n:20n]
```
