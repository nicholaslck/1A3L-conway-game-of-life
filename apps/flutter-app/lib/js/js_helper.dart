@JS()
library js_helper;

import 'package:js/js.dart';

@JS()
external void helloWorld();

@JS()
class Core {
  external Core();
  external String test();
}

@JS()
external Core createCore();
