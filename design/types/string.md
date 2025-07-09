# Character and String

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

#### Multiline strings

You can declare a multiline string using `"""`. This will also dedent the string to the position of the closing `"""`, and also escape any `"` inside. For example:

```
str myString = """
  Hello World
    Indented line
  Unindented line
  """

print(myString)
```

will output

```
Hello World
  Indented line
Unindented line
```

You can also use values inside multiline strings using the same syntax as described in [Format strings](#format-strings). For example:

```
print("""
3 + 5 = {3 + 5}
8 + 10 = {8 + 10}
""")
```

will output:

```
3 + 5 = 8
8 + 10 = 18
```
