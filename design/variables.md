# Variables and Types

## Variable declaration

```
<type> <name> = <value>
```

All variables are constant and immutable by default

```
int a = 1
a = 2 // Error
```

To make a variable mutable, you can add the `mut` keyword

```
mut int b = 2
b = 3 // Works!
```

## Types

### Int and BigInt

The `int` type will be a 64-bit signed integer type. There will also be a `uint` which will be a 64-bit unsigned integer.

You can declare `int`s by simply writing a number without a decimal point, or converting from a different type by using the `int()` function:

```
int myNum = 1
int myNum = int(1)
```

A `uint` will need a `u` at the end of the number, or the `uint()` function can be called to convert an `int` to a `uint`:

```
uint myNum = 1u // cannot be negative
uint myNum = uint(1) // equivalent to the above expression
```

::: danger
If a value outside the range of `uint` or `int` is passed, it will wrap around to fit within the bounds.
:::

There will also be an arbitrary-precision integer type called `bigint`, which will be incompatible with the other `int` types, and will be slower. You can convert between `bigint` and `int`, but operations must be between the same type, e.g. you cannot add a `bigint` and an `int`. Converting from `bigint` to `int` will cap the value at the 64-bit signed integer limits.

You can declare a `bigint` by calling the `bigint()` function on an `int` or `uint`, or by adding an `n` to the end of the number:

```
bigint myBigInt = 1n
bigint myBigInt = bigint(1) // equivalent to the above expression
bigint myBigInt = bigint(1u) // you can also convert uints
```

If any of the integer conversion functions are used on a decimal, then only the integer part will be returned. So, for example, `int(2.5)` will become `2`.

#### Ranges

You can declare a range using `<start>:<stop>` or `<start>:<step>:<stop>`. Though this is not a data type on its own, you can use it to quickly create arrays of integers:

```
int[] nums = [1:10]
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

int[] evens = [0:2:10]
// [0, 2, 4, 6, 8, 10]
```

