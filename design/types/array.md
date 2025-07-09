# Array

Arrays are defined as a struct of the length and the array itself:

```
struct Array {
  uint len
  uint cap
  <type>[] vals
}
```

While this may seem recursive, this is only the internal representation, for you, the array will look like any normal array:

```
int[] myNums = [1, 2, 3, 4, 5]
```

You can have an array of any type, simply by adding a `[]` to the end of the type name in the declaration.

The values of the array are immutable unless the `mut` keyword is used, and arrays are strictly typed, so you can only have one type of value in an array.

```
int[] nums = [1, 2, 3, 4, 5]
nums[2] = 10 // error: mutating immutable value

mut int[] nums2 = [1, 2, 3, 4, 5]
nums[3] = 3.5 // error: `decimal` value in an `int` array
```

All arrays are dynamically sized, and would usually be called "lists" in other languages.

Arrays are 0-indexed, so the first value of the array is at the 0th index. Negative indexing is not allowed, but you can use `$` to signify the last index of the array, basically equivalent to the `array.len-1` value. You can also count backwards by subtracting from `$`.

```
int[] nums = [1, 2, 3, 4, 5]
nums[0] == 1
nums[1] == 2
nums[$] == 5
nums[$-1] == 4
```

In terms of implementation, arrays will be implemented similarly to Python's lists, where they grow dynamically and exponentially, doubling in size every time the capacity fills up.

The length of the array can be accessed with `<array>.len`.
