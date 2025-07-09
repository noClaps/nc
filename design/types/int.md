# Int and BigInt

The `int` type will be a 64-bit signed integer type. There will also be a `uint` which will be a 64-bit unsigned integer.

You can declare `int`s by simply writing a number without a decimal point, or converting from a different type by using the `int()` function:

```
int myNum = 1
int myNum = int(1)
```

A `uint` will need a `u` at the end of the number, or the `uint()` function can be called to convert an `int` to a `uint`:

```
uint myNum = 1u // cannot be negative
uint myNum = uint(1) // equivalent to the above expression
```

> [!WARNING]
> If a value outside the range of `uint` or `int` is passed, it will wrap around to fit within the bounds.

There will also be an arbitrary-precision integer type called `bigint`, which will be incompatible with the other `int` types, and will be slower. You can convert between `bigint` and `int`, but operations must be between the same type, e.g. you cannot add a `bigint` and an `int`. Converting from `bigint` to `int` will cap the value at the 64-bit signed integer limits.

You can declare a `bigint` by calling the `bigint()` function on an `int` or `uint`, or by adding an `n` to the end of the number:

```
bigint myBigInt = 1n
bigint myBigInt = bigint(1) // equivalent to the above expression
bigint myBigInt = bigint(1u) // you can also convert uints
```

If any of the integer conversion functions are used on a decimal, then only the integer part will be returned. So, for example, `int(2.5)` will become `2`.
