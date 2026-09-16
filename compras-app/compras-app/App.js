import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';


const cesta = {
  nome: "Cesta de Verduras",
  fazenda: "Fazenda Boa Terra",
  preco: "R$ 40,00",
  imagemFazenda: "https://img.cdndsgni.com/preview/12142655-m.jpg", // imagem ilustrativa
  itens: [
    { id: "1", nome: "Alface", imagem: "https://img.cdndsgni.com/preview/11571645-m.jpg"},
    { id: "2", nome: "Tomate", imagem: "https://img.cdndsgni.com/preview/11509102-m.jpg" },
    { id: "3", nome: "Cenoura", imagem: "https://img.cdndsgni.com/preview/10230424-m.jpg" },
    { id: "4", nome: "Batata", imagem: "https://img.cdndsgni.com/preview/10128101-m.jpg" },
  ],
};


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{cesta.nome}</Text>
      <Text style={styles.subtitulo}>{cesta.fazenda}</Text>
      <Image source={{ uri: cesta.imagemFazenda }} style={styles.imagemFazenda} />
      <Text style={styles.preco}>{cesta.preco}</Text>


      <Text style={styles.itensTitulo}>Itens da cesta:</Text>
      <FlatList
        data={cesta.itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagem }} style={styles.itemImagem} />
            <Text style={styles.item}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 18,
    color: "#555",
    marginBottom: 5,
  },
  preco: {
    fontSize: 18,
    color: "green",
    marginBottom: 15,
  },
  imagemFazenda: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  itensTitulo: {
    fontSize: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImagem: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  item: {
    fontSize: 16,
  },
});



