import 'package:trademasterapp/helpers/drift_database.dart';

class DatabaseHelper {
  final AppDatabase _db = AppDatabase();

  Future<List<Task>> getTasks() {
    return _db.select(_db.tasks).get();
  }

  Future<int> insertTask(TasksCompanion task) {
    return _db.into(_db.tasks).insert(task);
  }

  Future<bool> updateTask(TasksCompanion task) {
    return _db.update(_db.tasks).replace(task);
  }

  Future<int> deleteTask(int id) {
    return (_db.delete(_db.tasks)..where((t) => t.id.equals(id))).go();
  }
}
