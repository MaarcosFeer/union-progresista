import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { supabase } from '@/lib/supabase';
import { getDistanceInMeters } from '@/utils/geo';
import { COLORS, CLUB_CONFIG } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StudentCheckIn() {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    if (!dni) return Alert.alert("Error", "Ingresa tu DNI");
    setLoading(true);

    try {
      // 1. Permisos y Obtener Ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos tu ubicación para validar la asistencia.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;

      // 2. Validar Distancia (Lógica de Negocio)
      const distance = getDistanceInMeters(latitude, longitude, CLUB_CONFIG.lat, CLUB_CONFIG.lon);
      
      if (distance > CLUB_CONFIG.radioMetros) {
        Alert.alert("Fuera de Rango", `Estás a ${Math.round(distance)}m del club. Acércate más.`);
        setLoading(false);
        return;
      }

      // 3. Buscar alumno por DNI
      const { data: students, error: studentError } = await supabase
        .from('students')
        .select('id, full_name')
        .eq('dni', dni)
        .single();

      if (studentError || !students) {
        Alert.alert("Error", "DNI no encontrado. Habla con el profe.");
        setLoading(false);
        return;
      }

      // 4. Registrar Asistencia
      const { error: insertError } = await supabase
        .from('attendance')
        .insert([{ student_id: students.id, location_lat: latitude, location_lon: longitude }]);

      if (insertError) throw insertError;

      Alert.alert("¡Éxito!", `Bienvenido, ${students.full_name}. Asistencia registrada.`);
      setDni(''); // Limpiar campo

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Ocurrió un problema técnico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="basketball-outline" size={60} color={COLORS.primary} />
        <Text style={styles.title}>Check-in CUP</Text>
        <Text style={styles.subtitle}>Ingresa tu DNI para dar el presente</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Tu DNI (ej: 11222333)"
          keyboardType="numeric"
          value={dni}
          onChangeText={setDni}
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleCheckIn}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>DAR PRESENTE</Text>}
        </TouchableOpacity>
      </View>
      
      <Text style={styles.footer}>Ubicación requerida para validar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, marginTop: 10 },
  subtitle: { color: COLORS.gray, marginTop: 5 },
  card: { backgroundColor: COLORS.card, padding: 20, borderRadius: 15, elevation: 3 },
  input: { backgroundColor: '#FFF', borderRadius: 8, padding: 15, fontSize: 18, marginBottom: 20, borderWidth: 1, borderColor: '#DDD' },
  button: { backgroundColor: COLORS.secondary, padding: 18, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  footer: { textAlign: 'center', marginTop: 20, color: COLORS.gray, fontSize: 12 }
});