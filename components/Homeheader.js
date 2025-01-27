import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import {normalize} from './Normalize'; // Import normalize

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Homeheader() {
    return (
        <View style={styles.container}>
            <Image style={styles.header} source={require('../assets/images/OasisLogo.png')} />
            <View style={styles.borderBottom}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingTop: normalize(70, 'height'),
        height: normalize(170, 'height'), 
    },
    header: {
        height: normalize(80, 'height'), // Adjust height based on screen height
        width: normalize(80), // Adjust width (auto scales for both width and height)
        resizeMode:'contain', // Adjust marginTop based on screen height
    },
    Logo: {
        marginBottom: normalize(50), // Adjust bottom margin
    },
  
});
