import React, {useState} from "react";
import {View, Image, Pressable, Text, StyleSheet} from 'react-native';
import { normalize } from './Normalize';

export default function LandingPage({navigation}){

    const [pressed, setPressed] = useState(false);

    const changeColorButton =()=>{
      setPressed(true);
    };
    const handlePressOut = ()=>{
      setPressed(false);
    };

    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: normalize(100),
      }}>

        <Image style={styles.OasisLogo} source={require('../assets/images/OasisLogo.png')} />
      
        <Pressable
          onPress={()=>navigation.navigate('home')}
          style={[styles.GSButton, pressed && styles.GSButtonPressed]}
          onPressIn={changeColorButton}
          onPressOut={handlePressOut}
          accessibilityLabel="Navigate to Home Screen"
          accessible
        >
          <Text style={styles.GetStarted}>Get Started</Text>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    OasisLogo: {
      height: 150,
      width: 150,
      marginBottom: normalize(50, "height"),
    },
    GetStarted: {
      fontSize: normalize(15),
      color: 'white',
    },
    GSButton: {
      backgroundColor: 'black',
      width: normalize(200),
      paddingVertical: normalize(20, 'height'),
      borderRadius: normalize(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    GSButtonPressed: {
      backgroundColor: 'blue',
    },
});
