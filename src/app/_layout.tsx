import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Drawer>
        <Drawer.Screen name="index" options={{drawerItemStyle: { display: 'none' }, title: "Página Inicial", headerShown: false}} />
        <Drawer.Screen name="cadastroUser" options={{drawerItemStyle: { display: 'none' }, title: "Faça seu cadastro", headerShown: false }} />
        <Drawer.Screen name="login" options={{drawerItemStyle: { display: 'none' }, title: "Entre com sua conta", headerShown: false }} />
        <Drawer.Screen name="cadastroMoto" options={{ title: "Registre sua Moto" }} />
        <Drawer.Screen name="mottu" options={{ title: "Mottu", 
        drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="patios" options={{ title: "Pátios" }} />
        <Drawer.Screen name="listamotos" options={{ title: "Lista de Motos" }} />
        <Drawer.Screen name="integrantes" options={{ title: "Nosso Time" }} />
        <Drawer.Screen name="patiosSetores" options={{ title: "Patios e Setores" }} />
        <Drawer.Screen name="setorSpots" options={{ drawerItemStyle: { display: 'none' }, headerShown: false }} />
      </Drawer>
    </ThemeProvider>
  );
}
