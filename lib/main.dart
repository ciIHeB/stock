import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(MainScreenApp());
}

class MainScreenApp extends StatelessWidget {
  const MainScreenApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: Text('Main', style: GoogleFonts.roboto(fontSize: 20)),
        actions: [
          IconButton(
            icon: Icon(Icons.qr_code_scanner),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.menu),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildCollectionPlan(),
              _buildSalesmanDetails(),
              _buildTodayCoverageSummary(),
              _buildCallDetails(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCollectionPlan() {
    return Text(
      'Collection Plan',
      style: GoogleFonts.roboto(fontSize: 18, fontWeight: FontWeight.bold),
    );
  }

  Widget _buildSalesmanDetails() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16),
        Text(
          'Salesman',
          style: GoogleFonts.roboto(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        Row(
          children: [
            Expanded(
              child: LinearProgressIndicator(
                value: 3.0,
                backgroundColor: Colors.grey[300],
                color: Colors.blue,
                minHeight: 8,
              ),
            ),
            SizedBox(width: 8),
            Text('300%'),
          ],
        ),
        SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildDetails('Salesman Limit', '15,010.381'),
            _buildDetails('Available Val', '-30,068.108'),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            _buildDetails('Total Credit', '45,078.489', color: Colors.blue),
            _buildDetails('Overdue', '35,070.506', color: Colors.red),
          ],
        ),
      ],
    );
  }

  Widget _buildTodayCoverageSummary() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16),
        Text(
          'Today Coverage Summary',
          style: GoogleFonts.roboto(fontSize: 16, fontWeight: FontWeight.w600),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('35 Planned Calls'),
            Text('0%'),
          ],
        ),
        LinearProgressIndicator(
          value: 0.0,
          backgroundColor: Colors.grey[300],
          color: Colors.grey,
          minHeight: 8,
        ),
      ],
    );
  }

  Widget _buildCallDetails() {
    return Column(
      children: [
        SizedBox(height: 16),
        Row(
          children: [
            _buildCard('Actual calls', '0 Planned\n0 Unplanned', Colors.teal),
            SizedBox(width: 8),
            _buildCard('Coverage', '0%', Colors.blue),
          ],
        ),
        SizedBox(height: 8),
        Row(
          children: [
            _buildCard('Productive calls', '0', Colors.orange),
            SizedBox(width: 8),
            _buildCard('Progress', '0%', Colors.red),
          ],
        ),
      ],
    );
  }

  Widget _buildDetails(String title, String value, {Color color = Colors.black}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: TextStyle(color: Colors.grey, fontSize: 12)),
        Text(value, style: TextStyle(color: color, fontSize: 14)),
      ],
    );
  }

  Widget _buildCard(String title, String value, Color color) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: TextStyle(fontSize: 14, color: color)),
            SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
