# Enum

Enums allow you to have a set of named values, behaving similarly to enums in languages like TypeScript. You can define an enum using the `enum` keyword and a label, which will become the type name.

```nc
enum Status {
  Pending,
  Complete,
  Failed,
}
```

You can access enum members with `<enum>.<member>`. You can then use this in your code:

```nc
fn checkStatus(Status st) -> str {
  if st {
    Pending -> { return "pending" }
    Complete -> { return "complete" }
    Failed -> { return "failed" }
  }
}

fn didFail(Status st) -> bool {
    return st == Status.Failed
}

Status stat1 = Status.Complete
Status stat2 = Status.Failed

print(checkStatus(stat1)) // complete
print(didFail(stat2)) // true
```

Enums allow you to define different states of an object. For example, if you were making Conway's Game of Life, you may want to encode the cell state using an enum instead of a boolean, for clarity:

```nc
enum CellState {
  Alive,
  Dead,
}
```

You would then use this in your code:

```nc
mut CellState[][] board = [[...]]

for row in board {
  for col in board[row] {
    CellState north = board[row-1][col]
    CellState northeast = board[row-1][col+1]
    CellState east = board[row][col+1]/
    // ...

    mut int aliveNeighbors = 0
    if north {
      CellState.Alive -> { aliveNeighbors += 1 }
      _ -> {}
    }
    if northeast {
      CellState.Alive -> { aliveNeighbors += 1 }
      _ -> {}
    }
    // ...

    if aliveNeighbors {
      $:1 -> { board[row][col] = CellState.Dead }
      4:$ -> { board[row][col] = CellState.Dead }
      3 -> { board[row][col] = CellState.Alive }
      _ -> {}
    }
  }
}
```
