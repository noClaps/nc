# Pattern matching

A `match` statement behaves similarly to `switch` statements in most other languages, though with the added requirement that all possible cases must be met. In cases like booleans, all possible cases can be met easily, as it can only be `true` or `false`, so a match statement like this is appropriate:

```
bool isValid = false

match isValid {
  true -> {
    print("It's valid!")
  }
  false -> {
    print("It's not valid!")
  }
}
```

However, in cases where all possible values cannot be checked, or only some of the cases are valid, the `else` keyword must be used instead to handle all remaining cases:

```
int myNum = 7

match myNum {
  1 -> {
    print("First")
  }

  5 -> {
    print("Fifth")
  }

  else -> {
    print("Something else")
  }
}
```

You can also use functions and methods in match statements, as long as they return a boolean, and the value being checked is the first parameter:

```
fn checkIfAnimal(str animal, str check) -> boolean {
  return animal == check
}

str animal = "Dog"
match animal {
  "Dog" -> {
    // Equivalent to `if animal == "Dog"`
    print("Woof")
  }

  "Cat" -> {
    print("Meow")
  }

  "Mouse" -> {
    print("Squeek")
  }

  checkIfAnimal("Bird") -> {
    // Can call functions that return a boolean value
    // The first value is prefilled with the value being checked, `animal` in this case
    // Equivalent to `if checkIfAnimal(animal, "Bird")`

    print("Chirp")
  }

  .startsWith("B") -> {
    // Can have methods of the type, for example str.startsWith()
    // Equivalent to `if animal.startsWith("B")`

    print("Starts with a B")
  }

  else -> {
    // Required to have an else unless all cases are met
    print("Not a recognised pet")
  }
}
```

Pattern matching can also be used to conditionally assign a value to a variable based on the value of another variable, provided that each branch returns the same type, or `none` if assigning to an optional.

```
int index = 2

char letter = match index {
  1 -> { return 'A' }
  2 -> { return 'B' }
  5 -> { return 'E' }
  else -> { return 'Z' }
}

letter == "B"
```

You can also use ranges in your branches when matching on integer or decimal values.

```
int num = 5

match num {
  -1 -> { print("Is negative 1") }
  $:4 -> { print("Small number") }
  5:10 -> {
    // this matches
    print("Medium number")
  }
  11:$ -> { print("Large number") }
  else -> {
    // unreachable in this case, but since `int` can be negative, this branch
    // needs to exist
  }
}

// Medium number
```

In this case, the `$` in the range means the integer limit in either direction, so `MIN_INTEGER` in the `$:4` case and `MAX_INTEGER` in the `11:$` case. However, the range is not actually expanded into an array, and only the finite ends (`4` and `11`, in this case) are checked against. However, if a step range (like `0:2:10`) is used, then the array is created and checked for inclusion.

If multiple cases match, the one that was defined first will be chosen.

```
int num = 5

match num {
  $:5 -> {
    // this matches
    print("Small number")
  }
  $:10 -> {
    // this also matches, but the previous branch already matched so it doesn't
    // reach here
    print("Medium number")
  }
  else -> { print("Large number") }
}

// Small number
```
