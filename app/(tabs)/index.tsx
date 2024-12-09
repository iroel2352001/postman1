import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memanggil API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users') // API endpoint
      .then((response) => {
        setData(response.data); // Menyimpan data ke state
        setLoading(false); // Mengubah status loading setelah data berhasil diterima
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Menyelesaikan loading meskipun terjadi error
      });
  }, []); // useEffect akan dipanggil sekali setelah komponen dipasang

  // Jika masih dalam proses loading, tampilkan indikator loading
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts from JSONPlaceholder</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;
