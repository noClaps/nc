# Variables

```nc
<type> <name> = <value>
```

All variables are constant and immutable by default

```nc
int a = 1
a = 2 // Error
```

To make a variable mutable, you can add the `mut` keyword

```nc
mut int b = 2
b = 3 // Works!
```
