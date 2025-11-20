# Conditionals

The only conditional statements in the language are `if` statements. However, they're implemented slightly differently to most other languages you might be used to. Instead of just a boolean check, the `if` statement in NC does pattern matching too.

Let's start simple, with a normal `if` condition:

```nc
decimal pi = 3.14

if pi == 3.14 {
  true -> { print("Pi is (approximately) correct") }
  false -> { print("Pi is probably wrong!") }
}
```

As you can see, the boolean resolves to one of two branches, either true or false. However, there's generally not many cases where you _actually_ need a boolean conditional like this, and a better way of writing it would be to use pattern matching. Here's the above example, this time written using pattern matching:

```nc
decimal pi = 3.14

if pi {
  3.14 -> { print("Pi is (approximately) correct") }
  else -> { print("Pi is probably wrong!") }
}
```

While this may seem overkill for a simple example, it allows you to extend your logic really easily, by simply adding more branches as you need them, and requires you to at least consider the behavior of other branches.

The `_` value is there as a fallback to match all remaining branch. It's especially useful when you're attempting to match against something can have infinite possibilities, like a string or number, although you can use it anywhere else.

## Empty branches

If you don't want to do anything on a branch, you can just have it point to a blank block:

```nc
bool isBirthday = true

if isBirthday {
  true -> { print("Happy birthday!") }
  else -> {}
}
```

## Function calls

You can also use functions in your branches, as long as the function resolves to a [boolean](./types/boolean):

```nc
fn checkIfAnimal(str animal, str check) -> bool {
  return animal == check
}

str animal = "Dog"

if animal {
  "Dog" -> { print("Woof!") }
  "Cat" -> { print("Meow!") }
  "Mouse" -> { print("Squeek!") }
  checkIfAnimal("Bird") -> { print("Chirp!") } // calls checkIfAnimal(animal, "Bird")
  else -> { print("Not a recognised pet") }
}
```

## Value assignment

You can also use pattern matching to conditionally apply a value to a variable based on the value of another variable, provided that each branch returns the same type, or `none` if assigning to an [optional](./types/optional).

```nc
int index = 2

char letter = if index {
  1 -> { 'A' }
  2 -> { 'B' }
  5 -> { 'E' }
  else -> { 'Z' }
}

assert(letter == 'B')
```

## Ranges for matching numbers

You can also use ranges in your branches when matching on integer or decimal values.

```nc
int num = 5

if num {
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

## Multiple cases

If multiple cases match, the one that was defined first will be chosen.

```nc
int num = 5

if num {
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

## More advanced comparisons

If you'd like to do more advanced comparisons, such as matching on a struct field, or array or tuple element, you can use the `if` keyword without any symbol after it, and that will act as an `if true {}`.

For example, if you'd like to match on a tuple:

```nc
(str, int) person = ("Alex", 22)

if {
  person[0] == "Nathan" -> { print("Banned") }
  person[1] < 18 -> { print("Children not allowed") }
  else -> { print("Welcome {person[0]}") }
}

// Welcome Alex
```

or an array:

```nc
int[] values = [1, 2, 3, 4, 5]

if {
  values.len == 1 -> { print("Length is 1") }
  values.len == 5 -> { print("Length is 5") }
  values[$] == 10 -> { print("Last value is 10") }
  values[0] < 0 -> { print("First value is negative") }
  else -> { print("All other cases") }
}

// Length is 5
```

or a struct:

```nc
struct Point {
  int x,
  int y,
  int z
}

Point p = {.x = 3, .y = -4, .z = 5}

if {
  p.x < 0 -> { print("x-coordinate is negative") }
  p.x >= 0 and p.y >= 0 -> { print("x- and y-coordinates are positive") }
  p.z == 5 -> { print("z-coordinate is 5") }
  else -> { print("All other cases") }
}

// z-coordinate is 5
```

Of course, this works on any conditional, even the ones described in the above sections. Going back to the simple example at the beginning, you can also write it like this:

```nc
decimal pi = 3.14

if {
  pi == 3.14 -> { print("Pi is (approximately) correct") }
  else -> { print("Pi is probably wrong!") }
}
```
