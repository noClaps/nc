# Functions

Functions are defined with the `fn` keyword. The return type of the function must be declared if a function returns any value.

```nc
fn <name>( <type> arg1, <type> arg2, ... ) -> <return type> {
  // Arguments are immutable
  // Any variables declared inside are scoped to the function
}
```

Example function:

```nc
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
