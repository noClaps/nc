# Comments

Comments start with `//` and can be in the middle or end of a line.

```
// This is a comment
int a = 2 // This is a comment after a statement
```

Doc comments can be written with `///`:

```
import "std/math"

/// The value of pi
decimal pi = 3.141592653589793

/// A function to find the square root of an array of integers
/// @param The array of integers to square root
/// @returns An array of square roots
fn sqrtAll(int[] nums) -> decimal[] {
  mut decimal[] rootVals = []
  for i in nums {
    rootVals[i] = math.sqrt(nums[i])
  }

  return rootVals
}
```

These behave the same as normal comments since it's only the `//` that matters, all the other `/`s are optional. However, the LSP will only recognise `///` as doc comments.
