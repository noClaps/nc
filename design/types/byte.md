# Byte

Bytes are represented by the `byte` type. This is a `uint8` value and is usually used to write to and read from files or other streams of data where the data may not necessarily be UTF-8 text. An example of this is reading and parsing binary formats like images or fonts.

```nc
type byte = uint8
```
