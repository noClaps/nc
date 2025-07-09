# Optional arguments

Parameters can be defined as [optionals](../types/optional), but these cannot be excluded from the function call if they are not defined. You must pass in `none` as an argument if you are using an optional argument.

```
fn optAddNum(int a, int? b) -> int {
  if (b == none) {
    return a
  }

  return a + b
}

int c = optAddNum(5, none)
```

Not passing the second value will create a [partially applied function](./partial-application) instead:

```
fn optAddTo5 = optAddNum(5)
int c = optAddTo5(none)
```
