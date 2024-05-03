@JS()
library coreLib;

import 'package:js/js.dart';

typedef Board = List<List<int>>;

/// list extension for deepcopy
extension BoardCloner on Board {
  Board deepcopy() {
    Board newBoard = List.filled(length, []);
    for (int i = 0; i < length; i++) {
      newBoard[i] = List.from(this[i]);
    }

    return newBoard;
  }
}

class CellStatus {
  static int dead = 0;
  static int live = 1;
}

@JS()
external Board coreGenerateNewBoard(int row, int col);

@JS()
external Board coreGetNextBoard(Board board);
