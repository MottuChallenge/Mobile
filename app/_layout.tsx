import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <Drawer>
            <Drawer.Screen name="index" 
                options={{ 
                    title: "Pagina Inicial", 
                    headerTransparent: true, 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#fff"}, 
                    headerTintColor: "#FFF"}} 
            />
            <Drawer.Screen name="cadastro" options={{ 
                    title: "Cadastro", 
                    headerTransparent: true, 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#fff"}, 
                    headerTintColor: "#FFF"}} 
            />
            <Drawer.Screen name="mottu" options={{ 
                    title: "Mottu", 
                    headerTransparent: true, 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#fff"}, 
                    headerTintColor: "#FFF"}} 
            />
            <Drawer.Screen name="patios" options={{ 
                    title: "Patios", 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#000"}, 
                    headerTintColor: "#000"}} 
            />
            <Drawer.Screen name="listamotos" options={{ 
                    title: "Lista de Motos", 
                    headerTransparent: true, 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#fff"}, 
                    headerTintColor: "#FFF"}} 
            />
            <Drawer.Screen name="integrantes" options={{ 
                    title: "Nosso Time", 
                    headerTransparent: true, 
                    headerTitleAlign: "center", 
                    headerTitleStyle: {color: "#fff"}, 
                    headerTintColor: "#FFF"}} 
            />
        </Drawer>
    )
}