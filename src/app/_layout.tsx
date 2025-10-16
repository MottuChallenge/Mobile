import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Página Inicial" }} />
        <Drawer.Screen name="cadastroUser" options={{ title: "Faça seu cadastro" }} />
        <Drawer.Screen name="login" options={{ title: "Entre com sua conta" }} />
        <Drawer.Screen name="cadastroMoto" options={{ title: "Registre sua Moto" }} />
        <Drawer.Screen name="mottu" options={{ title: "Mottu", 
        drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="patios" options={{ title: "Pátios" }} />
        <Drawer.Screen name="listamotos" options={{ title: "Lista de Motos" }} />
        <Drawer.Screen name="integrantes" options={{ title: "Nosso Time" }} />
      </Drawer>
    </ThemeProvider>
  );
}
