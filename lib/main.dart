import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trademasterapp/LoginPage.dart';
import 'package:trademasterapp/widgets/Invoice_layout.dart';
import 'package:trademasterapp/widgets/Main_Menu.dart';
import 'package:trademasterapp/widgets/Setting_Layout.dart';
import 'package:trademasterapp/widgets/Setting_Menu.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginScreen(),
      routes: {
        '/invoice': (context) => InvoiceLayout(),
        '/settingmenu': (context) => SettingMenu(),// Register the route to the InvoicePage
      },
    );
  }
}

class MainScreen extends StatelessWidget {
  // Remove the 'const' here, since GlobalKey doesn't need to be constant
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey, // Assign the key to the Scaffold
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: Text('Main', style: GoogleFonts.roboto(fontSize: 20,color: Colors.white)),
        actions: [
          IconButton(
            icon: Icon(Icons.qr_code_scanner,color: Colors.white,),
            onPressed: () {
              // Add action for QR Code Scanner
            },
          ),
          IconButton(
            icon: Icon(Icons.menu, color: Colors.white,),
            onPressed: () {
              // Open the menu from the right using the GlobalKey
              _scaffoldKey.currentState?.openEndDrawer();
            },
          ),
        ],
      ),

      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome USER OF 71',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold,color: Colors.blue),
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Last Data Upload: '),
                      Text('Last Data Download:'),
                    ],
                  ),
                ],
              ),
            ),
            Divider(),

            // Daily Sales Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                children: [
                  Icon(Icons.bar_chart, size: 28),
                  SizedBox(width: 8),
                  Text(
                    'Daily Sales',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  Spacer(),
                 // Text('0', style: TextStyle(fontSize: 18)),
                ],
              ),
            ),
            Divider(),

            // Collection Plan Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Collection Plan',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Credit Limit'),
                          Text(
                            '500.000',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text('Available Val'),
                          Text(
                            '1,250.918',
                            style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.red),
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Column(
                        children: [
                          Text(
                            '17,750.918',
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.blue),
                          ),
                          Text('Total Credit'),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            '16,188.418',
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.orange),
                          ),
                          Text('Overdue'),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Divider(),

            // Coverage Summary Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Today Coverage Summary',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('35 Planned Calls'),
                      Text('0%'),
                    ],
                  ),
                  SizedBox(height: 8),
                  LinearProgressIndicator(
                    value: 0.0,
                    backgroundColor: Colors.grey.shade300,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.blue),
                  ),
                  /*SizedBox(height: 16),
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton.icon(
                      onPressed: () {},
                      icon: Icon(Icons.print),
                      label: Text('Print'),
                    ),
                  ),*/
                ],
              ),
            ),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // First Row (Actual Calls + Coverage)
                  Row(
                    children: [
                      // Actual Calls Section (2/3 width)
                      Flexible(
                        flex: 2,
                        child: Container(
                          margin: EdgeInsets.all(5),
                          padding: EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.teal,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            children: [
                              //Icon(Icons.phone, color: Colors.white,),
                              Text('Actual Calls',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold
                                  )),
                              SizedBox(height: 20),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  Column(
                                    children: [
                                      Text('0%',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold
                                          )),
                                      Text('Planned',
                                          style: TextStyle(color: Colors.white70)),
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Text('0%',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold
                                          )),
                                      Text('Unplanned',
                                          style: TextStyle(color: Colors.white70)),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Coverage Section (1/3 width)
                      Flexible(
                        flex: 1,
                        child: Container(
                          //margin: EdgeInsets.all(10),
                          padding: EdgeInsets.all(30),
                          decoration: BoxDecoration(
                            color: Colors.teal,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            children: [
                              //Icon(IconData),
                              Text('Coverage',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold
                                  )),
                              SizedBox(height: 20),
                              Text('0%',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold
                                  )),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: [
                      // Actual Calls Section (2/3 width)
                      Flexible(
                        flex: 2,
                        child: Container(
                          margin: EdgeInsets.all(5),
                          padding: EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.deepOrange,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            children: [
                              //Icon(Icons.phone, color: Colors.white,),
                              Text('Productive Calls',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold
                                  )),
                              SizedBox(height: 20),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceAround,
                                children: [
                                  Column(
                                    children: [
                                      Text('0%',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold
                                          )),
                                      Text('Planned',
                                          style: TextStyle(color: Colors.white70)),
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Text('0%',
                                          style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 24,
                                              fontWeight: FontWeight.bold
                                          )),
                                      Text('Unplanned',
                                          style: TextStyle(color: Colors.white70)),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),

                      // Coverage Section (1/3 width)
                      Flexible(
                        flex: 1,
                        child: Container(
                          //margin: EdgeInsets.all(10),
                          padding: EdgeInsets.all(30),
                          decoration: BoxDecoration(
                            color: Colors.deepOrange,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            children: [
                              //Icon(IconData),
                              Text('efficiency',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold
                                  )),
                              SizedBox(height: 20),
                              Text('0%',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 24,
                                      fontWeight: FontWeight.bold
                                  )),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
      endDrawer: const MainMenu(),
    );
  }
}
