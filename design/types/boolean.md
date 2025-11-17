# Boolean

Booleans are represented by the `bool` type, and can only be one of two values: `true` and `false`.

```nc
bool isLangCool = true
bool isLangLame = false
```

This makes a boolean effectively an enum:

```
enum bool {
  true,
  false
}
```

Internally, these are represented by a single 8-bit byte, that can be either `0` (false) or `1` (true).
