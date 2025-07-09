# Struct

There are no classes in the language, so structs are the next best option. Structs can be defined using the `struct` keyword and a label, which will then be used as the "type".

```
struct Fraction {
  int numerator
  int denominator
}

Fraction myFrac = {.numerator: 10, .denominator: 31}
```

Members of a struct can be accessed with `<struct>.<member>`, and you can loop over the members of a struct with a for loop:

```
for (mem, val) in myFrac {
  print(mem, val)
}
// prints:
// numerator 10
// denominator 31
```

If your struct is mutable, you can update any of its members:

```
mut Fraction myFrac = {.numerator: 1, .denominator: 10}
myFrac.numerator *= 2

myFrac == Fraction{.numerator: 2, .denominator: 10}
```

Structs can also have "methods", which are the same as functions but with the first value being filled as the struct it is being used on. This means that structs cannot be modified themselves by methods, as the arguments to functions are immutable. Instead, each method must return the modified struct, which can then be reassigned to the original struct.

```
struct Fraction {
  int numerator
  int denominator

  fn addToNum(int a) -> Self {
    mut Self newFrac = self
    newFrac.numerator = self.numerator + a

    return newFrac
  }
}

mut Fraction myFrac = {.numerator: 10, .denominator: 31}
myFrac = myFrac.addToNum(5) // have to reassign

myFrac == Fraction{.numerator: 15, .denominator: 31}
```

You can use the `Self` type and the `self` keyword within method definitions to refer to the struct type and the struct itself, respectively.

Realistically, methods are just a convenience feature, and generally it would be clearer to write them as functions, though there are certain cases where they may be useful, such as in [pattern matching](#pattern-matching).

As [functions are values](#functions-as-values), you can store functions in structs as a value:

```
struct Fraction {
  int numerator
  int denominator

  (fn(Self, int) -> Self) multiply
}

fn multiply(Fraction a, int b) -> Fraction {
  return Fraction{
    .numerator: a.numerator * b,
    .denominator: a.denominator,
    .multiply: multiply,
  }
}

mut Fraction myFrac = {
  .numerator: 1,
  .denominator: 5,
  .multiply: multiply
}
myFrac = myFrac.multiply(myFrac, 2)

myFrac == Fraction{
  .numerator: 2,
  .denominator: 5,
  .multiply: multiply
}
```

As the function is being used as a value, it must be included in every initialisation of the struct. Function values cannot be used in [pattern matching](#pattern-matching) like methods are to test the value, and do not prefill the first value with the struct itself. However, you can use the `Self` type in function signatures to refer to the struct type.

Additionally, since these functions are used as values, you cannot declare them inline, and you must declare them during initialisation. This can have some benefits, such as including different implementations for different structs of the same type:

```
struct MyStruct {
  int val
  (fn(Self, int) -> int) function
}

fn add(MyStruct str, int num) -> int {
  return str.val + num
}

fn multiply(MyStruct str, int num) -> int {
  return str.val * num
}

MyStruct addingStruct = { .val: 1, .function: add }
MyStruct multiplyingStruct = { .val: 1, .function: multiply }
```

Structs are similar to objects in object-oriented languages, but their behavior and representation in memory is that of a struct, since you cannot add more keys than are defined in the struct like you can with objects, and methods are actually functions with the first parameter (`self`) prefilled with the struct itself, and cannot mutate the struct directly.