The range cannot be infinite. If `<step>` is positive or not included (in which case it's 1), then `<start>` must be less than `<stop>`. If `<start>` is greater than `<stop>`, then `<step>` must be negative. The range will start at the `<start>` value, and stop at less than or equal to the `<stop>` value if `<step>` is positive, and greater than or equal to the `<stop>` value if `<step>` is negative. For example:

```
int[] odds = [1:2:20]
// [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
```

Ranges are inclusive on both ends. You can also use a range to get a slice out of an array or string, and create a new array or string from that:

```
int[] fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
int[] fib5 = fibonacci[0:4] // [0, 1, 1, 2, 3]
int[] fibEven = fibonacci[0:2:fibonacci.len-1] // [0, 1, 3, 8, 21, 55]

str helloWorld = "Hello World"
str hello = helloWorld[0:4] // "Hello"
```

You can also use ranges to quickly reverse arrays or strings:

```
int[] nums = [1, 2, 3, 4, 5]
int[] reversedNums = nums[nums.len-1:-1:0] // [5, 4, 3, 2, 1]

str hello = "Hello"
str reversedHello = hello[hello.len-1:-1:0] // "olleH"
```

When using ranges to get a slice, you cannot have negative values, and this will throw an error. Negative indexing is only allowed when accessing a single value.

The type of range created depends on the types of the `<start>`, `<step>` and `<stop>` values. All three values must be of the same type.

To create an `int` range, you can simply use integers for these values, e.g. `1:2:20`. To create a `uint` or `bigint` range, you can use the `u` and `n` suffixes, respectively. For example:

```
uint[] unums = [1u:2u:20u]
bigint[] bignums = [1n:2n:20n]
```

### Decimals

Programming languages have had an issue with how to accurately represent decimal values. Most of them have followed the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard for floating point values, and that works fine, but it comes with some limitations. I'm sure you've seen `0.1 + 0.2 == 0.3` resolving to `false` in most languages, including Python, C++, JavaScript, etc. I won't get into the reason why that is here, but what if we instead looked at math to handle that for us?

In math, any rational decimal value can be represented as a fraction. For example, `0.4` can be written as `4/10`, and `0.333...` can be written as `1/3`. We can use this knowledge to create a `Fraction` data structure that looks like this:

```
struct Fraction {
  int numerator
  int denominator
}
```

Given that all numbers have to be rational in traditional programming languages anyway, we can get rid of the issues that irrational numbers like π can cause, simply by rounding them to a sane value. This will also allow values like `1/3` to be represented with full accuracy, and operations like multiplication and division can be massively simplified by multiplying or dividing the numerator or denominator. However, this will slightly complicate the implementations of addition and substraction, as an algorithm for the least common multiple of two denominators will need to be found.

Additionally, a struct will generally be slower to work with than a simple floating point value, but I believe the performance cost may be worth it for the accuracy it will bring. The `decimal` data type (which will be slower but with higher accuracy) will be represented with this Fraction structure. However, whenever the value needs to be displayed, such as when it is printed to the screen, it will be printed in decimal form, and can optionally be written in fraction form.

Decimals can be declared with any number that has a decimal point, or by using the `decimal()` function:

```
// All of these have the same output
decimal myDecimal = 2d
decimal myDecimal = 2.0d
decimal myDecimal = decimal(2)
decimal myDecimal = decimal(2.0)
```

### Structs

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

### Arrays

Arrays are defined as a struct of the length and the array itself:

```
struct Array {
  uint len
  uint cap
  <type>[] vals
}
```

While this may seem recursive, this is only the internal representation, for you, the array will look like any normal array:

```
int[] myNums = [1, 2, 3, 4, 5]
```

You can have an array of any type, simply by adding a `[]` to the end of the type name in the declaration.

The values of the array are immutable unless the `mut` keyword is used, and arrays are strictly typed, so you can only have one type of value in an array.

```
int[] nums = [1, 2, 3, 4, 5]
nums[2] = 10 // error: mutating immutable value

mut int[] nums2 = [1, 2, 3, 4, 5]
nums[3] = 3.5 // error: `decimal` value in an `int` array
```

All arrays are dynamically sized, and would usually be called "lists" in other languages.

Arrays are 0-indexed, so the first value of the array is at the 0th index. Negative indexing is also allowed, and will count from the end of the array, starting at `-1`, which is the last value.

```
int[] nums = [1, 2, 3, 4, 5]
nums[0] == 1
nums[1] == 2
nums[-1] == 5
```

In terms of implementation, arrays will be implemented similarly to Python's lists, where they grow dynamically and exponentially, doubling in size every time the capacity fills up.

The length of the array can be accessed with `<array>.len`.

### Maps

Maps are similar to arrays except that you can have a custom key type, instead of it being an integer. The syntax for declaring a map is `[<key type>]<value type>`. So, for example, a map with a string key and a decimal value would be declared as:

```
[str]decimal myMap = {
  "string1": 1d,
  "string2": 2d,
  // ...
  "string10": 10d,
}
```

Trailing commas are allowed in map declarations. Similar to arrays, you can access the length of the map with `<map>.len`. Values of a map can be accessed with `<map>[<key>]`. For example, for the map above, we can access the value corresponding to `"string5"` with:

```
myMap["string5"] // 5d
```

If the map is mutable, you can write to the map using the same syntax:

```
mut [str]decimal myMap = {
  // same as above
}

myMap["string11"] = 11d
```

You can use a `for` loop to loop through the keys of a map:

```
for key in myMap {
  print(key, value)
}
// string1 1.0
// string2 2.0
// string3 3.0
// string4 4.0
// string5 5.0
// string6 6.0
// string7 7.0
// string8 8.0
// string9 9.0
// string10 10.0
// string11 11.0
```

Maps are implemented using [Swiss tables](https://abseil.io/about/design/swisstables) for high read/write performance.

Maps differ from objects in that they don't have methods, but you can use [functions as values](#functions-as-values) to store functions in a map:

```
[str](fn(int, int) -> int) myFunctionMap = {
  "add": fn(int a, int b) -> int { return a + b }
  "multiply": fn(int a, int b) -> int { return a * b }
  // ...
}
int sum = myFunctionMap["add"](1, 2)
sum == 3
```

All of the function signatures in a map must be the same, as the compiler is unable to determine which function was called at compile time, and so would not be able to type-check the argument and return values.

### Characters and Strings

Strings are defined as an [array](#arrays) of characters. Of course, this is all internal, and they will be represented to you as `"string"`. However, this will allow you to access the length of the string with `<string>.len`.

Characters are a single UTF-8 rune, represented by the `char` type. This means that characters that take up multiple bytes, like emojis or CJK characters. The benefit of this is that, if you're trying to access a character, you will get the full character you expect, even if it spans multiple bytes.

```
str myString = "cookie 🍪"

for i in myString {
  print(myString[i])
}
// c
// o
// o
// k
// i
// e
//
// 🍪
```

#### Format strings

You can insert values into format strings using `{<value>}`:

```
print("This is a string with a number inside: {5 + 2}")
// This is a string with a number inside: 7
```

If you'd like to escape the `{}` characters, you can simply add a backslash `\{}`:

```
print("This is an escaped string with an expression inside: \{5 + 2}")
// This is an escaped string with an expression inside: {5 + 2}
```

All values are converted to strings using the `str()` function when passed into a format string. If you'd like to use your own format, you can convert your value to a string yourself before passing it into the format string. For example:

```
fn intToDeciamlStr(int a) -> str {
  return str(decimal(a))
}

print("My number is {intToDecimalStr(10)}")
// "My number is 10.0
```

### Booleans

Booleans are represented by the `bool` type, and can only be one of two values: `true` and `false`.

```
bool isLangCool = true
bool isLangLame = false
```

Internally, these are represented by a single 8-bit byte, that can be either `0` (false) or `1` (true).

### Optional values

Optional values can be declared by adding a `?` to the end of the type name. This declares that the value may be undefined, but since this language is strictly typed, all cases must be handled if the value is used somewhere. You can use the `undefined` keyword to initialise a variable as undefined:

```
int? myNum = undefined
```

However, this will not be directly compatible with the regular type, and so a check must be done first to ensure that the value exists before it can be used.

```
fn optAddNum(int a, int? b) -> int {
  if b == undefined {
    return a
  }

  // type of b is now `int` since the undefined case was handled above
  return a + b
}
```

However, if the check is not done, an error is thrown:

```
fn optAddNum(int a, int? b) {
  return a + b // error: undefined case not handled
}
```

Since optional values are technically a superset of regular values, you can pass regular values to optionals, but the opposite is not true.

```
int? num1 = 7 // this is okay
int num2 = undefined // error: cannot assign undefined to a non-optional value

fn myFunction(str? arg1, str arg2) {
  // some implementation...
}

myFunction("Hello", "world") // this is okay
myFunction(undefined, "world") // this is also okay
myFunction("Hello", undefined) // error: cannot pass undefined to a non-optional parameter
```

There are no non-null assertions, so the undefined case must always be handled.

### Tuples

These will work similarly to how they do in Go and Python. While there is no `tuple` keyword, you can define tuples using the types used in them. For example:

```
(int, str) (a, b) = (1, "Hi")
a == 1 // type int
b == "Hi" // type str
```

Tuples themselves cannot be undefined, though their values can be:

```
(str?, str?) result = ("Hello", undefined)
result == ("Hello", undefined) // type (str?, str?)
```

You can use this to return multiple values from a function, for example:

```
fn myFunc(int a, int b) -> (int, int) {
  int c = a + b
  int d = a - b

  return (c, d)
}

(int, int) vals = myFunc(2, 4)
vals == (6, -2)
```

You can also access individual elements of a tuple with their index:

```
(int, str, decimal) vals = (1, "hi", 2.5)
vals[0] == 1
vals[1] == "hi"
vals[2] == 2.5
```

You can "destructure" a tuple by assigning its values to another tuple:

```
(int, int) vals = (1, 2)
(int, int) (a, b) = vals

a == 1
b == 2
```

### Errors

Errors are a type, represented by `error`. They are simply a string, but with a key difference: printing a string (or any other type) will output it to `stdout`, while printing an error will output it to `stderr`.
