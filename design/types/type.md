# Type

The `type` type is a special data type that allows other types to be passed into functions as arguments, and allows for defining new types. In other languages, this may be implemented separately as type definitions and generics, but in this one, they're both the same thing.

For example, you could declare your own custom types based on the existing types:

```
type customStringType = string

// `customStringType` can now be used as a distinct type from `string`
```

You could also use them as function arguments:

```
fn decode(string data, type outType) -> (outType, error) {}
```

As you can see above, using a type as a function argument also allows you to use as part of the return type for the function, like how generics behave in other languages.
