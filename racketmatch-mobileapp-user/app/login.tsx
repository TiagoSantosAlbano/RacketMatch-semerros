import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading: loadingAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preenche todos os campos.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      if (!token || !user) {
        setError('Login inválido. Verifica as credenciais.');
        setLoading(false);
        return;
      }
      await login(token, user);
      router.replace('/home');
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Falha no login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>🎾 RacketMatch</Text>
        <Text style={styles.title}>Iniciar Sessão</Text>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="📧 Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading && !loadingAuth}
        />
        <TextInput
          style={styles.input}
          placeholder="🔒 Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          editable={!loading && !loadingAuth}
        />
        <TouchableOpacity
          style={styles.togglePassword}
          onPress={() => setShowPassword(!showPassword)}
          disabled={loading || loadingAuth}
        >
          <Text style={styles.togglePasswordText}>
            {showPassword ? '🙈 Esconder' : '👁️ Mostrar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading || loadingAuth}
        >
          {loading || loadingAuth ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>🔓 Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/register')}
          disabled={loading || loadingAuth}
        >
          <Text style={styles.registerText}>
            Não tens conta? <Text style={styles.registerLink}>Regista-te</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fafe',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    elevation: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f97316',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
  togglePassword: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  togglePasswordText: {
    fontSize: 14,
    color: '#00c4b4',
  },
  button: {
    backgroundColor: '#00c4b4',
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    marginTop: 16,
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  registerLink: {
    color: '#00a600',
    fontWeight: 'bold',
  },
});
