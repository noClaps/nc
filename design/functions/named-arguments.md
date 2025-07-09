# Named arguments

Function calls can have named arguments, though this is optional and only for clarity, or in case you'd like to pass in arguments in a different order.

```
fn add(int a, int b) -> int {
  return a + b
}

add(1, 2) // a = 1, b = 2
add(a: 1, b: 2) // Same as above
add(b: 1, a: 2) // Can declare them in any order now since they're named
```
