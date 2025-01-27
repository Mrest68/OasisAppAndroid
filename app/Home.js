import React from "react";
import {View, Text, StyleSheet} from "react-native";
import HomeHeader from "../components/Homeheader";
import Tabs from "../components/Tabs";

const Home=() =>{

return(
    <View style={styles.container} >
        <HomeHeader/>  
        <Tabs/>
     
    </View>

)

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F2F6FB',
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
})
export default Home;


