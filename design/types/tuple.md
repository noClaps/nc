# Tuple

These will work similarly to how they do in Go and Python. While there is no `tuple` keyword, you can define tuples using the types used in them. For example:

```nc
int a, str b = (1, "Hi")
a == 1 // type int
b == "Hi" // type str
```

Tuples themselves cannot be none, though their values can be:

```nc
(str?, str?) result = ("Hello", none)
result == ("Hello", none) // type (str?, str?)
```

You can use this to return multiple values from a function, for example:

```nc
fn myFunc(int a, int b) -> (int, int) {
  int c = a + b
  int d = a - b

  return (c, d)
}

(int, int) vals = myFunc(2, 4)
vals == (6, -2)
```

You can also access individual elements of a tuple with their index:

```nc
(int, str, decimal) vals = (1, "hi", 2.5)
vals[0] == 1
vals[1] == "hi"
vals[2] == 2.5
```

You can "destructure" a tuple by assigning its values to another tuple:

```nc
(int, int) vals = (1, 2)
int a, int b = vals

a == 1
b == 2
```

You can also partially destructure a tuple:

```nc
(int, int, int) vals = (1, 2, 3)
int a, (int, int) b = vals

a == 1
b == (2, 3)
```
