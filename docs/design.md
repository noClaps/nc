# Language Design

The name, much like the language, is a work in progress.

## Import statements

Import statements import the whole module and assign it to a variable. Specific things from the module cannot be imported, such as JavaScript's `import { function } from pkg` or Python's `from pkg import function`. Wildcard imports like Python's `from pkg import *` are also not allowed.

```
import math // assigned to variable `math`

float phi = (math.sqrt(5) + 1) / 2
```

This is beneficial because different modules can export functions with the same name, and it'll always be clear where each function came from, at the cost of typing slightly more.

## Comments

Comments start with `//` and can be in the middle or end of a line.

```
// This is a comment
int a = 2 // This is a comment after a statement
```

Multi-line comments can be written with `/* */` syntax, similar to C.

```
/*
  This is a multi-line comment.

  You can even nest comments!
  /*
    Like this!
  */
*/
```

Doc comments can be written with `///` or `/** */` for single- and multi-line comments, respectively:

```
import math

/// The value of pi
decimal pi = 3.141592653589793

/**
 * A function to find the square root of an array of integers
 * @param The array of integers to square root
 * @returns An array of square roots
 */
fn sqrtAll(int[] nums) -> float[] {
  mut float[] rootVals = []
  for i in nums {
    rootVals[i] = math.sqrt(nums[i])
  }

  return rootVals
}
```

These behave the same as normal comments since it's only the `//` and `/* */` that matter, all the other `/` and `*` are optional. However, the LSP will only recognise `///` and `/** */` as doc comments.

## Variable declaration and Types

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

If any of the integer conversion functions are used on a float or decimal, then only the integer part will be returned. So, for example, `int(2.5)` will become `2`.

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

string helloWorld = "Hello World"
string hello = helloWorld[0:4] // "Hello"
```

You can also use ranges to quickly reverse arrays or strings:

```
int[] nums = [1, 2, 3, 4, 5]
int[] reversedNums = nums[nums.len-1:-1:0] // [5, 4, 3, 2, 1]

string hello = "Hello"
string reversedHello = hello[hello.len-1:-1:0] // "olleH"
```

When using ranges to get a slice, you cannot have negative values, and this will throw an error. Negative indexing is only allowed when accessing a single value.

The type of range created depends on the types of the `<start>`, `<step>` and `<stop>` values. All three values must be of the same type.

To create an `int` range, you can simply use integers for these values, e.g. `1:2:20`. To create a `uint` or `bigint` range, you can use the `u` and `n` suffixes, respectively. For example:

```
uint[] unums = [1u:2u:20u]
bigint[] bignums = [1n:2n:20n]
```

### Floats and Decimals

Programming languages have had an issue with how to accurately represent decimal values. Most of them have followed the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) standard for floating point values, and that works fine, but it comes with some limitations. I'm sure you've seen `0.1 + 0.2 == 0.3` resolving to `false` in most languages, including Python, C++, JavaScript, etc. I won't get into the reason why that is here, but what if we instead looked at math to handle that for us?

In math, any rational decimal value can be represented as a fraction. For example, `0.4` can be written as `4/10`, and `0.333...` can be written as `1/3`. We can use this knowledge to create a `Fraction` data structure that looks like this:

```
struct Fraction {
  int numerator
  int denominator
}
```

Given that all numbers have to be rational in traditional programming languages anyway, we can get rid of the issues that irrational numbers like π can cause, simply by rounding them to a sane value. This will also allow values like `1/3` to be represented with full accuracy, and operations like multiplication and division can be massively simplified by multiplying or dividing the numerator or denominator. However, this will slightly complicate the implementations of addition and substraction, as an algorithm for the least common multiple of two denominators will need to be found.

Additionally, a struct will generally be slower to work with than a simple floating point value, but I believe the performance cost may be worth it for the accuracy it will bring. While the `float` data type will be consistent with IEEE 754 standards, the `decimal` data type (which will be slower but with higher accuracy) will be represented with this Fraction structure. However, whenever the value needs to be displayed, such as when it is printed to the screen, it will be converted to the `float` type by default, and can optionally be displayed as a fraction.

Floats can be declared with any number that has a decimal point, or by using the `float()` function:

```
float myFloat = 2.0
float myFloat = float(2) // same as the above expression
```

Decimals can be declared by adding a `d` to the end of a number, both with and without the decimal point, or by using the `decimal()` function:

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
nums[3] = 3.5 // error: `float` value in an `int` array
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
[string]decimal myMap = {
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
mut [string]decimal myMap = {
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
[string](fn(int, int) -> int) myFunctionMap = {
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
string myString = "cookie 🍪"

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

All values are converted to strings using the `string()` function when passed into a format string. If you'd like to use your own format, you can convert your value to a string yourself before passing it into the format string. For example:

```
fn intToFloatStr(int a) -> string {
  return string(float(a))
}

