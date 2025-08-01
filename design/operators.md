# Operators

All operators (except the pipe operator) will require its arguments to be of the same type. So, it will not be possible to add an `int` to a `decimal` without first converting one or the other to the respective type.

## Logical

```nc
// and
true and true // true
true and false // false
false and false // false
```

```nc
// or
true or true // true
true or false // true
false or false // false
```

```nc
// not
not true // false
not false // true
```

## Concatenation

Because strings are arrays of characters, the concatenation operator is the same for both. This operator can only apply to arrays and strings, it will error if used with any other type.

```nc
[a, b, c] <> [d, e, f] == [a, b, c, d, e, f]
```

```nc
"Hello" <> " " <> "world" == "Hello world"
```

You can also use the concatenation operator between maps, provided that they are of the same type:

```nc
[str]int monthsToNum1 = ["jan": 1, "feb": 2, "mar": 3]
[str]int monthsToNum2 = ["apr": 4, "may": 5, "jun": 6]
[str]int monthsToNum3 = ["jul": 7, "aug": 8, "sep": 9]
[str]int monthsToNum4 = ["oct": 10, "nov": 11, "dec": 12]

[str]int monthsToNum = monthsToNum1 <> monthsToNum2 <> monthsToNum3 <> monthsToNum4
// ["jan": 1, "feb": 2, "mar": 3, "apr": 4, ... , "dec": 12]

[str]decimal differentType = ["new": 13d]
monthsToNum <> differentType // error: cannot concatenate maps of different types
```

## Arithmetic

```nc
// addition
1 + 2 == 3
```

```nc
// substraction
2 - 1 == 1
```

```nc
// exponent
2 ** 6 == 64
```

```nc
// modulo
10 % 4 == 2
```

### Multiplication

Multiplication is apparently a very difficult problem to try and solve. Luckily, a lot of smart people have already solved the problem of multiplying large numbers efficiently. We can use something similar to implementations in other languages, as detailed in [this video](https://www.youtube.com/watch?v=AMl6EJHfUWo), though it's also worth exploring some of the newer algorithms to see if they're performant enough to be worth implementing.

::: info NOTE
In case the video gets taken down, my main takeaway from that video was to use normal long multiplication for smaller numbers ($O(n^2)$), and Karatsuba's algorithm ($O(n^{\log_2 3})$) for larger ones. There are also the Toom-Cook ($O(n^\frac{\log(2k-1)}{\log k}) \text{ for any } k \ge 2$) and Schönhage-Strassen ($O(n \log n \log \log n)$) algorithms which are more efficient, though likely with some tradeoffs.

The more modern/complex algorithms are Fürer ($O(n \log n \cdot 2^{\Theta(\log^* n)})$) and Harvey-Hoeven ($O(n \log n)$). These are theoretically the most efficient algorithms, though it seems like their constants are simply too large to be feasible.
:::

The combination of algorithms being used for multiplication, as well as the thresholds at which the switch from one algorithm to another, will need to be explored and tested to find the best combinations.

The syntax will be similar to other languages, no surprises there:

```nc
3 * 2
```

### Division

The division operator can be used to create decimal numbers, and there are a number of different cases to handle for how it will behave.

If the division operator is used to assign to a `decimal`, it will create a `decimal`, but only if the two arguments are literals, and not integer variables:

```nc
decimal myDec = 5/2
assert(myDec == decimal(5, 2))

fn someFunc(decimal n) {
  assert(n == decimal(5, 2))
}
someFunc(5/2)

int a = 5
int b = 2
decimal myDec = a/b // error: integer value cannot be assigned to decimal
```

If the arguments to the division operator are both `decimal`s, the output will be a `decimal`. If they are both `int`s, it will be an `int`, etc.

```nc
int a = 5
int b = 2
int c = a/b
assert(c == 2)

decimal a = 5
decimal b = 2
decimal c = a/b
assert(c == 2.5)
```

If the division operator is being used to assign to an `any` function parameter, the arguments will first be parsed as integers, and then decimals:

```nc
fn someFunc(any a) {
  println(a, typeof(a))
}
someFunc(5/2) // 2 int
someFunc(5.0/2.0) // 2.5 decimal
```

## Comparisons

```nc
// equality
1 == 1
```

```nc
// inequality
1 != 2
```

```nc
// less than
1 < 2
```

```nc
// greater than
1 > 0
```

```nc
// less than or equal to
5 <= 6
5 <= 5
```

```nc
// greater than or equal to
7 >= 4
7 >= 7
```

## Bit arithmetic

Bit arithmetic will only be allowed for integers.

```nc
// bit shift left
1 << 4 == 16
```

```nc
// bit shift right
6 >> 1 == 3
```

```nc
// bitwise and
27 & 1 == 1
```

```nc
// bitwise or
8 | 1 == 9
```

```nc
// bitwise xor
12 ^ 1 == 13
```

```nc
// bitwise not
~6 == -7
```

## Pipes

Similar to functional programming, we can use a `|>` pipe operator to pass values from one function to the next. This will automatically fill in the first value of the receiving function with the value being passed into it. For example, something like this:

```nc
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

```nc
// Same function definitions as above

int[] numbers = [1, 2, 3, 4, 5]
                  |> square()
                  |> addToAll(5)
```

While this may seem pointless for a simple case like this, it becomes incredibly helpful for situations where a piece of data needs to be passed around a lot. For example:

```nc
// Some data to be transformed
DataStruct[] newData = data
                         |> map(someFn)
                         |> filter(someFilter)
                         |> sort(someSort)
                         |> take(10) // Take the first 10 values
```
