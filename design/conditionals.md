# Conditionals

## If-else statement

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

## Pattern matching

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
