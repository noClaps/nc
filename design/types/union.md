# Union

Unions allow a value to potentially have multiple types.

```
union Number {
  int,
  decimal, // trailing comma allowed
}
```

Note that the `Number` type defined by the union is not directly compatible with any of its constituent types, and is a separate new type of its own. So for instance, you cannot add a `Number` to an `int`, even if your `Number` value is an integer, at least not without defining your own `fn add(Number a, int b)` function.

In order to get the constituent type information out of the union, you can do a `match` on the type like so:

```
Number a = 3.14 // The type is Number, but it's a decimal inside

match typeof(a) { // typeof() is a builtin function
  int => {
    // `a` has a type of int here, you can use it as such
    print("{a} is an int")
    print(a + 5) // valid
  }

  decimal => { print("{a} is a decimal") }
}
```

Notice that there's no need for an `else` case because that's all the possibilities for the type.
