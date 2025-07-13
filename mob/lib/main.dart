import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trademasterapp/LoginPage.dart';
import 'package:trademasterapp/MainPage.dart';
import 'package:trademasterapp/widgets/screens/Invoice_layout.dart';
import 'package:trademasterapp/widgets/menu/Main_Menu.dart';
import 'package:trademasterapp/widgets/screens/Setting_Layout.dart';
import 'package:trademasterapp/widgets/menu/Setting_Menu.dart';
import 'package:trademasterapp/LoginPage.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MainScreen(),
      routes: {
        '/invoice': (context) => InvoiceLayout(),
        '/settingmenu': (context) => SettingMenu(),
        '/dashboard': (context) => MainScreen(),
        '/login': (context) => LoginScreen(),
      },
    );
  }
}
