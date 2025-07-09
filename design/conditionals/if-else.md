# If-else statements

If-else statements are similar to most other languages. The main difference in this language is that there are no ternaries or "Elvis" operators `?:`, so all values must go through pattern matching or fully written if-else statements.

```
decimal pi = 3.14
decimal euler = 2.71

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
