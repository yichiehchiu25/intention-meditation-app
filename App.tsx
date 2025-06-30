import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, 
TextInput, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface Intention {
  id: string;
  appName: string;
  intention: string;
  duration: number;
  timestamp: Date;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = 
useState<'home' | 'create' | 'timer'>('home');
  const [intentions, setIntentions] = 
useState<Intention[]>([]);
  const [newIntention, setNewIntention] = useState({
    appName: '',
    intention: '',
    duration: 10
  });

  const createIntention = () => {
    if (newIntention.appName && newIntention.intention) {
      const intention: Intention = {
        id: Date.now().toString(),
        appName: newIntention.appName,
        intention: newIntention.intention,
        duration: newIntention.duration,
        timestamp: new Date()
      };
      setIntentions([...intentions, intention]);
      setNewIntention({ appName: '', intention: '', 
duration: 10 });
      setCurrentScreen('home');
    }
  };

  const HomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>正念使用意圖</Text>
      <Text 
style={styles.subtitle}>在使用社群媒體前，設定你的使用意圖</Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => setCurrentScreen('create')}
      >
        <Text 
style={styles.buttonText}>設定新的使用意圖</Text>
      </TouchableOpacity>

      {intentions.length > 0 && (
        <View style={styles.intentionsContainer}>
          <Text 
style={styles.sectionTitle}>最近的意圖</Text>
          <ScrollView style={styles.intentionsList}>
            
{intentions.slice(-3).reverse().map((intention) => (
              <View key={intention.id} 
style={styles.intentionCard}>
                <Text 
style={styles.appName}>{intention.appName}</Text>
                <Text 
style={styles.intentionText}>{intention.intention}</Text>
                <Text 
style={styles.duration}>{intention.duration} 分鐘</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const CreateScreen = () => (
    <View style={styles.container}>
      <Text style={styles.title}>設定使用意圖</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>要使用的 App</Text>
        <TextInput
          style={styles.input}
          value={newIntention.appName}
          onChangeText={(text) => 
setNewIntention({...newIntention, appName: text})}
          placeholder="例如：Instagram, Facebook, TikTok"
        />

        <Text style={styles.label}>使用意圖</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={newIntention.intention}
          onChangeText={(text) => 
setNewIntention({...newIntention, intention: text})}
          placeholder="我想要..."
          multiline
          numberOfLines={3}
        />

        <Text 
style={styles.label}>預計使用時間（分鐘）</Text>
        <TextInput
          style={styles.input}
          value={newIntention.duration.toString()}
          onChangeText={(text) => 
setNewIntention({...newIntention, duration: parseInt(text) 
|| 10})}
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={createIntention}
        >
          <Text style={styles.buttonText}>開始使用</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text 
style={styles.secondaryButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'create' && <CreateScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#7f8c8d',
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
  intentionsContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  intentionsList: {
    maxHeight: 200,
  },
  intentionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 4,
  },
  intentionText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});
