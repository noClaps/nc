# NC Language Design
The name, much like the language, is a work in progress.

## Import statements
Import statements can either import the whole module and assign it to a variable or specific things from a module.
Import statements like Python's `import * from pkg` are not allowed.

```
import std
import {function, variable} from "./package.nc"
```

## Comments
Comments start with `//` and can be in the middle or end of a line. Multi-line comments are not allowed.
```
// This is a comment
int a = 2 // This is a comment after a statement
```

## Variable declaration

```
[type] [name] = [value]
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

## Function declarations

```
[return type] [name]( [type] [arg], [type] [arg], ... ) {
	// Arguments are immutable
    // Any variables declared inside are scoped to the function
}
```

Example function:
```
string hello(int a, int b) {
	a = 2 // Error
	mut int b = b // Creates new scoped variable `b`, let's call it `bscope`.
	b = 2 // This will edit `bscope`, not the argument value `b`

	return "Hello, world!"
}
// `bscope` is not available here

string hello = hello(a, b) // pass in `int a` and `mut int b` from above
print(hello)
```

# Loops
`i` is scoped to the loop and will not be available outside.

For loops:
```
for i in 1...20 {
	// i = 1, 2, 3, 4, 5, ..., 20
}

for i in 1..<20 {
	// i = 1, 2, 3, 4, 5, ..., 19
}

// `i` is not available here.
```

While loops:
```
mut int j = 2
while j > 0 {
	j--
}
// `j` is available here since it was declared outside
```

## Conditions

If-else statement:
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

Switch-case:
```
string animal = "Dog"
switch animal {
	case "Dog" {
		print("Woof")
	}

	case "Cat" {
		print("Meow")
	}

	case "Mouse" {
		print("Squeek")
	}

	default {
		// Required to have a default
		print("Not a recognised pet")
	}
}
```

## Operators

// addition
```
1 + 2
```

// substraction
```
2 - 1
```

// multiplication
```
3 * 2
```

// division
```
5 / 2
```

// exponent
```
2 ** 6
```

// modulo
```
10 % 4
```

// move bit left
```
1 << 4
```

// move bit right
```
6 >> 1
```

// equality
```
1 == 1 // always strict inequality
```

// less than
```
1 < 2
```

// greater than
```
1 > 0
```

// less than or equal to
```
5 <= 6
5 <= 5
```

// greater than or equal to
```
7 >= 4
7 >= 7
```

// inclusive range
```
1...5 // = [1, 2, 3, 4, 5]
```

// exclusive range
```
1..<5 // = [1, 2, 3, 4]
```
