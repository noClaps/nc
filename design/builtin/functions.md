# Functions

## `fprint()`

These are functions that take in a file as the first input and an arbitrary number of values, and write those outputs to the file. The values are formatted according to the `str()` function defined on that type.

```nc
fn fprint(file f, ...)
```

## `print()` and `println()`

These functions call `fprint()` and with the output file set to be `stdout`. The difference between `print()` and `println()` is that `println()` appends a newline at the end of the output.

```nc
fn print(...) {
  fprint(os.stdout, ...)
}
fn println(...) {
  fprint(os.stdout, ..., "\n")
}
```

## `eprint()` and `eprintln()`

These functions call `fprint()` and with the output file set to be `stderr`. The difference between `eprint()` and `eprintln()` is that `eprintln()` appends a newline at the end of the output. These functions are generally used for print debugging.

```nc
fn eprint(...) {
  fprint(os.stderr, ...)
}
fn eprintln(...) {
  fprint(os.stderr, ..., "\n")
}
```

## `typeof()`

This returns the type of a value.

```nc
fn typeof(val) -> type
```

## `assert()`

This is a function that takes in a boolean as the first argument, and a string as the second argument. If the boolean is false, it halts the program with an assertion error and a stacktrace, and the string as an error message.

```nc
fn assert(bool check, str message) -> ! {
  if !check {
    panic("ERROR: {message}")
  }
}
```

Note that although this function panics, you do not need to call it with `try`.

## `panic()`

This function takes in a string as an argument, and crashes the program whenever it is called, displaying the string passed in as an error message. If a function in your code uses `panic()`, it must have a `!` in its return type, and must be called with the `try` keyword.

```nc
fn panic(str message) -> !
```

## Type casting functions

There are functions to cast a value into a different type:

- `bool()`
- `complex()`
- `decimal()`
- `error()`
- `int()`, `uint()`, `bigint()`
- `str()`

If you define a type of your own, you need to define these functions for that type if you'd like to be able to convert into them. This is especially important for `str()`, as you need to define it in order to print the value out using the [`print()`](#print-and-println) and [`eprint()`](#eprint-and-eprintln) functions above.

## `new()`

This function takes in a type as an argument, and creates a value of that type.

```nc
fn new(type anyType) -> anyType
```
