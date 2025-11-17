# Error

Errors are a type, represented by `error`. They are simply a string, but with a key difference: `error` can be `none`, so in effect, the error type is simply:

```nc
type error = str?
```
