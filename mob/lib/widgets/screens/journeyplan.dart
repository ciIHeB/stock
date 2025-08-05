import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class JourneyPlanPage extends StatefulWidget {
  const JourneyPlanPage({Key? key}) : super(key: key);

  @override
  State<JourneyPlanPage> createState() => _JourneyPlanPageState();
}

class _JourneyPlanPageState extends State<JourneyPlanPage> {
  // Mock data for visits
  final List<Map<String, dynamic>> visits = [
    {
      'clientName': 'Superette El Amen',
      'address': 'Rue 1, Ariana',
      'plannedTime': '09:00',
      'completed': true,
    },
    {
      'clientName': 'Monoprix Ennaser',
      'address': 'Avenue Ennaser',
      'plannedTime': '10:00',
      'completed': false,
    },
    {
      'clientName': 'Boulangerie El Baraka',
      'address': 'Rue 3, Menzah',
      'plannedTime': '11:00',
      'completed': false,
    },
    {
      'clientName': 'Epicerie Maher',
      'address': 'Rue 4, Ariana',
      'plannedTime': '12:00',
      'completed': false,
    },
  ];

  Color getStatusColor(bool completed) => completed ? Colors.green.shade600 : Colors.orange.shade700;
  String getStatusText(bool completed) => completed ? 'Completed' : 'Pending';

  @override
  Widget build(BuildContext context) {
    int total = visits.length;
    int done = visits.where((v) => v['completed'] == true).length;
    int pending = total - done;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Journey Plan', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.blue[800],
        elevation: 0,
      ),
      backgroundColor: Colors.grey[100],
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.blue.shade800, Colors.blue.shade400],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.blue.shade100,
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildSummaryItem('Total', total.toString(), Icons.list_alt, Colors.white),
                    _buildSummaryItem('Done', done.toString(), Icons.check_circle, Colors.greenAccent[100]!),
                    _buildSummaryItem('Pending', pending.toString(), Icons.pending_actions, Colors.amberAccent[100]!),
                  ],
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              itemCount: visits.length,
              separatorBuilder: (context, _) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final visit = visits[index];
                return Card(
                  elevation: 3,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 16),
                    child: Row(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Icon(
      Icons.store_mall_directory,
      color: Colors.blue[700],
      size: 34,
    ),
    const SizedBox(width: 16),
    // Main info, take as much space as possible
    Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  visit['clientName'],
                  style: GoogleFonts.roboto(
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                    color: Colors.blueGrey[900],
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 8),
              if (visit['completed'])
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.green[700],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Text(
                    'Done',
                    style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(Icons.location_on, size: 16, color: Colors.grey),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  visit['address'],
                  style: GoogleFonts.roboto(
                    color: Colors.grey[700],
                    fontSize: 14,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.access_time, size: 16, color: Colors.grey),
              const SizedBox(width: 4),
              Text(
                'Planned: ${visit['plannedTime']}',
                style: GoogleFonts.roboto(
                  color: Colors.grey[700],
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ],
      ),
    ),
    // If not completed, show the button OUTSIDE the Expanded
    if (!visit['completed'])
      Padding(
        padding: const EdgeInsets.only(left: 8.0, top: 8.0),
        child: ElevatedButton.icon(
          icon: const Icon(Icons.check, size: 18),
          label: const Text('pending'),
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color.fromARGB(255, 154, 171, 0),
            foregroundColor: const Color.fromARGB(255, 245, 255, 63),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            minimumSize: const Size(60, 36),
          ),
          onPressed: () {
            setState(() {
              visits[index]['completed'] = true;
            });
          },
        ),
      ),
  ],
),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryItem(String label, String value, IconData icon, Color color) {
    return Column(
      children: [
        CircleAvatar(
          backgroundColor: color,
          child: Icon(icon, color: Colors.blue[900]),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: GoogleFonts.roboto(fontWeight: FontWeight.bold, fontSize: 22, color: Colors.white),
        ),
        Text(
          label,
          style: GoogleFonts.roboto(fontSize: 13, color: Colors.white70),
        ),

      ],
    );
  }
}