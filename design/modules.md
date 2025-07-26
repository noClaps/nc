# Import statements

Import statements import the whole module and assign it to a variable. Specific things from the module cannot be imported, such as JavaScript's `import { function } from pkg` or Python's `from pkg import function`. Wildcard imports like Python's `from pkg import *` are also not allowed.

```nc
import "std/math" // assigned to variable `math`

decimal phi = (math.sqrt(5) + 1) / 2
```

This is beneficial because different modules can export functions with the same name, and it'll always be clear where each function came from, at the cost of typing slightly more.

Each file is a module, and you can import from files with:

```nc
import "path/to/mod" // assigned to `mod`
```

## Import aliases

You can give an import a specific name if you'd like to. This can be useful if you're using multiple modules with the same name that would conflict with one another, or you'd like to use a shorter name for one of your modules. It can also be useful if your module's file name is kebab-cased, for instance, which would not be a valid variable name.

```nc
import "myModule" as mod // assigned to variable `mod`
import "path/to/my-mod" as myMod // `my-mod` is not a valid variable name
```
