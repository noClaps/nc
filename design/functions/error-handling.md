# Error handling

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

Functions that throw will immediately exit out of the program if they error. If you want to handle errors differently, you must return them as values from the function, usually in a [tuple](./types/tuple):

```
fn addError(int a, int b) -> (int?, error?) {
  if a < b {
    return (none, error("first argument cannot be less than second argument"))
  }

  return (a + b, none)
}

int? c, error? err = addError(3, 5)
if err != none || c == none {
  print(err)
}

// `c` is of type `int` here
```

Alternatively, you can handle the error inside the function, and simply return `none`:

```
fn addOpt(int a, int b) -> int? {
  if a < b {
    print("first argument cannot be less than second argument")
    return none
  }

  return a + b
}

int? c = addOpt(3, 5)
c == none

int? d = addOpt(5, 2)
d == 7
```

Handling the error inside the function and returning `none` is more correct if you're building an application and you don't want an error to crash the application. If you want the application to crash on error, throwing is the correct option. Finally, if you're building a library to be used by other people, you likely want to return errors as values so that the user of your library can handle the error how they wish.

However, the language does not enforce this on you, and you are free to handle errors however you wish.
