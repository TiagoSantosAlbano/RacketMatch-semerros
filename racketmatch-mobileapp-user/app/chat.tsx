import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Barra superior verde com botão voltar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/home')}>
          <Icon name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conversas</Text>
      </View>

      {/* Abas de Navegação */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => router.push('/notifications')}
        >
          <Text style={styles.tabText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Chats</Text>
        </TouchableOpacity>
      </View>

      {/* Estado Vazio */}
      <View style={styles.content}>
        <Text style={styles.noChatsText}>Sem conversas ainda</Text>
        <Text style={styles.subText}>As tuas conversas aparecerão aqui</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/start-conversation')}
        >
          <Text style={styles.startButtonText}>Iniciar conversa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E4A3D',
    height: 54,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: '#20876b', // círculo mais escuro (podes remover se não gostares)
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 2,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#2E4A3D',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    padding: 10,
  },
  tabActive: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#A8D5BA',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#A8D5BA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noChatsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A3D',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  startButton: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  startButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
