/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const COLORS = {
  primary: '#003B73',  // Azul Institucional CUP
  secondary: '#D6001C', // Rojo Pasión (Accent)
  background: '#FFFFFF',
  card: '#F5F5F5',      // Gris muy suave para contraste
  text: '#1A1A1A',
  textLight: '#FFFFFF',
  success: '#2E7D32',   // Verde Feedback
  error: '#D32F2F',     // Rojo Error
  gray: '#9E9E9E'
};
export const CLUB_CONFIG = {
  name: "Club Unión Progresista",
  // Coordenadas del club (ejemplo genérico, cámbialas por las reales del club)
  // Puedes sacarlas de Google Maps (click derecho -> ¿Qué hay aquí?)
  lat: -39.10302044957148,
  lon: -67.083199525152,
  radioMetros: 100 // Margen de error permitido
};
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
