# Any

`any` is a special [union](./union) type that includes every type defined in the program. It is not a real type that can be used for variables, and is only available for use in function parameters.

```nc
fn print(any value) {
  // ...
}

any val = 5 // error: `any` cannot be used as a type for variables
```

It is generally recommended to not use `any` where you can, and to use other ways to solve the problem, such as with [function overloading](../functions/overloading), or using a [type](./type) as a function parameter for generics.

However, it can be useful in certain cases, such as where your function has a [variadic parameter](../functions/variadic) and needs to accept values of any type. In that case, the type of each argument must be determined before it can be used anywhere:

```nc
fn stringify(any[] args...) -> str[] {
  mut str[] vals = []
  for i in args {
    // type of `args[i]` is `any`, and the actual type is determined when `stringify` is called
    vals = arrays.append(vals, str(args[i]))
  }
}

str[] vals = stringify(1, "hi", 3.14, 'π', 7u, (0, 1), 1+2i)
assert(vals == ["1", "hi", "3.14", "π", "7", "(0, 1)", "1+2i"])

str[] vals = stringify(1, 2, '3', "4", none, 6.0) // error: argument `none` is invalid
```

When `any` is used in a function parameter, the type-checking for that function is deferred to when the function is called, and is repeated every time the function is called to type-check the arguments. This is generally slower than defining a function with a set type, though the cost is only at compile time.
