
import { Drawer } from "expo-router/drawer";
import { ThemeProvider } from "../contexts/ThemeContext";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

export default function Layout() {
  const { t } = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerItemStyle: { display: "none" },
              title: t("drawer.home"),  headerShown: false,
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
    </I18nextProvider>
  );
}
