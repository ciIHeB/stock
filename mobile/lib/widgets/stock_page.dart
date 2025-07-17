import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:trademasterapp/services/database_helper.dart';

class StockPage extends StatefulWidget {
  const StockPage({super.key});

  @override
  State<StockPage> createState() => _StockPageState();
}

class _StockPageState extends State<StockPage> {
  List<Map<String, dynamic>> _stockData = [];

  @override
  void initState() {
    super.initState();
    _loadStockData();
  }

  Future<void> _loadStockData() async {
    final data = await DatabaseHelper().getStock();
    setState(() {
      _stockData = data;
    });
  }

  Future<void> _fetchAndSaveStockData() async {
    final response = await http.get(
      Uri.parse('http://localhost:3000/api/invboStoreLoad/all'),
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);
      final List<Map<String, dynamic>> stockData = data.map((item) {
        return {
          'item': item['invItem']['ItemName'],
          'qty': item['Qty'],
        };
      }).toList();

      await DatabaseHelper().saveStock(stockData);
      _loadStockData();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to fetch stock data')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Stock'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchAndSaveStockData,
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _stockData.length,
        itemBuilder: (context, index) {
          final item = _stockData[index];
          return ListTile(
            title: Text(item['item']),
            trailing: Text(item['qty'].toString()),
          );
        },
      ),
    );
  }
}
