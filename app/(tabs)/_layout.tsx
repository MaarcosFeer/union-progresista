import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/theme'; // Ajusta la ruta ../ si es necesario

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ocultamos el header default para usar el nuestro custom
        tabBarActiveTintColor: COLORS.secondary, // Rojo cuando está activo
        tabBarInactiveTintColor: COLORS.gray,
      }}
    >
      {/* Pestaña 1: Alumno (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Alumno',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      
      {/* Pestaña 2: Profesor (profesor.tsx) */}
      <Tabs.Screen
        name="profesor"
        options={{
          title: 'Profesor',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}