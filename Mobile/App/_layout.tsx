import { Drawer } from "expo-router/drawer";
import React from "react";

export default function Layout() {
    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title: "Motozone", headerShown: false }} />
        </Drawer>
    )
}