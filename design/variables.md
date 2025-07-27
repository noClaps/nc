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

## Shadowing

You can redefine variables with the same name within the same or lower scopes using shadowing, including changing the mutability of the variable.

```nc
int a = 10 // lets call this `a1`

// change mutability of a
mut int a = 20 // different variable from `a1`, let's call this `a2`

// change type of a
str a = "hi" // different variable from `a1` and `a2`, let's call this `a3`

// redeclare within a lower scope
{
  str a = "annyeonghaseyo" // different from `a1`, `a2`, and `a3`, let's call this `a4`
}

// `a4` is no longer available, we're back to `a3`
assert(a == "hi")
```
