import 'package:flutter/material.dart';
import 'package:flutter_app/js/coreLib.dart';

class BoardHome extends StatefulWidget {
  final String title;

  const BoardHome({super.key, required this.title});

  @override
  State<BoardHome> createState() => _BoardHomeState();
}

class _BoardHomeState extends State<BoardHome> {
  int rows = 50;
  int cols = 50;
  late Board board;

  @override
  void initState() {
    super.initState();
    board = coreGenerateNewBoard(rows, cols);
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
                SizedBox(
                  width: 100,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Rows"),
                    initialValue: rows.toString(),
                    onChanged: (value) {
                      setState(() {
                        rows = int.parse(value);
                        board = coreGenerateNewBoard(rows, cols);
                      });
                    },
                  ),
                ),
                SizedBox(
                  width: 100,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Cols"),
                    initialValue: cols.toString(),
                    onChanged: (value) {
                      setState(() {
                        cols = int.parse(value);
                        board = coreGenerateNewBoard(rows, cols);
                      });
                    },
                  ),
                ),
                SizedBox(
                  width: 150,
                  child: TextFormField(
                    decoration: const InputDecoration(hintText: "Growth speed"),
                    onChanged: (value) {
                      print(value);
                    },
                  ),
                ),
                ElevatedButton(
                    onPressed: () {
                      print("Start");
                    },
                    child: const Text("Start")),
                ElevatedButton(
                    onPressed: () {
                      print("Reset");
                    },
                    child: const Text("Reset"))
              ],
            )),
            SizedBox(
              height: 32,
            ),
            BoardDisplay(
              board: board,
              onBoardChange: (newBoard) {
                setState(() {
                  board = newBoard;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class BoardDisplay extends StatelessWidget {
  final Board board;

  const BoardDisplay(
      {super.key, required this.board, required this.onBoardChange});

  final void Function(Board board) onBoardChange;

  // @override
  // Widget build(BuildContext context) {
  //   return Column(
  //     children: board.asMap().entries.map((e) {
  //       final rowIndex = e.key;
  //       final row = e.value;
  //       return Row(
  //         children: row.asMap().entries.map((c) {
  //           return Text("[$rowIndex:${c.key}]");
  //         }).toList(),
  //       );
  //     }).toList(),
  //   );
  // }
  @override
  Widget build(BuildContext context) {
    final rows = board.length;
    final cols = board.isNotEmpty ? board[0].length : 0;

    return Expanded(
      child: GridView.count(
        crossAxisCount: cols,
        mainAxisSpacing: 1,
        children: List.generate(rows * cols, (index) {
          final i = index ~/ cols;
          final j = index % cols;
          return Container(
            width: 10,
            height: 10,
            decoration: BoxDecoration(
                border: Border.all(color: Colors.black, width: 1)),
            child: GestureDetector(
                onTap: () {
                  board[i][j] = (board[i][j] == CellStatus.dead)
                      ? CellStatus.live
                      : CellStatus.dead;
                  onBoardChange(board);
                },
                child: Text('${board[index ~/ cols][index % cols]}')),
          );
        }),
      ),
    );
  }
}
