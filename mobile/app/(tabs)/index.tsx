import { useEffect, useState } from 'react';
import * as Application from 'expo-application';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
  device_id?: string;
};

const API_URL =
  'https://kavya-todo-backend-final.onrender.com/api/todos/';

// Get a unique ID for this Android device
const DEVICE_ID = Application.getAndroidId();

console.log('Device ID:', DEVICE_ID);

// Common headers for every API request
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Device-ID': DEVICE_ID,
});

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // ==========================================
  // GET TODOS
  // ==========================================

  const fetchTodos = async () => {
    try {
      console.log('Fetching todos from:', API_URL);
      console.log('Device ID:', DEVICE_ID);

      const response = await fetch(API_URL, {
        headers: getHeaders(),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();

      console.log('Received data:', data);

      setTodos(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Run when screen loads
  useEffect(() => {
    fetchTodos();
  }, []);

  // ==========================================
  // ADD TODO
  // ==========================================

  const addTodo = async () => {
    if (task.trim() === '') {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          title: task.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();

      console.log('Created todo:', newTodo);

      setTodos((previousTodos) => [
        ...previousTodos,
        newTodo,
      ]);

      setTask('');
    } catch (error) {
      console.error('Add error:', error);
    }
  };

  // ==========================================
  // TOGGLE TODO
  // ==========================================

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await fetch(
        `${API_URL}${todo.id}/`,
        {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();

      console.log('Updated todo:', updatedTodo);

      setTodos((previousTodos) =>
        previousTodos.map((item) =>
          item.id === todo.id ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  // ==========================================
  // DELETE TODO
  // ==========================================

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(
        `${API_URL}${id}/`,
        {
          method: 'DELETE',
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos((previousTodos) =>
        previousTodos.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // ==========================================
  // START EDIT
  // ==========================================

  const editTodo = (todo: Todo) => {
    setTask(todo.title);
    setEditingId(todo.id);
  };

  // ==========================================
  // UPDATE TODO
  // ==========================================

  const updateTodo = async () => {
    if (task.trim() === '' || editingId === null) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}${editingId}/`,
        {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({
            title: task.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();

      setTodos((previousTodos) =>
        previousTodos.map((todo) =>
          todo.id === editingId ? updatedTodo : todo
        )
      );

      setTask('');
      setEditingId(null);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        My Todos
      </Text>

      {/* INPUT */}

      <View style={styles.inputRow}>

        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={task}
          onChangeText={setTask}
        />

        <Pressable
          style={styles.addButton}
          onPress={
            editingId !== null
              ? updateTodo
              : addTodo
          }
        >
          <Text style={styles.addButtonText}>
            {editingId !== null ? 'Update' : 'Add'}
          </Text>
        </Pressable>

      </View>

      {/* TODO LIST */}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}

        renderItem={({ item }) => (

          <View style={styles.todoItem}>

            {/* TODO CONTENT */}

            <Pressable
              style={styles.todoContent}
              onPress={() => toggleTodo(item)}
            >

              <View
                style={[
                  styles.checkbox,
                  item.completed &&
                    styles.checkboxCompleted,
                ]}
              >
                {item.completed && (
                  <Text style={styles.check}>
                    ✓
                  </Text>
                )}
              </View>

              <Text
                style={[
                  styles.todoText,
                  item.completed &&
                    styles.todoCompleted,
                ]}
              >
                {item.title}
              </Text>

            </Pressable>

            {/* EDIT */}

            <Pressable
              style={styles.editButton}
              onPress={() => editTodo(item)}
            >
              <Text style={styles.editText}>
                Edit
              </Text>
            </Pressable>

            {/* DELETE */}

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </Pressable>

          </View>
        )}

        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No todos yet. Add your first task!
          </Text>
        }
      />

    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },

  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 10,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
  },

  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },

  check: {
    color: '#fff',
    fontWeight: 'bold',
  },

  todoText: {
    fontSize: 17,
    flex: 1,
  },

  todoCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },

  editButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  editText: {
    color: '#007AFF',
    fontWeight: '600',
  },

  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  deleteText: {
    color: 'red',
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },

});