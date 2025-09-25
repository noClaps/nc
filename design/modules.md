# Import statements

Import statements import the whole module and assign it to a variable. Specific
things from the module cannot be imported, such as JavaScript's `import {
function } from pkg` or Python's `from pkg import function`. Wildcard imports
like Python's `from pkg import *` are also not allowed.

```nc
mod math = import("std/math")

decimal phi = (math.sqrt(5) + 1) / 2
```

This is beneficial because different modules can export functions with the same
name, and it'll always be clear where each function came from, at the cost of
typing slightly more.

Each file is a module, and you can import from files by calling the `import()`
function and assigning the value to a variable of type `mod`:

```nc
mod someMod = import("path/to/mod")
```

The `mod` type is a special struct containing all of the exported symbols from
a module, along with their (non-exported) dependencies. This is useful, for
instance, if an exported function has side effects. For example:

```nc
// std/math

pub decimal PI = 3.14159265358979323

pub uint MIN_UINT = 0
pub uint MAX_UINT = 0xffffffffffffffff

pub int MIN_INT = -0x7fffffffffffffff
pub int MAX_INT = 0x7fffffffffffffff

// random number generator
// this is an example of something that might depend on non-exported symbols
int A = 8121
int C = 28411
int M = 134456
mut int seed = 123456789
pub fn randomLCG() -> int {
  seed = (A * seed + C) % M
  return seed
}
```

would get turned into:

```nc
mod {
  pub decimal PI = 3.14159265358979323

  pub uint MIN_UINT = 0
  pub uint MAX_UINT = 0xffffffffffffffff

  pub int MIN_INT = -0x7fffffffffffffff
  pub int MAX_INT = 0x7fffffffffffffff

  mut int seed = 123456789
  pub fn randomLCG() -> int {
    seed = (8121 * seed + 28411) % 134456
    return seed
  }
}
```

You would then be able to use this as:

```nc
mod math = import("std/math")

println("pi = {math.PI}") // pi = 3.14159265358979323
println("{math.MIN_UINT} <= uint <= {math.MAX_UINT}") // 0 <= uint <= ...
println(randomLCG()) // 69376
```

You can also write these `mod` structs yourself, simply by declaring
`mod <name>`. For example:

```nc
mod complex {
  pub struct Complex {
    pub decimal real,
    pub decimal imag
  }

  pub fn add(Complex a, Complex b) -> Complex {
    return {
      .real: a.real + b.real,
      .imag: a.imag + b.imag
    }
  }
}
```

Inside a module, you can write code as usual, and it will be automatically
converted into its struct representation during compilation.

## Exporting symbols

As noted in the example above, symbols can be exported using the `pub` keyword.
This includes fields of structs, variables, functions, etc. You can even export
other modules, if you wanted to!
