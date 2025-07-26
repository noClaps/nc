# Overloading

Functions can be overloaded with different implementations of the same function. This is usually helpful when you want to have multiple parameter types, for example. However, because the language is strictly typed, each overload must have its own implementation.

```nc
fn sqrt(int n) -> decimal {
  // implementation for int
}

fn sqrt(decimal n) -> decimal {
  // implementation for decimal
}
```

You can even have functions with the same input parameters, since the return type can determine which function implementation was used.

```nc
fn sqrt(int n) -> int {
  // returns int
}

fn sqrt(int n) -> decimal {
  // returns decimal
}
```
