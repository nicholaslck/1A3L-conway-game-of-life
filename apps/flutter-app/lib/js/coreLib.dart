@JS()
library coreLib;

import 'package:js/js.dart';

typedef Board = List<List<int>>;

class CellStatus {
  static int dead = 0;
  static int live = 1;
}

@JS()
external Board coreGenerateNewBoard(int row, int col);

@JS()
external Board coreGetNextBoard(Board board);
