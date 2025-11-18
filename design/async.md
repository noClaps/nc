# Async

Say you have some function that takes a long time to run, and you'd like to be able to do other things in the meantime while that function resolves. Normally, you'd have to run the function and just wait until it completes before continuing.

```nc
fn someFunction() -> int {
  // this function takes a long time to resolve
}

fn main() {
  int result = someFunction() // have to wait for this to complete
}
```

There might be other smaller tasks that could be done in the meantime, but execution gets blocked, even if the result may not be needed until much later. One way you could get around this is to simply call the function later when it's needed, but you're simply delaying the wait until later, even if you had all the necessary inputs for the function early on.

This is where `async` comes in. You can use the `async` keyword to tell a function call to start execution immediately in the background, while the rest of your code continues as normal. This creates a Future, which is signified by a `*` at the end of the type (e.g. `int*`). This Future will hold the return value of the function, but since it can't be known when the function has completed execution, you have to `await` the Future to block execution until it has a value, and then get the value out.

```nc
fn someFunction() -> int {
  // this function takes a long time to resolve
}

fn main() {
  int* result = async someFunction() // start executing the function here

  // do some other work while `someFunction` runs in the background

  int value = await result // block execution until `someFunction` resolves
}
```

This allows you to do work while your slow, expensive function executes in the background simultaneously. Note that the function itself was not marked as `async`, but rather the function call was. This avoids the problem of function coloring in other languages, where once a function is marked as `async`, every other function that calls it must also be marked as `async`.

You can also have functions that return value-error tuples store their return value in a Future:

```nc
fn someFunction() -> (int, error) {
  // do something
}

fn main() {
  (int, error)* future = async someFunction()

  int value = await future catch err {
    return err
  }
}
```
