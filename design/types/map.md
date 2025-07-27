# Map

Maps are similar to arrays except that you can have a custom key type, instead of it being an integer. The syntax for declaring a map is `[<key type>]<value type>`. So, for example, a map with a string key and a decimal value would be declared as:

```nc
[str]decimal myMap = [
  "string1": 1d,
  "string2": 2d,
  // ...
  "string10": 10d,
]
```

Trailing commas are allowed in map declarations. Similar to arrays, you can access the length of the map with `<map>.len`. Values of a map can be accessed with `<map>[<key>]`. For example, for the map above, we can access the value corresponding to `"string5"` with:

```nc
myMap["string5"] // 5.0
```

If the map is mutable, you can write to the map using the same syntax:

```nc
mut [str]decimal myMap = [
  // same as above
]

myMap["string11"] = 11.0
```

You can use a `for` loop to loop through the keys of a map:

```nc
for key in myMap {
  print(key, value)
}
// string1 1.0
// string2 2.0
// string3 3.0
// string4 4.0
// string5 5.0
// string6 6.0
// string7 7.0
// string8 8.0
// string9 9.0
// string10 10.0
// string11 11.0
```

Maps are implemented using [Swiss tables](https://abseil.io/about/design/swisstables) for high read/write performance.
