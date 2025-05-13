import { Drawer } from "expo-router/drawer";
import React from "react";

export default function Layout() {
    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title: "MotoZone",}} />
            <Drawer.Screen name="mottu" options={{ title: "Mottu" }} />
            <Drawer.Screen name="patios" options={{ title: "Patios" }} />
        </Drawer>
    )
}