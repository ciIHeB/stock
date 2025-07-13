import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trademasterapp/widgets/menu/Main_Menu.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class MainScreen extends StatelessWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.blue.shade700,
        elevation: 2,
        title: Text('Dashboard',
            style: GoogleFonts.roboto(fontSize: 22, color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner, color: Colors.white),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.menu, color: Colors.white),
            onPressed: () => _scaffoldKey.currentState?.openEndDrawer(),
          ),
        ],
      ),
      endDrawer: const MainMenu(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            Row(
              children: [
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Welcome back user x ',
                      style: GoogleFonts.roboto(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue.shade700,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            // Sync Section
            Card(
              elevation: 2,
              child: ListTile(
                leading: const Icon(Icons.sync, color: Colors.blue),
                title: const Text('Last sync: 2h ago'),
              ),
            ),
            const SizedBox(height: 16),

            // Daily Sales and Visit Today
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.bar_chart, color: Colors.green),
                            SizedBox(width: 8),
                            Text('Daily Sales'),
                          ],
                        ),
                        SizedBox(height: 8),
                        Text('\$2,456',
                            style: TextStyle(
                                fontSize: 24, fontWeight: FontWeight.bold)),
                        Text('12% vs yesterday',
                            style: TextStyle(color: Colors.grey)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text('Collection Plan',
                                style: GoogleFonts.roboto(
                                    fontSize: 20, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Collection Plan
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.map_outlined, color: Colors.orange),
                SizedBox(width: 8),
                Text('Visit Today',
                    style: GoogleFonts.roboto(
                        fontSize: 20, fontWeight: FontWeight.bold)),
              ],
            ),
            Container(
              height: 200,
              child: SfRadialGauge(
                axes: <RadialAxis>[
                  RadialAxis(
                      minimum: 0,
                      maximum: 100,
                      showLabels: false,
                      showTicks: false,
                      axisLineStyle: AxisLineStyle(
                        thickness: 0.2,
                        cornerStyle: CornerStyle.bothCurve,
                        color: Colors.grey.withOpacity(0.3),
                        thicknessUnit: GaugeSizeUnit.factor,
                      ),
                      pointers: <GaugePointer>[
                        RangePointer(
                          value: 10,
                          width: 0.2,
                          sizeUnit: GaugeSizeUnit.factor,
                          gradient: const SweepGradient(
                              colors: <Color>[Colors.orange, Colors.green],
                              stops: <double>[0.25, 0.75]),
                        )
                      ],
                      annotations: <GaugeAnnotation>[
                        GaugeAnnotation(
                            widget: Text(
                              '2/32',
                              style: TextStyle(
                                  fontSize: 25, fontWeight: FontWeight.bold),
                            ),
                            angle: 90,
                            positionFactor: 0.5)
                      ])
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Actual Calls & Efficiency
            Text('Call Metrics',
                style: GoogleFonts.roboto(
                    fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            _callMetricsWidget(),
          ],
        ),
      ),
    );
  }

  Widget _infoCard({
    required String title,
    required String value,
    required String subtitle,
    required IconData icon,
    Color iconColor = Colors.blue,
    double? progress,
  }) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: iconColor),
                const SizedBox(width: 8),
                Text(title,
                    style: const TextStyle(
                        fontSize: 16, fontWeight: FontWeight.bold)),
              ],
            ),
            const SizedBox(height: 12),
            Text(value,
                style:
                    const TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            Text(subtitle, style: const TextStyle(color: Colors.grey)),
            if (progress != null) ...[
              const SizedBox(height: 10),
              LinearProgressIndicator(
                value: progress,
                backgroundColor: Colors.grey[300],
                color: iconColor,
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _collectionPlanWidget() {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
        child: Column(
          children: [
            // Credit Limit & Available Val
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _collectionItem(Icons.circle, '500.000', 'Credit Limit',
                    iconColor: Colors.red),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: VerticalDivider(
                      thickness: 1, color: Colors.grey, width: 1),
                ),
                _collectionItem(Icons.circle, '250.000', 'Available Val',
                    iconColor: Colors.green),
              ],
            ),
            const SizedBox(height: 20),
            // Total Credit & Overdue
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _collectionItem(Icons.circle, '750.000', 'Total Credit',
                    iconColor: Colors.blue),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: VerticalDivider(
                      thickness: 1, color: Colors.grey, width: 1),
                ),
                _collectionItem(Icons.circle, '188.000', 'Overdue',
                    iconColor: Colors.orange),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _collectionItem(IconData icon, String amount, String label,
      {Color iconColor = Colors.black}) {
    return Column(
      children: [
        Row(
          children: [
            Icon(icon, size: 10, color: iconColor),
            const SizedBox(width: 6),
            Text(
              amount,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.black54)),
      ],
    );
  }

  Widget _callMetricsWidget() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              flex: 1,
              child: _callBox(
                title: 'Actual Calls',
                data1: '0%',
                label1: 'Planned',
                data2: '0%',
                label2: 'Unplanned',
                color: Colors.teal,
              ),
            ),
            Expanded(
              flex: 1,
              child: _singleCallBox('Coverage', '0%', Colors.teal),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              flex: 2,
              child: _callBox(
                title: 'Productive Calls',
                data1: '0%',
                label1: 'Planned',
                data2: '0%',
                label2: 'Unplanned',
                color: Colors.deepOrange,
              ),
            ),
            Expanded(
              flex: 2,
              child: _singleCallBox('Efficiency', '0%', Colors.deepOrange),
            ),
          ],
        ),
      ],
    );
  }

  Widget _callBox({
    required String title,
    required String data1,
    required String label1,
    required String data2,
    required String label2,
    required Color color,
  }) {
    return Container(
      margin: const EdgeInsets.all(5),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Text(title,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                  fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                children: [
                  Text(data1,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold)),
                  Text(label1, style: const TextStyle(color: Colors.white70)),
                ],
              ),
              Column(
                children: [
                  Text(data2,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.bold)),
                  Text(label2, style: const TextStyle(color: Colors.white70)),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _singleCallBox(String title, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(30),
      margin: const EdgeInsets.all(5),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Text(title,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 17,
                  fontWeight: FontWeight.bold)),
          const SizedBox(height: 20),
          Text(value,
              style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}
