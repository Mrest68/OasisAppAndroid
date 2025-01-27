import React, {useState} from "react";
import { View,Text,Image,ScrollView,TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { normalize } from "./Normalize";

const {width,height} = Dimensions.get('window');


const Categorycircles = ({ images, onCategorySelect }) => {
    const [pressedIndex, setPressedIndex] = useState(0);

    const handlePress = (index) => {
        setPressedIndex(index);
        const selectedCategory = images[index].category;

        onCategorySelect(selectedCategory);
    };

    return (
        <View >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((imageSource, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(index)}
                            
                        >
                            <Image
                                style={[styles.image, pressedIndex === index && styles.isPressed]}
                                source={imageSource.source}
                            />
                            <Text style={styles.categoryText}>
                                {images[index].category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
         
        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: normalize(16), // Normalize font size
        marginTop: normalize(5), // Normalize margin
    },
    container: {
        height: normalize(height * 0.22), // Normalize 22% of screen height
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%', // Full width of the screen
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: normalize(10),
         
    },
    image: {
        height: normalize(85), 
        width: normalize(85), // Normalize image width
        borderRadius: normalize(95 / 2), // Normalize border radius for circle
        marginHorizontal: normalize(10),
        
    },
    isPressed: {
        borderWidth: normalize(3), // Normalize border width
        borderColor: '#9dcff8',
    },
});

export default Categorycircles;
