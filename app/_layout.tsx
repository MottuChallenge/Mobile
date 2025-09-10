import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "../theme/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Página Inicial" }} />
        <Drawer.Screen name="cadastro" options={{ title: "Cadastro" }} />
        <Drawer.Screen name="mottu" options={{ title: "Mottu" }} />
        <Drawer.Screen name="patios" options={{ title: "Pátios" }} />
        <Drawer.Screen name="listamotos" options={{ title: "Lista de Motos" }} />
        <Drawer.Screen name="integrantes" options={{ title: "Nosso Time" }} />
      </Drawer>
    </ThemeProvider>
  );
}
