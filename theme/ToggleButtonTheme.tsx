import React from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useThemeContext } from "./ThemeContext";


export default function ThemeToggleButton(){
    const {toggleTheme, colors} = useThemeContext()

    return(
        <TouchableOpacity 
            style={[styles.button,{backgroundColor:colors.button}]}
            onPress={toggleTheme}
        >
            <Text style={[styles.text,{color:colors.buttonText}]}>Alterar Tema</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        paddingVertical:12,
        paddingHorizontal:24,
        borderRadius:8,
        marginTop:20,
        marginBottom: 10,
    },
    text:{
        fontSize:16,
        fontWeight:'bold'
    }
})