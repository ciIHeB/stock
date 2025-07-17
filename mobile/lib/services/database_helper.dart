import 'package:trademasterapp/data/database.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();

  static AppDatabase? _database;

  Future<AppDatabase> get database async {
    if (_database != null) return _database!;
    _database = AppDatabase();
    return _database!;
  }

  Future<void> saveUser(String username, String password) async {
    final db = await database;
    await db.into(db.users).insert(UsersCompanion.insert(
          name: username,
          password: password,
        ));
  }

  Future<User?> getUser() async {
    final db = await database;
    final users = await db.select(db.users).get();
    if (users.isNotEmpty) {
      return users.first;
    }
    return null;
  }

  Future<void> saveStock(List<Map<String, dynamic>> stockData) async {
    final db = await database;
    await db.batch((batch) {
      batch.insertAll(
          db.products,
          stockData
              .map((e) => ProductsCompanion.insert(
                    name: e['item'],
                    quantity: e['qty'],
                  ))
              .toList());
    });
  }

  Future<List<Product>> getStock() async {
    final db = await database;
    return await db.select(db.products).get();
  }
}
