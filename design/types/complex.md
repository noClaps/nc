# Complex

Complex numbers are represented by the `complex` type, and are defined as a collection of the real and imaginary parts:

```
struct complex {
  decimal real
  decimal imag
}
```

The syntax looks like the math syntax for complex numbers:

```
complex z1 = 3+4i
complex z2 = 3    // complex without imaginary component
complex z3 = 4i   // complex without real component
```
