# Error handling

If a function throws an error, it must be declared in the function definition with an exclamation mark on the return type:

```nc
fn addThrows(int a, int b) -> int! {
  if a < b {
    true -> { panic("first argument cannot be less than second argument") }
    _ -> { return a + b }
  }
}
```

Throwing functions must be called with `try`:

```nc
int c = try addThrows(3, 5) // throws
int d = try addThrows(5, 2)

d == 7
```

Any function that calls another function marked with `try` must itself be declared as a throwing function.

```nc
fn calc(int a, int b, str op) -> int! { // marked as throwing
  if op {
    "+" -> { return try addThrows(a, b) }
    _ -> { panic("Invalid operation") }
  }
}
```

If a function throws but does not return anything, it can be marked as throwing with `-> !`:

```nc
fn isValid(str source, str check) -> ! { // marked as throwing without return value
  if source {
    check -> {}
    _ -> { panic("Not valid") }
  }
}
```

Functions that throw will immediately exit out of the program if they error. If you want to handle errors differently, you must return them as values from the function, usually in a [tuple](../types/tuple), and catch them with the `catch` keyword:

```nc
fn addError(int a, int b) -> (int, error) {
  if a < b {
    true -> { return 0, error("first argument cannot be less than second argument") }
    _ -> { return a + b, none }
  }
}

// the error goes into the `err` variable, but you can name this whatever you'd like
int c = addError(3, 5) catch err {
  print(err)
}

// `c` is of type `int` here
```

Alternatively, you can handle the error inside the function, and simply return `none`:

```nc
fn addOpt(int a, int b) -> int? {
  if a < b {
    true -> {
      print("first argument cannot be less than second argument")
      return none
    }
    _ -> { return a + b }
  }
}

int? c = addOpt(3, 5)
c == none

int? d = addOpt(5, 2)
d == 7
```

Handling the error inside the function and returning `none` is more correct if you're building an application and you don't want an error to crash the application. If you want the application to crash on error, throwing is the correct option. Finally, if you're building a library to be used by other people, you likely want to return errors as values so that the user of your library can handle the error how they wish.

However, the language does not enforce this on you, and you are free to handle errors however you wish.
