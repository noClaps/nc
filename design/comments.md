# Comments

Comments start with `//` and can be in the middle or end of a line.

```
// This is a comment
int a = 2 // This is a comment after a statement
```

Multi-line comments can be written with `/* */` syntax, similar to C.

```
/*
  This is a multi-line comment.

  You can even nest comments!
  /*
    Like this!
  */
*/
```

Doc comments can be written with `///` or `/** */` for single- and multi-line comments, respectively:

```
import math

/// The value of pi
decimal pi = 3.141592653589793

/**
 * A function to find the square root of an array of integers
 * @param The array of integers to square root
 * @returns An array of square roots
 */
fn sqrtAll(int[] nums) -> float[] {
  mut float[] rootVals = []
  for i in nums {
    rootVals[i] = math.sqrt(nums[i])
  }

  return rootVals
}
```

These behave the same as normal comments since it's only the `//` and `/* */` that matter, all the other `/` and `*` are optional. However, the LSP will only recognise `///` and `/** */` as doc comments.
