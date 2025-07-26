# Character

Characters are a single UTF-8 rune, represented by the `char` type. This means that characters that take up multiple bytes, like emojis or CJK characters. The benefit of this is that, if you're trying to access a character, you will get the full character you expect, even if it spans multiple bytes. Internally, this is represented by a uint32 value:

```nc
type char = uint32
```
