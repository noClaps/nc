# Import statements

Import statements import the whole module and assign it to a variable. Specific things from the module cannot be imported, such as JavaScript's `import { function } from pkg` or Python's `from pkg import function`. Wildcard imports like Python's `from pkg import *` are also not allowed.

```
import math // assigned to variable `math`

decimal phi = (math.sqrt(5) + 1) / 2
```

This is beneficial because different modules can export functions with the same name, and it'll always be clear where each function came from, at the cost of typing slightly more.
