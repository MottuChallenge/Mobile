import "../i18n/i18n";
import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <ThemeProvider>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
            title: t("drawer.home"),headerShown: false
          }}
        />
        <Drawer.Screen
          name="cadastroUser"
          options={{
            drawerItemStyle: { display: "none" },
            title: t("drawer.register"),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            drawerItemStyle: { display: "none" },
            title: t("drawer.login"),
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="cadastroMoto"
          options={{ title: t("drawer.registerMotorcycle") }}
        />
        <Drawer.Screen
          name="mottu"
          options={{
            title: t("drawer.mottu"),
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen name="patios" options={{ title: t("drawer.yards") }} />
        <Drawer.Screen
          name="listamotos"
          options={{ title: t("drawer.motorcycleList") }}
        />
        <Drawer.Screen
          name="integrantes"
          options={{ title: t("drawer.team") }}
        />
        <Drawer.Screen
          name="patiosSetores"
          options={{ title: t("drawer.yardsAndSectors") }}
        />
        <Drawer.Screen
          name="setorSpots"
          options={{ drawerItemStyle: { display: "none" }, headerShown: false }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
