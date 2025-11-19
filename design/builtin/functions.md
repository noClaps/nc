# Functions

## `fprint()`

This is a function that takes in a file as the first input and a string as the
second input, and writes that string to the file.

```nc
fn fprint(file f, str value)
```

## `print()` and `println()`

These functions call `fprint()` and with the output file set to be `stdout`.
The difference between `print()` and `println()` is that `println()` appends a
newline at the end of the output.

```nc
fn print(str value) {
  fprint(os.stdout, value)
}
fn println(str value) {
  fprint(os.stdout, value <> "\n")
}
```

## `eprint()` and `eprintln()`

These functions call `fprint()` and with the output file set to be `stderr`.
The difference between `eprint()` and `eprintln()` is that `eprintln()` appends
a newline at the end of the output. These functions are generally used for
print debugging.

```nc
fn eprint(str value) {
  fprint(os.stderr, value)
}
fn eprintln(str value) {
  fprint(os.stderr, value <> "\n")
}
```

## `typeof()`

This returns the type of a value.

```nc
fn typeof(value) -> type
```

## `assert()`

This is a function that takes in a boolean as the first argument, and
optionally a string as the second argument. If the boolean is false, it halts
the program with an assertion error and a stacktrace, and the string as an
error message.

```nc
fn assert(bool check, str message) -> ! {
  if check {
    false -> { panic("ERROR: {message}") }
    else -> {}
  }
}
fn assert(bool check) -> ! {
  if check {
    false -> { panic("ERROR: Assertion failed") }
    else -> {}
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

If you define a type of your own, you need to define these functions for that
type if you'd like to be able to convert into them. This is especially
important for `str()`, as you need to define it in order to print the value out
using the [`print()`](#print-and-println) and
[`eprint()`](#eprint-and-eprintln) functions above.

## `new()`

This function takes in a type as an argument, and creates a value of that type.

```nc
fn new(type anyType) -> anyType
```

The value created with `new` will be the "zero" value of that type:

- `array`, `map`: `[]`
- `bool`: `false`
- `byte`, `char`: `''`
- `complex`, `decimal`, `int`, `uint`, `bigint`: `0`
- `enum`: The first value in the enum
- `error`, `str`: `""`
- `optional`: `none`
- `struct`: A struct with the zero values of its constituent types
- `tuple`: A tuple with the zero values of its constituent types

Generally, you should define your own `new()` functions for your types and use
those instead of relying on the built-in zero value definitions.

## `import()`

This function allows you to import modules from other files, dependencies, or
the standard library. They can then be assigned to a `mod` variable and used in
the code.

```nc
mod math = import("std/math")
```

## `asm()`

This function allows you to write inline assembly in NC. Keep in mind that while the rest of the language is memory-safe, there are no such guarantees for any assembly code you may write or import from libraries using this function.

```nc
asm("""
; Your assembly code here
""")
```
