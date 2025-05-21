import { Drawer } from "expo-router/drawer";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

const transparentHeaderOptions: DrawerNavigationOptions = {
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    fontFamily: "Nunito", 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  headerTintColor: "#FFF",
};

const solidHeaderOptions: DrawerNavigationOptions = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: "#000",
    fontWeight: "900",
    fontSize: 22,
    fontFamily: "Nunito",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  headerTintColor: "#000",
};

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Página Inicial", ...transparentHeaderOptions }} />
      <Drawer.Screen name="cadastro" options={{ title: "Cadastro", ...transparentHeaderOptions }} />
      <Drawer.Screen name="mottu" options={{ title: "Mottu", ...transparentHeaderOptions }} />
      <Drawer.Screen name="patios" options={{ title: "Pátios", ...solidHeaderOptions }} />
      <Drawer.Screen name="listamotos" options={{ title: "Lista de Motos", ...transparentHeaderOptions }} />
      <Drawer.Screen name="integrantes" options={{ title: "Nosso Time", ...transparentHeaderOptions }} />
    </Drawer>
  );
}
