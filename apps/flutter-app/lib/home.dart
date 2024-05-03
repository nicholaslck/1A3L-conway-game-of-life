import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_app/js/coreLib.dart';

class BoardHome extends StatefulWidget {
  final String title;

  const BoardHome({super.key, required this.title});

  @override
  State<BoardHome> createState() => _BoardHomeState();
}

class _BoardHomeState extends State<BoardHome> {
  int _rows = 50;
  int _cols = 50;
  int _speed = 8;
  late Board _board;
  bool _running = false;
  int _steps = 0;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _board = coreGenerateNewBoard(_rows, _cols);
  }

  void reset() {
    setState(() {
      _board = coreGenerateNewBoard(_rows, _cols);
      _steps = 0;
    });
  }

  void stop() {
    setState(() {
      _timer?.cancel();
      _timer = null;
      _running = false;
    });
  }

  void start() {
    setState(() {
      _running = true;
      _timer?.cancel();
      _timer = Timer.periodic(
          Duration(milliseconds: 1000.0 ~/ _speed.toDouble()), nextTimeStep);
    });
  }

  void nextTimeStep(timer) {
    setState(() {
      _steps++;
      _board = coreGetNextBoard(_board);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Form(
                child: Wrap(
              spacing: 10,
              crossAxisAlignment: WrapCrossAlignment.center,
              // mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text("Row"),
                SizedBox(
                  width: 100,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Rows"),
                    initialValue: _rows.toString(),
                    onChanged: (value) {
                      setState(() {
                        _rows = int.parse(value);
                        _board = coreGenerateNewBoard(_rows, _cols);
                      });
                    },
                  ),
                ),
                const Text("Cols"),
                SizedBox(
                  width: 100,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Cols"),
                    initialValue: _cols.toString(),
                    onChanged: (value) {
                      setState(() {
                        _cols = int.parse(value);
                        _board = coreGenerateNewBoard(_rows, _cols);
                      });
                    },
                  ),
                ),
                const Text("Speed"),
                SizedBox(
                  width: 150,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Growth speed"),
                    initialValue: _speed.toString(),
                    onChanged: (value) {
                      setState(() {
                        _speed = int.parse(value);
                      });
                    },
                  ),
                ),
                ElevatedButton(
                    onPressed: _running ? stop : start,
                    child: _running ? const Text("Stop") : const Text('Start')),
                ElevatedButton(onPressed: reset, child: const Text("Reset"))
              ],
            )),
            const SizedBox(
              height: 8,
            ),
            Text("Generations: $_steps"),
            const SizedBox(
              height: 16,
            ),
            BoardDisplay(
              board: _board,
              running: _running,
              onBoardChange: (newBoard) => setState(() => _board = newBoard),
            ),
          ],
        ),
      ),
    );
  }
}

class BoardDisplay extends StatelessWidget {
  final Board board;
  final bool running;
  final void Function(Board board) onBoardChange;

  const BoardDisplay(
      {super.key,
      required this.board,
      required this.onBoardChange,
      required this.running});

  void toggleCellStatus(int r, int c) {
    if (running) {
      return;
    }
    Board newBoard = board.deepcopy();
    int newStatus;
    if (board[r][c] == CellStatus.live) {
      newStatus = CellStatus.dead;
    } else {
      newStatus = CellStatus.live;
    }
    newBoard[r][c] = newStatus;
    onBoardChange(newBoard);
  }

  @override
  Widget build(BuildContext context) {
    // final rows = board.length;
    // final cols = board.isNotEmpty ? board[0].length : 0;

    return Expanded(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: board
          .asMap()
          .entries
          .map(
            (r) => Row(
                key: Key("${r.key}"),
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: board[r.key]
                    .asMap()
                    .entries
                    .map(
                      (c) => Center(
                          key: Key("${r.key}-${c.key}-${c.value}"),
                          child: Cell(
                              onCellTapDown: (e) =>
                                  toggleCellStatus(r.key, c.key),
                              cellStatus: c.value)),
                    )
                    .toList()),
          )
          .toList(),
    ));
  }
}

class Cell extends StatelessWidget {
  final int cellStatus;
  final void Function(TapDownDetails e)? onCellTapDown;

  const Cell({super.key, required this.cellStatus, this.onCellTapDown});

  @override
  Widget build(BuildContext context) {
    Color color = cellStatus == CellStatus.live ? Colors.black : Colors.white;

    return GestureDetector(
      onTapDown: onCellTapDown,
      child: Container(
        constraints: BoxConstraints.tight(const Size(11, 11)),
        decoration:
            BoxDecoration(border: Border.all(color: Colors.black, width: 1)),
        child: Container(
          color: color,
        ),
      ),
    );
  }
}
