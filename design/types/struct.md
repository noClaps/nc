# Struct

There are no classes in the language, so structs are the next best option. Structs can be defined using the `struct` keyword and a label, which will then be used as the "type".

```nc
struct Fraction {
  int numerator,
  int denominator,
}

Fraction myFrac = {.numerator = 10, .denominator = 31}
```

Members of a struct can be accessed with `<struct>.<member>`, and you can loop over the members of a struct with a for loop:

```nc
for mem, val in myFrac {
  print("{mem} {val}")
}
// prints:
// numerator 10
// denominator 31
```

If your struct is mutable, you can update any of its members:

```nc
mut Fraction myFrac = {.numerator = 1, .denominator = 10}
myFrac.numerator *= 2

myFrac == Fraction{.numerator = 2, .denominator = 10}
```

Only when looping over a mutable struct, you can update the struct directly from within the loop with:

```nc
mut Fraction myFrac = {.numerator = 1, .denominator = 10}

for mem, val in myFrac {
  myFrac.mem = val + 1
}

assert(myFrac == Fraction{.numerator = 2, .denominator = 11})
```
