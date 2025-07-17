import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  factory DatabaseHelper() => _instance;
  DatabaseHelper._internal();

  static Database? _database;

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'trademaster.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      )
    ''');
    await db.execute('''
      CREATE TABLE stock(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        item TEXT NOT NULL,
        qty REAL NOT NULL
      )
    ''');
  }

  Future<void> saveUser(String username, String password) async {
    final db = await database;
    await db.insert(
      'user',
      {'username': username, 'password': password},
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<Map<String, dynamic>?> getUser() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('user');
    if (maps.isNotEmpty) {
      return maps.first;
    }
    return null;
  }

  Future<void> saveStock(List<Map<String, dynamic>> stockData) async {
    final db = await database;
    Batch batch = db.batch();
    for (var stockItem in stockData) {
      batch.insert('stock', stockItem,
          conflictAlgorithm: ConflictAlgorithm.replace);
    }
    await batch.commit();
  }

  Future<List<Map<String, dynamic>>> getStock() async {
    final db = await database;
    return await db.query('stock');
  }
}
