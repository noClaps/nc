# Optional values

Optional values can be declared by adding a `?` to the end of the type name. This declares that the value may be undefined, but since this language is strictly typed, all cases must be handled if the value is used somewhere. You can use the `undefined` keyword to initialise a variable as undefined:

```
int? myNum = undefined
```

However, this will not be directly compatible with the regular type, and so a check must be done first to ensure that the value exists before it can be used.

```
fn optAddNum(int a, int? b) -> int {
  if b == undefined {
    return a
  }

  // type of b is now `int` since the undefined case was handled above
  return a + b
}
```

However, if the check is not done, an error is thrown:

```
fn optAddNum(int a, int? b) {
  return a + b // error: undefined case not handled
}
```

Since optional values are technically a superset of regular values, you can pass regular values to optionals, but the opposite is not true.

```
int? num1 = 7 // this is okay
int num2 = undefined // error: cannot assign undefined to a non-optional value

fn myFunction(str? arg1, str arg2) {
  // some implementation...
}

myFunction("Hello", "world") // this is okay
myFunction(undefined, "world") // this is also okay
myFunction("Hello", undefined) // error: cannot pass undefined to a non-optional parameter
```

There are no non-null assertions, so the undefined case must always be handled.
