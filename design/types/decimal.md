# Decimals

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