print("My number is {intToFloatStr(10)}")
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

fn myFunction(string? arg1, string arg2) {
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
(int, string) (a, b) = (1, "Hi")
a == 1 // type int
b == "Hi" // type string
```

Tuples themselves cannot be undefined, though their values can be:

```
(string?, string?) result = ("Hello", undefined)
result == ("Hello", undefined) // type (string?, string?)
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
(int, string, float) vals = (1, "hi", 2.5)
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

## Functions

Functions are defined with the `fn` keyword. The return type of the function must be declared if a function returns any value.

```
fn <name>( <type> arg1, <type> arg2, ... ) -> <return type> {
  // Arguments are immutable
  // Any variables declared inside are scoped to the function
}
```

Example function:

```
fn hello(int a, int b) -> string {
  a = 2 // Error
  mut int b = b // Creates new scoped variable `b`, let's call it `bscope`.
  b = 2 // This will edit `bscope`, not the argument value `b`

  return "Hello, world!"
}
// `bscope` is not available here

string hello = hello(a, b) // pass in `int a` and `int b` from above
print(hello)
```

### Partial application

```
fn add(int a, int b) -> int {
  return a + b
}

fn addA = add(1) // Partially applied function. `addA` now has the `int a` parameter of `add` prefilled, and only takes one parameter `int b`

int c = addA(2) // 3
```

This can be useful to create functions from a base "template" function. For example, if you were creating an HTML library, you might use a function `el(string tag, string content)` as a base, and build all of your elements off of that:

```
fn el(string tag, string content) -> string {
  return "<{tag}>{content}</{tag}>"
}

fn html = el("html") // fn html(string content) -> string
fn body = el("body") // fn body(string content) -> string
// ...

body("Hello World") // <body>Hello World</body>
```

### Overloading

Functions can be overloaded with different implementations of the same function. This is usually helpful when you want to have multiple parameter types, for example. However, because the language is strictly typed, each overload must have its own implementation.

```
fn sqrt(int n) -> float {
  // implementation for int
}

fn sqrt(float n) -> float {
  // implementation for float
}

fn sqrt(decimal n) -> float {
  // implementation for decimal
}
```

You can even have functions with the same input parameters, since the return type can determine which function implementation was used.

```
fn sqrt(int n) -> float {
  // returns float
}

fn sqrt(int n) -> decimal {
  // returns decimal
}
```

### Functions as values

You can pass a function as an argument to other functions, or assign them as values to variables.

```
// Don't need the full function signature in the type as this is a function definition
fn add = fn(int a, int b) -> int {
  return a + b
}

// This function takes a function `operation` as its third parameter
// `operation` should be a function that takes in 2 int values and returns an int value
// Any function that doesn't match this signature will cause an error

fn calculator(int a, int b, (fn(int, int) -> int) operation) -> int {
  return operation(a, b)
}

int answer = calculator(3, 5, add)
answer == 8
```

Whenever a function signature is used as a type, it must be surrounded with parentheses `(fn(<type> arg1, <type> arg2, ...) -> <return type>)`. For example:

```
struct Calculator {
  (fn(int, int) -> int) add,
  (fn(int, int) -> int) substract,
  (fn(int, int) -> int) multiply,
  (fn(int, int) -> int) divide,
}
```

### Error handling

If a function throws an error, it must be declared in the function definition with an exclamation mark on the return type:

```
fn addThrows(int a, int b) -> int! {
  if a < b {
    panic("first argument cannot be less than second argument")
  }

  return a + b
}
```

Throwing functions must be called with `try`:

```
int c = try addThrows(3, 5) // throws
int d = try addThrows(5, 2)

d == 7
```

Functions that throw will immediately exit out of the program if they error. If you want to handle errors differently, you must return them as values from the function, usually in a [tuple](#tuples):

```
fn addError(int a, int b) -> (int?, error?) {
  if a < b {
    return (undefined, error("first argument cannot be less than second argument"))
  }

  return (a + b, undefined)
}

(int?, error?) (c, err) = addError(3, 5)
if err != undefined || c == undefined {
  print(err)
}

// `c` is of type `int` here
```

Alternatively, you can handle the error inside the function, and simply return `undefined`:

```
fn addUndef(int a, int b) -> int? {
  if a < b {
    print("first argument cannot be less than second argument")
    return undefined
  }

  return a + b
}

int? c = addUndef(3, 5)
c == undefined

int? d = addUndef(5, 2)
d == 7
```

Handling the error inside the function and returning `undefined` is more correct if you're building an application and you don't want an error to crash the application. If you want the application to crash on error, throwing is the correct option. Finally, if you're building a library to be used by other people, you likely want to return errors as values so that the user of your library can handle the error how they wish.

However, the language does not enforce this on you, and you are free to handle errors however you wish.

### Named arguments

Function calls can have named arguments, though this is optional and only for clarity, or in case you'd like to pass in arguments in a different order.

```
fn add(int a, int b) -> int {
  return a + b
}

add(1, 2) // a = 1, b = 2
add(a: 1, b: 2) // Same as above
add(b: 1, a: 2) // Can declare them in any order now since they're named
```

### Optional arguments

Parameters can be defined as [optionals](#optional-values), but these cannot be excluded from the function call if they are undefined. You must pass in `undefined` as an argument if you are using an optional argument.

```
fn optAddNum(int a, int? b) -> int {
  if (b == undefined) {
    return a
  }

  return a + b
}

int c = optAddNum(5, undefined)
```

Not passing the second value will create a [curried function](#currying) instead:

```
fn optAddTo5 = optAddNum(5)
int c = optAddTo5(undefined)
```

## Loops

### For loops

```
for i in 1:20 {
  print(i) // Prints 1, 2, 3, ..., 20
}

for j in 1:2:20 { // You can increment/decrement by other values
  print(j) // Prints 1, 3, 5, ..., 19
}
```

For loops will always loop over an array:

- [Ranges](#ranges) like `1:20` or `1:2:20` are arrays of numbers, and it loops over the values of that array.
- Structs are converted into an array of tuples of `(member, value)`, and it loops over each of those tuples.
- Arrays, strings and maps are looped over by their indices, `uint` for arrays and strings and the key defined for maps.

### While loops

```
mut int j = 2
while j > 0 {
  j--
}
// `j` is available here since it was declared outside
```

## Conditions

### If-else statement

If-else statements are similar to most other languages. The main difference in this language is that there are no ternaries or "Elvis" operators `?:`, so all values must go through pattern matching or fully written if-else statements.

```
float pi = 3.14
float euler = 2.71

if pi == 3.14 {
  print("Pi moment")
} else if euler == 2.71 {
  print("Euler moment")
} else {
  print("Not cool")
}
```

Additionally, single-line statements without the braces `{}` are not allowed. So, a statement like:

```
if pi == 3.14 print("Pi")
```

is not allowed, as it makes the syntax unclear and inconsistent.

The condition for if-else statements must be a boolean, so functions or values that return anything else will error.

```
int myNum = 5

// This will error as myNum is not a boolean
if myNum {
  print(myNum)
}
```

### Pattern matching

A `match` statement behaves similarly to `switch` statements in most other languages, though with the added requirement that all possible cases must be met. In cases like booleans, all possible cases can be met easily, as it can only be `true` or `false`, so a match statement like this is appropriate:

```
bool isValid = false

match isValid {
  true {
    print("It's valid!")
  }

  false {
    print("It's not valid!")
  }
}
```

However, in cases where all possible values cannot be checked, or only some of the cases are valid, the `default` keyword must be used instead to handle all remaining cases:

```
int myNum = 7

match myNum {
  1 {
    print("First")
  }

  5 {
    print("Fifth")
  }

  default {
    print("Something else")
  }
}
```

You can also use functions and methods in match statements, as long as they return a boolean, and the value being checked is the first parameter:

```
fn checkIfAnimal(string animal, string check) -> boolean {
  return animal == check
}

string animal = "Dog"
match animal {
  "Dog" {
    // Equivalent to `if animal == "Dog"`
    print("Woof")
  }

  "Cat" {
    print("Meow")
  }

  "Mouse" {
    print("Squeek")
  }

  checkIfAnimal("Bird") {
    // Can call functions that return a boolean value
    // The first value is prefilled with the value being checked, `animal` in this case
    // Equivalent to `if checkIfAnimal(animal, "Bird")`

    print("Chirp")
  }

  .startsWith("B") {
    // Can have methods of the type, for example String.startsWith()
    // Equivalent to `if animal.startsWith("B")`

    print("Starts with a B")
  }

  default {
    // Required to have a default unless all cases are met
    print("Not a recognised pet")
  }
}
```

Pattern matching can also be used to conditionally assign a value to a variable based on the value of another variable, provided that each branch returns the same type, or `undefined` if assigning to an optional.

```
int index = 2

char letter = match index {
  1 { return "A" }
  2 { return "B" }
  5 { return "E" }
  default { return "Z" }
}

letter == "B"
```

## Operators

All operators (except the pipe operator) will require its arguments to be of the same type. So, it will not be possible to add an `int` to a `float` without first converting one or the other to the respective type.

### Logical

```
// and
true && true // true
true && false // false
false && false // false
```

```
// or
true || true // true
true || false // true
false || false // false
```

```
// not
!true // false
!false // true
```

### Concatenation

Because strings are arrays of characters, the concatenation operator is the same for both. This operator can only apply to arrays and strings, it will error if used with any other type.

```
[a, b, c] <> [d, e, f] == [a, b, c, d, e, f]
```

```
"Hello" <> " " <> "world" == "Hello world"
```

You can also use the concatenation operator between maps, provided that they are of the same type:

```
[string]int monthsToNum1 = {"jan": 1, "feb": 2, "mar": 3}
[string]int monthsToNum2 = {"apr": 4, "may": 5, "jun": 6}
[string]int monthsToNum3 = {"jul": 7, "aug": 8, "sep": 9}
[string]int monthsToNum4 = {"oct": 10, "nov": 11, "dec": 12}

[string]int monthsToNum = monthsToNum1 <> monthsToNum2 <> monthsToNum3 <> monthsToNum4
// {"jan": 1, "feb": 2, "mar": 3, "apr": 4, ... , "dec": 12}

[string]decimal differentType = {"new": 13d}
monthsToNum <> differentType // error: cannot concatenate maps of different types
```

### Arithmetic

```
// addition
1 + 2 == 3
```

```
// substraction
2 - 1 == 1
```

```
// division
5 / 2 == 2
5.0 / 2.0 == 2.5
```

```
// exponent
2 ** 6 == 64
```

```
// modulo
10 % 4 == 2
```

#### Multiplication

Multiplication is apparently a very difficult problem to try and solve. Luckily, a lot of smart people have already solved the problem of multiplying large numbers efficiently. We can use something similar to implementations in other languages, as detailed in [this video](https://www.youtube.com/watch?v=AMl6EJHfUWo), though it's also worth exploring some of the newer algorithms to see if they're performant enough to be worth implementing.

::: info NOTE
In case the video gets taken down, my main takeaway from that video was to use normal long multiplication for smaller numbers ($O(n^2)$), and Karatsuba's algorithm ($O(n^{\log_2 3})$) for larger ones. There are also the Toom-Cook ($O(n^\frac{\log(2k-1)}{\log k}) \text{ for any } k \ge 2$) and Schönhage-Strassen ($O(n \log n \log \log n)$) algorithms which are more efficient, though likely with some tradeoffs.

The more modern/complex algorithms are Fürer ($O(n \log n \cdot 2^{\Theta(\log^* n)})$) and Harvey-Hoeven ($O(n \log n)$). These are theoretically the most efficient algorithms, though it seems like their constants are simply too large to be feasible.
:::

The combination of algorithms being used for multiplication, as well as the thresholds at which the switch from one algorithm to another, will need to be explored and tested to find the best combinations.

The syntax will be similar to other languages, no surprises there:

```
3 * 2
```

### Comparisons

```
// equality
1 == 1
```

```
// inequality
1 != 2
```

```
// less than
1 < 2
```

```
// greater than
1 > 0
```

```
// less than or equal to
5 <= 6
5 <= 5
```

```
// greater than or equal to
7 >= 4
7 >= 7
```

### Bit arithmetic

Bit arithmetic will only be allowed for integers.

```
// bit shift left
1 << 4 == 16
```

```
// bit shift right
6 >> 1 == 3
```

```
// bitwise and
27 & 1 == 1
```

```
// bitwise or
8 | 1 == 9
```

```
// bitwise xor
12 ^ 1 == 13
```

```
// bitwise not
~6 == -7
```

### Pipes

Similar to functional programming, we can use a `|>` pipe operator to pass values from one function to the next. This will automatically fill in the first value of the receiving function with the value being passed into it. For example, something like this:

```
fn square(int[] numbers) -> int[] {
  mut int[] numbers = numbers

  for i in numbers {
    numbers[i] = numbers[i] ** 2
  }

  return numbers
}

fn addToAll(int[] numbers, int adding) -> int[] {
  mut int[] numbers = numbers

  for i in numbers {
    numbers[i] += adding
  }

  return numbers
}

mut int[] numbers = [1, 2, 3, 4, 5]
numbers = square(numbers) // [1, 4, 9, 16, 25]
numbers = addToAll(numbers, 5) // [6, 10, 15, 21, 30]
```

can be turned into a pipeline, like so:

```
// Same function definitions as above

int[] numbers = [1, 2, 3, 4, 5]
                  |> square()
                  |> addToAll(5)
```

While this may seem pointless for a simple case like this, it becomes incredibly helpful for situations where a piece of data needs to be passed around a lot. For example:

```
// Some data to be transformed
DataStruct[] newData = data
                         |> map(someFn)
                         |> filter(someFilter)
                         |> sort(someSort)
                         |> take(10) // Take the first 10 values
```
