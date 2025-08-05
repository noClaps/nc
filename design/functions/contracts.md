# Contracts

Function contracts work with [overloading](./overloading) to allow you to define conditions for your function parameters. Say you have a function that can take a value of a type but returns different types depending on the value. Without function contracts you'd have to pass in a type parameter or return [`any`](../types/any):

```nc
fn someFunc(int n) -> any {
  match n {
    0 -> { return "hi" } // str
    1 -> { return 1.0 } // decimal
    2 -> { return 2i } // complex
    else -> { return n } // int
  }
}
```

This could still be type-safe as the compiler can just check what's being returned when the function is called, but it's not as clear to read, and there are more complicated situations that could be slower or more difficult to type-check. This is where function contracts become useful.

With function contracts, you can define a boolean condition for your parameters, and that function will only be called if that condition matches. So the above function could be written as:

```nc
fn someFunc(int n if n == 0) -> str { return "hi" }
fn someFunc(int n if n == 1) -> decimal { return 1.0 }
fn someFunc(int n if n == 2) -> complex { return 2i }
fn someFunc(int n) -> int { return n } // default case if none of the above match
```

This way, you don't have to pattern-match inside the function and return `any`, you can directly return the type you need from the function. Additionally, the function can be type-checked quickly too, since it only needs to be checked once instead of on every function call.

The condition can be anything that resolves to a boolean at compile time, including function calls and comparisons. For instance:

```nc
import "std/math"

union Number {
  int,
  decimal,
  complex
}

fn mod(Number n if typeof(n) == int) -> int {
  // `n` is an int here
  if n < 0 { return -n }
  return n
}
fn mod(Number n if typeof(n) == complex) -> decimal {
  // `n` is a complex here
  return math.sqrt(n.real * n.real + n.imag * n.imag)
}
fn mod(Number n if typeof(n) == decimal) -> decimal {
  // `n` is a decimal here
  if n < 0 { return -n }
  return n
}
```

In this case, because the function can have different behaviors even though its parameter has the same type (`Number`), because the function contract specifies what the type the function should be acting on.

And finally, of course, the classic functional programming Fibonacci function:

```nc
fn fibonacci(int n if n == 0 || n == 1) -> int { return n }
fn fibonacci(int n) -> int { return fibonacci(n - 1) + fibonacci(n - 2) }
```
