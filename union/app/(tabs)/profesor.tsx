import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import { supabase } from '@/lib/supabase';
import { COLORS } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfessorDashboard() {
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAttendance = async () => {
    setRefreshing(true);
    // Traemos asistencias de HOY uniendo con la tabla de estudiantes
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        id,
        check_in_time,
        students ( full_name, dni )
      `)
      .gte('check_in_time', `${today}T00:00:00`)
      .order('check_in_time', { ascending: false });

    if (!error) setAttendanceList(data);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardLeftBorder} />
      <View style={styles.cardContent}>
        <Text style={styles.studentName}>{item.students.full_name}</Text>
        <Text style={styles.dni}>DNI: {item.students.dni}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={16} color={COLORS.gray} />
        <Text style={styles.timeText}>
          {new Date(item.check_in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* Header Institucional */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Asistencias Hoy</Text>
          <Text style={styles.headerSubtitle}>Club Unión Progresista</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{attendanceList.length}</Text>
        </View>
      </View>

      <FlatList
        data={attendanceList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAttendance} colors={[COLORS.secondary]} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aún no hay alumnos presentes hoy.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    backgroundColor: COLORS.primary, 
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomRightRadius: 20, 
    borderBottomLeftRadius: 20 
  },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#E0E0E0', fontSize: 14 },
  badge: { backgroundColor: COLORS.secondary, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  badgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.card, 
    marginBottom: 10, 
    borderRadius: 8, 
    overflow: 'hidden', 
    elevation: 2 
  },
  cardLeftBorder: { width: 5, backgroundColor: COLORS.success },
  cardContent: { flex: 1, padding: 15 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  dni: { fontSize: 12, color: COLORS.gray },
  timeContainer: { padding: 15, justifyContent: 'center', alignItems: 'flex-end' },
  timeText: { color: COLORS.primary, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: COLORS.gray }
});