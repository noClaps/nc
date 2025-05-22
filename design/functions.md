# Functions

Functions are defined with the `fn` keyword. The return type of the function must be declared if a function returns any value.

```
fn <name>( <type> arg1, <type> arg2, ... ) -> <return type> {
  // Arguments are immutable
  // Any variables declared inside are scoped to the function
}
```

Example function:

```
fn hello(int a, int b) -> str {
  a = 2 // Error
  mut int b = b // Creates new scoped variable `b`, let's call it `bscope`.
  b = 2 // This will edit `bscope`, not the argument value `b`

  return "Hello, world!"
}
// `bscope` is not available here

str hello = hello(a, b) // pass in `int a` and `int b` from above
print(hello)
```

## Partial application

```
fn add(int a, int b) -> int {
  return a + b
}

fn addA = add(1) // Partially applied function. `addA` now has the `int a` parameter of `add` prefilled, and only takes one parameter `int b`

int c = addA(2) // 3
```

This can be useful to create functions from a base "template" function. For example, if you were creating an HTML library, you might use a function `el(str tag, str content)` as a base, and build all of your elements off of that:

```
fn el(str tag, str content) -> str {
  return "<{tag}>{content}</{tag}>"
}

fn html = el("html") // fn html(str content) -> str
fn body = el("body") // fn body(str content) -> str
// ...

body("Hello World") // <body>Hello World</body>
```

## Overloading

Functions can be overloaded with different implementations of the same function. This is usually helpful when you want to have multiple parameter types, for example. However, because the language is strictly typed, each overload must have its own implementation.

```
fn sqrt(int n) -> decimal {
  // implementation for int
}

fn sqrt(decimal n) -> decimal {
  // implementation for decimal
}
```

You can even have functions with the same input parameters, since the return type can determine which function implementation was used.

```
fn sqrt(int n) -> int {
  // returns int
}

fn sqrt(int n) -> decimal {
  // returns decimal
}
```

## Functions as values

You can pass a function as an argument to other functions, or assign them as values to variables.

```
// Don't need the full function signature in the type as this is a function definition
fn add = fn(int a, int b) -> int {
  return a + b
}

// This function takes a function `operation` as its third parameter
// `operation` should be a function that takes in 2 int values and returns an int value
// Any function that doesn't match this signature will cause an error

fn calculator(int a, int b, (fn(int, int) -> int) operation) -> int {
  return operation(a, b)
}

int answer = calculator(3, 5, add)
answer == 8
```

Whenever a function signature is used as a type, it must be surrounded with parentheses `(fn(<type> arg1, <type> arg2, ...) -> <return type>)`. For example:

```
struct Calculator {
  (fn(int, int) -> int) add,
  (fn(int, int) -> int) substract,
  (fn(int, int) -> int) multiply,
  (fn(int, int) -> int) divide,
}
```

## Error handling

If a function throws an error, it must be declared in the function definition with an exclamation mark on the return type:

```
fn addThrows(int a, int b) -> int! {
  if a < b {
    panic("first argument cannot be less than second argument")
  }

  return a + b
}
```

Throwing functions must be called with `try`:

```
int c = try addThrows(3, 5) // throws
int d = try addThrows(5, 2)

d == 7
```

Any function that calls another function marked with `try` must itself be declared as a throwing function.

```
fn calc(int a, int b, str op) -> int! { // marked as throwing
  match op {
    "+" { return try addThrows(a, b) }
  }
}
```

If a function throws but does not return anything, it can be marked as throwing with `-> !`:

```
fn isValid(str source, str check) -> ! { // marked as throwing without return value
  if source != check {
    panic("Not valid")
  }
}
```

Functions that throw will immediately exit out of the program if they error. If you want to handle errors differently, you must return them as values from the function, usually in a [tuple](#tuples):

```
fn addError(int a, int b) -> (int?, error?) {
  if a < b {
    return (undefined, error("first argument cannot be less than second argument"))
  }

  return (a + b, undefined)
}

int? c, error? err = addError(3, 5)
if err != undefined || c == undefined {
  print(err)
}

// `c` is of type `int` here
```

Alternatively, you can handle the error inside the function, and simply return `undefined`:

```
fn addUndef(int a, int b) -> int? {
  if a < b {
    print("first argument cannot be less than second argument")
    return undefined
  }

  return a + b
}

int? c = addUndef(3, 5)
c == undefined

int? d = addUndef(5, 2)
d == 7
```

Handling the error inside the function and returning `undefined` is more correct if you're building an application and you don't want an error to crash the application. If you want the application to crash on error, throwing is the correct option. Finally, if you're building a library to be used by other people, you likely want to return errors as values so that the user of your library can handle the error how they wish.

However, the language does not enforce this on you, and you are free to handle errors however you wish.

## Named arguments

Function calls can have named arguments, though this is optional and only for clarity, or in case you'd like to pass in arguments in a different order.

```
fn add(int a, int b) -> int {
  return a + b
}

add(1, 2) // a = 1, b = 2
add(a: 1, b: 2) // Same as above
add(b: 1, a: 2) // Can declare them in any order now since they're named
```

## Optional arguments

Parameters can be defined as [optionals](#optional-values), but these cannot be excluded from the function call if they are undefined. You must pass in `undefined` as an argument if you are using an optional argument.

```
fn optAddNum(int a, int? b) -> int {
  if (b == undefined) {
    return a
  }

  return a + b
}

int c = optAddNum(5, undefined)
```

Not passing the second value will create a [curried function](#currying) instead:

```
fn optAddTo5 = optAddNum(5)
int c = optAddTo5(undefined)
```
