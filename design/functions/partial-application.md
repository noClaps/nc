# Partial application

```
fn add(int a, int b) -> int {
  return a + b
}

fn addA = add(1) // Partially applied function. `addA` now has the `int a` parameter of `add` prefilled, and only takes one parameter `int b`

int c = addA(2) // 3
```

This can be useful to create functions from a base "template" function. For example, if you were creating an HTML library, you might use a function `el(str tag, str content)` as a base, and build all of your elements off of that:

```
fn el(str tag, str content) -> str {
  return "<{tag}>{content}</{tag}>"
}

fn html = el("html") // fn html(str content) -> str
fn body = el("body") // fn body(str content) -> str
// ...

body("Hello World") // <body>Hello World</body>
```
