# Error

Errors are a type, represented by `error`. They are simply a string, but with a key difference: printing a string (or any other type) will output it to `stdout`, while printing an error will output it to `stderr`. Another key difference is that `error` can be `none`, so in effect, the error type is simply:

```nc
type error = str?
```
