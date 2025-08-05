import 'package:flutter/material.dart';

class StockPage extends StatefulWidget {
  const StockPage({Key? key}) : super(key: key);

  @override
  State<StockPage> createState() => _StockPageState();
}

class _StockPageState extends State<StockPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final List<Map<String, dynamic>> products = [
    {
      "imageUrl": "https://i.imgur.com/1ZQZ1Zm.png",
      "name": "FAMILY CAKE - Marbré 220 GR",
      "code": "CKFAMMA220G",
      "qty": "1:0",
    },
    {
      "imageUrl": "https://i.imgur.com/3Qxk5Qk.png",
      "name": "CHIPS UP - Sel 70 GR",
      "code": "CHU070SL",
      "qty": "1:0",
    },
    {
      "imageUrl": "https://i.imgur.com/3Qxk5Qk.png",
      "name": "CHIPS UP - Piquant 70 GR",
      "code": "CHU070PI",
      "qty": "1:0",
    },
    {
      "imageUrl": "https://i.imgur.com/3Qxk5Qk.png",
      "name": "CHIPS UP - Paprika 70 GR",
      "code": "CHU070PP",
      "qty": "1:0",
    },
    {
      "imageUrl": "https://i.imgur.com/3Qxk5Qk.png",
      "name": "ZigZag Chocolat",
      "code": "CKZZCH 45G",
      "qty": "1:0",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(''),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(48),
          child: Container(
            color: Colors.white,
            child: TabBar(
              controller: _tabController,
              labelColor: Colors.blue,
              unselectedLabelColor: Colors.grey,
              indicatorColor: Colors.blue,
              tabs: const [
                Tab(text: 'All'),
                Tab(text: 'Valid'),
              ],
            ),
          ),
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildStockTab(context),
          _buildStockTab(context), // Both tabs show same content for now
        ],
      ),
    );
  }

  Widget _buildStockTab(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            child: Row(
              children: [
                _buildSummaryCard('Max Stock Value', '20,000.000', 'TND', Colors.blue[900]!, Colors.blue[50]!),
                const SizedBox(width: 10),
                _buildSummaryCard('Stock Value', '273.000', 'TND', Colors.blue[700]!, Colors.blue[50]!),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
            child: Row(
              children: [
                const Text('Order by', style: TextStyle(fontSize: 13, color: Colors.grey)),
                const SizedBox(width: 4),
                DropdownButton<String>(
                  value: 'Van Stock',
                  underline: Container(),
                  icon: const Icon(Icons.arrow_drop_down, color: Colors.blue),
                  items: const [
                    DropdownMenuItem(
                      value: 'Van Stock',
                      child: Text('Van Stock', style: TextStyle(color: Colors.blue)),
                    ),
                  ],
                  onChanged: (_) {},
                ),
                const Spacer(),
                const Text('Items', style: TextStyle(fontSize: 13, color: Colors.grey)),
                const SizedBox(width: 3),
                Text('${products.length}', style: const TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(width: 12),
                const Text('Total Qty', style: TextStyle(fontSize: 13, color: Colors.grey)),
                const SizedBox(width: 3),
                Text('${products.length}', style: const TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          const Divider(height: 18, thickness: 1.2),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: products.length,
            separatorBuilder: (context, index) => const Divider(height: 1, thickness: 1),
            itemBuilder: (context, index) {
              final p = products[index];
              return ListTile(
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: Image.network(
                    p["imageUrl"],
                    width: 44,
                    height: 44,
                    fit: BoxFit.cover,
                  ),
                ),
                title: Text(
                  p["name"],
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                ),
                subtitle: Text(
                  p["code"],
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                ),
                trailing: Text(
                  p["qty"],
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 2),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(String label, String value, String currency, Color color, Color bgColor) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
            const SizedBox(height: 4),
            Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  value,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: color),
                ),
                const SizedBox(width: 3),
                Padding(
                  padding: const EdgeInsets.only(bottom: 2),
                  child: Text(currency, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
