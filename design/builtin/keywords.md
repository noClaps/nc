# Keywords

## Conditionals
- `if`, `else if`, `else`: These are used for [basic conditionals](../conditionals/if-else).
- `match`, `else`: These are used for [pattern matching](../conditionals/pattern-matching).

## Functions
- `fn`: This is a [function](../functions/) definition.
- `try`: This is a keyword that is required to call a function that may throw. It doesn't do anything specific on its own, however it makes it clear to someone reading the code that the function they're calling could throw. It also colors the function it's being called in, and that containing function also becomes a throwing function. See [error handling](../functions/error-handling) for details.
- `catch`: This is a keyword that allows you to catch an error returned by a function without needing to declare it as a variable and handling it on a separate line. It only works for functions with the type `fn(...) -> (..., error)` See [error handling](../functions/error-handling) for details.

## Types

- `bool`: This is a builtin type for [booleans](../types/boolean).
- `byte`: This is a builtin type for [bytes](../types/byte).
- `char`: This is a builtin type for [characters](../types/character).
- `complex`: This is a builtin type for [complex numbers](../types/complex).
- `decimal`: This is a builtin type for [decimal numbers](../types/decimal).
- `enum`: This is a keyword for defining [enums](../types/enum).
- `error`: This is a builtin type for [errors](../types/error).
- `int`, `uint`, `bigint`: These are builtin types for [integers](../types/int).
- `str`: This is a builtin type for [strings](../types/string).
- `struct`: This is a keyword for defining [structs](../types/struct).
- `type`: This is a keyword for defining [types](../types/type).
- `union`: This is a keyword for defining a [union type](../types/union).
- `mut`: This keyword allows a value to be [mutable](../variables). It can be used with any type.

## Loops

- `for`, `in`: These are used in [`for` loops](../loops#for-loops). The `for` signifies that it's a `for` loop, the value before `in` creates a variable that gets the value for each iteration of the loop, and the value after `in` is the array over which the loop is iterating.
- `while`: This is used in [`while` loops](../loops#while-loops). The `while` signifies that it's a `while` loop, and the condition after `while` is checked each time the loop is run. If the condition is true, the loop continues, if not, it breaks and the program continues execution after the loop.
- `break`, `continue`: These are used to break and continue loops, and can optionally be used with labels. See [Labels, `break`, and `continue`](../loops#labels-break-and-continue).

## Modules

- `import`: This is used to [import](../modules) modules from other files or libraries.
- `as`: This is used to [alias imports](../modules#import-aliases) to give them custom names, instead of depending on the filename.

## Operators

- `and`: This is the boolean [AND operator](../operators#logical).
- `or`: This is the boolean [OR operator](../operators#logical).
- `not`: This is the boolean [NOT operator](../operators#logical).

## Other

- `return`: This is used to return values from a block. This can be returning values from a function, or returning a value from a conditional block into a variable, like an `if-else` statement or `match` statement.
