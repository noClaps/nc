# Variadic functions

Sometimes a function, like [`print`](../builtin/functions#print-and-println), needs to take an arbitrary number of arguments. In cases like this, variadic functions can be used:

```nc
fn print(str[] args...) {
  // ...
}
```

You can also define a variadic parameter with a single type:

```nc
fn join(str[] args...) -> str {
  mut str output = ""
  for i in args {
    output <>= args[i]
  }
  return output
}
```

You can also have a variadic parameter in the middle of non-variadic parameters:

```nc
fn sum(int first, int[] nums..., int last) -> int {
  mut int total = first
  for i in nums {
    total += nums[i]
  }
  return total + last
}

assert(sum(1, 2, 3, 4, 5) == 15)
assert(sum(1, 2) == 3)
```

Note that in this case, the minimum number of arguments to the function is 2, not 3, because the variadic array can simply be empty. The first argument is assigned to `first`, the last argument to `last`, and all remaining arguments in the middle to `nums`. In the `print` function above, the minimum number of arguments was 0, not 1.

However, you cannot have multiple variadic parameters in a single function declaration.

```nc
fn join(str[] list1..., str[] list2...) { // error: cannot have multiple variadic parameters
  // ...
}
```

If you have an array of values that you'd like to pass in to a variadic function, you can use `...` to "spread" them.

```nc
str[] greetings = ["hello", "bonjour", "hola", "aloha", "hallo", "konnichiwa", "annyeonghaseyo"]

fn join(str[] strings...) -> str {
  mut str output = ""
  for i in strings {
    output <>= strings[i]
  }
  return output
}

str longString = join(greetings...)
```
