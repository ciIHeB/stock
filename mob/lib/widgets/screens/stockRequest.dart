import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trademasterapp/widgets/menu/Main_Menu.dart';

class StockRequest extends StatefulWidget {
  const StockRequest({super.key});

  @override
  State<StockRequest> createState() => _StockRequestState();
}

class _StockRequestState extends State<StockRequest> {
  List<Map<String, dynamic>> products = [
    {
      "imageUrl":
          "https://otrity.com/wp-content/uploads/Chips-au-paprika-Chips-up-Cerealis.jpg",
      "name": "CHIPS UP - Paprika 14 GR",
      "code": "CHI014PP 36",
      "value": "0.000",
      "vanQty": "0:0",
      "netQty": "0:0",
      "minQty": "0:0",
      "maxQty": "Unlimited",
      "sugSales": "0:0",
      "sugTarget": "0:0",
      "selectedQty": 0, // Use int for easier increment/decrement
    },
    {
      "imageUrl":
          "https://otrity.com/wp-content/uploads/Chips-au-paprika-Chips-up-Cerealis.jpg",
      "name": "CHIPS UP - Fromage 14 GR",
      "code": "CHI014CH 36",
      "value": "48.000",
      "vanQty": "0:0",
      "netQty": "2:0",
      "minQty": "0:0",
      "maxQty": "Unlimited",
      "sugSales": "0:0",
      "sugTarget": "0:0",
      "selectedQty": 2, // Use int for easier increment/decrement
    },
    {
      "imageUrl":
          "https://otrity.com/wp-content/uploads/Chips-au-paprika-Chips-up-Cerealis.jpg",
      "name": "CHIPS UP - Creme et Oignons 14 GR",
      "code": "CHI014CO 36",
      "value": "0.000",
      "vanQty": "0:0",
      "netQty": "0:0",
      "minQty": "0:0",
      "maxQty": "Unlimited",
      "sugSales": "0:0",
      "sugTarget": "0:0",
      "selectedQty": 0, // Use int for easier increment/decrement
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      endDrawer: const MainMenu(),
      body: Stack(
        children: [
          Column(
            children: [
              _buildHeader(),
              _buildTabBarSection(),
              Expanded(
                child: ListView(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  children: List.generate(products.length, (index) {
                    final product = products[index];
                    return _buildProductCard(
                      imageUrl: product["imageUrl"],
                      name: product["name"],
                      code: product["code"],
                      value: product["value"],
                      vanQty: product["vanQty"],
                      netQty: product["selectedQty"].toString(),
                      minQty: product["minQty"],
                      maxQty: product["maxQty"],
                      sugSales: product["sugSales"],
                      sugTarget: product["sugTarget"],
                      selectedQty: product["selectedQty"].toString(),
                      onIncrement: () {
                        setState(() {
                          products[index]["selectedQty"]++;
                        });
                      },
                      onDecrement: () {
                        setState(() {
                          if (products[index]["selectedQty"] > 0) {
                            products[index]["selectedQty"]--;
                          }
                        });
                      },
                    );
                  }),
                ),
              ),
              const SizedBox(height: 70), // For bottom bar spacing
            ],
          ),
          _buildBottomBar(context),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.only(top: 36, left: 16, right: 16, bottom: 8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue.shade800, Colors.blue.shade400],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.blue.withOpacity(0.15),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.home, color: Colors.white, size: 22),
                  const SizedBox(width: 8),
                  Text(
                    // branch_name ( storedesclan1),
                     'branch_name ',
                    style: GoogleFonts.roboto(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    )
                  ),
                ],
              ),
              // Add menu button here
              Builder(
                builder: (context) => IconButton(
                  icon: const Icon(Icons.menu, color: Colors.white, size: 26),
                  onPressed: () {
                    Scaffold.of(context).openEndDrawer();
                  },
                  tooltip: 'Open menu',
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _buildHeaderValue(
                label: 'Van Stock Value',
                value: '0.000',
                currency: 'TND',
                valueColor: Colors.black,
              ),
              _verticalDivider(),
              _buildHeaderValue(
                label: 'Remaining Stock Value',
                value: '19,952.000',
                currency: 'TND',
                valueColor: Colors.green,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _verticalDivider() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12),
      height: 38,
      width: 1.5,
      color: Colors.white.withOpacity(0.3),
    );
  }

  Widget _buildHeaderValue({
    required String label,
    required String value,
    required String currency,
    required Color valueColor,
  }) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: GoogleFonts.roboto(
              color: Colors.white.withOpacity(0.8),
              fontSize: 13,
            ),
          ),
          Row(
            children: [
              Text(
                value,
                style: GoogleFonts.roboto(
                  color: valueColor,
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(width: 4),
              Text(
                currency,
                style: GoogleFonts.roboto(
                  color: Colors.white,
                  fontSize: 13,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTabBarSection() {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
      child: Row(
        children: [
          Icon(Icons.directions_car, color: Colors.blue.shade700),
          const SizedBox(width: 4),
          Text('Van Stock',
              style: GoogleFonts.roboto(
                  fontWeight: FontWeight.w600, color: Colors.blue.shade700)),
          const SizedBox(width: 12),
          OutlinedButton(
            onPressed: () {
              setState(() {
                for (var product in products) {
                  product["selectedQty"] = 0;
                }
              });
            },
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: Colors.grey.shade300),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
              minimumSize: const Size(0, 32),
            ),
            child: Text('Reset',
                style: GoogleFonts.roboto(color: Colors.blue.shade700)),
          ),
          const Spacer(),
          Text('Total Net Qty',
              style: GoogleFonts.roboto(fontSize: 13, color: Colors.grey[700])),
          const SizedBox(width: 6),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.blue.shade50,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              products
                  .fold<int>(0, (sum, p) => sum + (p["selectedQty"] as int))
                  .toString(),
              style: GoogleFonts.roboto(
                fontWeight: FontWeight.bold,
                color: Colors.blue.shade700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProductCard({
    required String imageUrl,
    required String name,
    required String code,
    required String value,
    required String vanQty,
    required String netQty,
    required String minQty,
    required String maxQty,
    required String sugSales,
    required String sugTarget,
    required String selectedQty,
    required VoidCallback onIncrement,
    required VoidCallback onDecrement,
  }) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 2),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.network(
                    imageUrl,
                    width: 54,
                    height: 54,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name,
                          style: GoogleFonts.roboto(
                              fontSize: 15, fontWeight: FontWeight.w600)),
                      Text(code,
                          style: GoogleFonts.roboto(
                              fontSize: 13, color: Colors.grey[600])),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          const Icon(Icons.monetization_on,
                              color: Colors.grey, size: 18),
                          const SizedBox(width: 2),
                          Text('Value ',
                              style: GoogleFonts.roboto(
                                  fontSize: 13, color: Colors.grey[700])),
                          Text(value,
                              style: GoogleFonts.roboto(
                                  fontWeight: FontWeight.bold, fontSize: 13)),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildQtyInfo(Icons.directions_car, 'Van', vanQty),
                _buildQtyInfo(Icons.card_giftcard, 'Net Qty', netQty),
                _buildQtySelector(selectedQty, onIncrement, onDecrement),
              ],
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  Widget _buildQtyInfo(IconData icon, String label, String value) {
    return Row(
      children: [
        Icon(icon, color: Colors.blue.shade700, size: 18),
        const SizedBox(width: 2),
        Text(label,
            style: GoogleFonts.roboto(fontSize: 12, color: Colors.grey[700])),
        const SizedBox(width: 2),
        Text(value,
            style:
                GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 13)),
      ],
    );
  }

  Widget _buildQtySelector(
      String qty, VoidCallback onIncrement, VoidCallback onDecrement) {
    return Row(
      children: [
        IconButton(
          icon: const Icon(Icons.remove_circle_outline,
              color: Colors.blue, size: 22),
          onPressed: onDecrement,
        ),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(
            border: Border.all(color: Colors.blue.shade100),
            borderRadius: BorderRadius.circular(6),
            color: Colors.blue.shade50,
          ),
          child: Text(qty,
              style: GoogleFonts.roboto(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: Colors.blue.shade700)),
        ),
        IconButton(
          icon: const Icon(Icons.add_circle_outline,
              color: Colors.blue, size: 22),
          onPressed: onIncrement,
        ),
      ],
    );
  }

  Widget _buildSmallInfo(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label,
            style: GoogleFonts.roboto(fontSize: 11, color: Colors.grey[600])),
        Text(value,
            style:
                GoogleFonts.roboto(fontSize: 12, fontWeight: FontWeight.w500)),
      ],
    );
  }

  Widget _buildBottomBar(BuildContext context) {
    return Positioned(
      left: 0,
      right: 0,
      bottom: 0,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.07),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: Row(
          children: [
            const SizedBox(width: 12),
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  const SizedBox(width: 18),
                  Stack(
                    alignment: Alignment.topRight,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.shopping_cart,
                              color: Colors.blue, size: 22),
                          const SizedBox(width: 2),
                          Text('48.000',
                              style: GoogleFonts.roboto(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  color: Colors.blue.shade700)),
                        ],
                      ),
                      Positioned(
                        right: 0,
                        top: -4,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 5, vertical: 1),
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text('1',
                              style: GoogleFonts.roboto(
                                  color: Colors.white, fontSize: 11)),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 12),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                elevation: 2,
              ),
              onPressed: () {
                // TODO:  details here go to invAutoSRDetails
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Purchase applied!')),
                );
              },
              icon: const Icon(Icons.check_circle_outline),
              label: const Text(
                'Apply Purchase', 
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
