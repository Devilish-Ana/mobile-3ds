import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Button, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView 
} from 'react-native';

export default function App() {
  // Lista inicial de receitas para o ScrollView
  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: '🥞 Panqueca Americana',
      ingredientes: '• 1 xícara de farinha de trigo\n• 2 colheres (sopa) de açúcar\n• 2 colheres (chá) de fermento em pó\n• 1 xícara de leite\n• 1 ovo batido',
      preparo: 'Misture os ingredientes secos em uma tigela. Adicione o ovo e o leite, mexendo até ficar homogêneo. Cozinhe porções em uma frigideira untada até dourar dos dois lados.'
    }
  ]);

  // Estados para controle dos Modais
  const [modalVerVisivel, setModalVerVisivel] = useState(false);
  const [modalAddVisivel, setModalAddVisivel] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  // Estados para os inputs de nova receita
  const [nomeInput, setNomeInput] = useState('');
  const [ingredientesInput, setIngredientesInput] = useState('');
  const [preparoInput, setPreparoInput] = useState('');

  // Abre o modal de visualização carregando os dados corretos
  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    setModalVerVisivel(true);
  };

  // Limpa os campos do formulário
  const limparFormulario = () => {
    setNomeInput('');
    setIngredientesInput('');
    setPreparoInput('');
  };

  // Função para salvar nova receita com validações
  const salvarReceita = () => {
    if (!nomeInput.trim() || !ingredientesInput.trim() || !preparoInput.trim()) {
      alert('Por favor, preencha todos os campos antes de salvar!');
      return;
    }

    const novaReceita = {
      id: Math.random().toString(),
      nome: nomeInput,
      ingredientes: ingredientesInput,
      preparo: preparoInput
    };

    setReceitas([...receitas, novaReceita]);
    alert('Sucesso!', 'Sua receita foi salva com orgulho.');
    limparFormulario();
    setModalAddVisivel(false);
  };

  // Função para cancelar o cadastro
  const cancelarCadastro = () => {
    limparFormulario();
    setModalAddVisivel(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>
      <Text style={styles.subtitle}>Colecione suas receitas preferidas</Text>

      {/* Lista de Receitas Cadastradas */}
      <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
        {receitas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Button 
              title="Ver Receita" 
              color="#78022D" 
              onPress={() => abrirReceita(item)} 
            />
          </View>
        ))}
      </ScrollView>

      {/* MODAL 1: Visualizar Receita Selecionada */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVerVisivel}
        onRequestClose={() => setModalVerVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{receitaSelecionada?.nome}</Text>
          
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          <Text style={styles.recipeText}>{receitaSelecionada?.ingredientes}</Text>

          <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
          <Text style={styles.recipeText}>{receitaSelecionada?.preparo}</Text>

          <View style={styles.buttonSpacing}>
            <Button 
              title="Fechar Receita" 
              color="#78022D" 
              onPress={() => setModalVerVisivel(false)} 
            />
          </View>
        </View>
      </Modal>

      {/* MODAL 2: Adicionar Nova Receita */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalAddVisivel}
        onRequestClose={cancelarCadastro}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>✨ Nova Receita</Text>
          
          <Text style={styles.inputLabel}>Nome da Receita</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ex: Bolo de Cenoura"
            placeholderTextColor="#999"
            value={nomeInput}
            onChangeText={setNomeInput}
          />

          <Text style={styles.inputLabel}>Ingredientes</Text>
          <TextInput 
            style={[styles.input, styles.inputMultiline]}
            placeholder="• 3 cenouras&#10;• 3 ovos&#10;• 1 xícara de óleo"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={ingredientesInput}
            onChangeText={setIngredientesInput}
          />

          <Text style={styles.inputLabel}>Modo de Preparo</Text>
          <TextInput 
            style={[styles.input, styles.inputMultiline]}
            placeholder="Bata tudo no liquidificador e asse por 40 minutos..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={preparoInput}
            onChangeText={setPreparoInput}
          />

          <View style={styles.buttonGroup}>
            <View style={styles.flexButton}>
              <Button title="Salvar" color="#0C0D57" onPress={salvarReceita} />
            </View>
            <View style={{ width: 16 }} />
            <View style={styles.flexButton}>
              <Button title="Cancelar" color="#566573" onPress={cancelarCadastro} />
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Botão Flutuante (FAB) */}
      <TouchableOpacity 
        style={styles.fabButton} 
        onPress={() => setModalAddVisivel(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFEFE",
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C0D57",
    marginBottom: 8,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#566573",
    marginBottom: 20,
    textAlign: "center"
  },
  scrollList: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço extra para o botão flutuante não tapar o último card
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0C0D57',
    marginBottom: 12,
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: "#FDFEFE",
    padding: 24,
    justifyContent: "center"
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0C0D57",
    marginBottom: 20,
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#78022D",
    marginTop: 20,
    marginBottom: 8
  },
  recipeText: {
    fontSize: 16,
    color: "#566573",
    lineHeight: 24,
    marginBottom: 4
  },
  buttonSpacing: {
    marginTop: 40
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0C0D57',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D5D8DC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8F9F9',
  },
  inputMultiline: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  flexButton: {
    flex: 1,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#78022D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
  }
});
