import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:trademasterapp/widgets/Main_Menu.dart';

class InvoiceLayout extends StatelessWidget {
  const InvoiceLayout({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Return & Invoice", style: GoogleFonts.roboto(fontSize: 20,color: Colors.white)),
        backgroundColor: Colors.blue,

        actions: [
          IconButton(
            icon: Icon(Icons.qr_code_scanner,color: Colors.white,),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.menu,color: Colors.white,),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(  // Wrap the whole body with SingleChildScrollView
        child: Column(
          children: [
            // Customer and Invoice Details
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Jamel Issaoud",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text("Invoice Type"),
                      Text(
                        "Credit Invoice",
                        style: TextStyle(color: Colors.blue),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Options Row
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildOption(Icons.settings, "Options"),
                  _buildOption(Icons.local_shipping, "Have Stock"),
                  _buildOption(Icons.discount, "Discount\n0%"),
                ],
              ),
            ),

            Divider(),

            // Product List
            Column(
              children: [
                _buildProductItem(
                  "CHIPS UP - Fromage 14",
                  "CHI014CH 36",
                  "24.000",
                  imageUrl:
                  "https://otrity.com/wp-content/uploads/Chips-au-paprika-Chips-up-Cerealis.jpg", // Replace with the actual image URL
                ),
                _buildProductItem(
                  "CHIPS UP - Paprika 70",
                  "CHU070PP",
                  "0.000",
                  imageUrl:
                  "https://otrity.com/wp-content/uploads/Chips-au-paprika-Chips-up-Cerealis.jpg", // Replace with the actual image URL
                ),
              ],
            ),

            Divider(),

            // Footer Section
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  ElevatedButton(
                    onPressed: () {},
                    child: Text("Category"),
                  ),
                  Column(
                    children: [
                      Text("Total Qty: 1"),
                      Text("Value: 24.000"),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOption(IconData icon, String text) {
    return Column(
      children: [
        Icon(icon, size: 28),
        SizedBox(height: 4),
        Text(
          text,
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildProductItem(
      String title, String code, String value, {String? imageUrl}) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                Image.network(
                  imageUrl ?? "",
                  width: 50,
                  height: 50,
                  fit: BoxFit.cover,
                ),
                SizedBox(width: 8),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: TextStyle(fontSize: 16)),
                      Text(code, style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Icon(Icons.monetization_on, color: Colors.grey),
                    Text("Value"),
                    Text(
                      value,
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ],
            ),
            Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildSmallInfo("Return", "0:0"),
                _buildSmallInfo("Bonus", "0:0"),
                _buildSmallInfo("Promo", "No Promotion"),
                Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.remove),
                      onPressed: () {},
                    ),
                    Text("1:0"),
                    IconButton(
                      icon: Icon(Icons.add),
                      onPressed: () {},
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }


  Widget _buildSmallInfo(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 12, color: Colors.grey)),
        Text(value, style: TextStyle(fontSize: 14)),
      ],
    );

  }
}
