import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { normalize } from "./Normalize";
import CategoryCircles from './Categorycircles';
import TutorialTab from "./rendervideos/Tutorialtab.js";
import InterviewTab from "./rendervideos/Interviewtab.js";
import HomeworkTab from "./rendervideos/Homeworktab.js";

const baseWidth = 375;

export default function Tabs() {
    const [selectedTab, setSelectedTab] = useState('TrainingModules');
    const [selectedCategory, setSelectedCategory] = useState('Passing');

    const images = {
        TrainingModules: [
            { source: require('../assets/images/OasisLogo.png'), category: 'Passing' },
            { source: require('../assets/images/OasisLogo.png'), category: 'Shooting' },
            { source: require('../assets/images/OasisLogo.png'), category: 'Dribbling' },
            { source: require('../assets/images/OasisLogo.png'), category: 'Speed & Agility' },
        ],
        Interview: [
            { source: require('../assets/images/OasisLogo.png'), category: 'Player' },
            { source: require('../assets/images/OasisLogo.png'), category: 'Coach' },
        ],
    };

    const handleCategorySelect = (category) => {
        console.log('Selected category:', category); // Debugging category selection
        setSelectedCategory(category);
    };

    const renderContent = () => {
        console.log('Rendering content for tab:', selectedTab); // Debugging tab selection
        switch (selectedTab) {
            case 'TrainingModules':
                return (
                    <>
                        <CategoryCircles images={images[selectedTab]} onCategorySelect={handleCategorySelect} />
                        <TutorialTab selectedCategory={selectedCategory} />
                    </>
                );
            case 'Interview':
                return (
                    <>
                        <CategoryCircles images={images[selectedTab]} onCategorySelect={handleCategorySelect} />
                        <InterviewTab selectedCategory={selectedCategory} />
                    </>
                );
            case 'Homework':
                return <HomeworkTab selectedCategory={selectedCategory} />;
            default:
                return <Text>Select a tab to see content</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Interview')}
                    style={[styles.tabButton, selectedTab === 'Interview' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Interview' && styles.tabButtonTextActive]}>
                        Interview
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('TrainingModules')}
                    style={[styles.tabButton, selectedTab === 'TrainingModules' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'TrainingModules' && styles.tabButtonTextActive]}>
                        Training Modules
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setSelectedTab('Homework')}
                    style={[styles.tabButton, selectedTab === 'Homework' && styles.tabButtonActive]}
                >
                    <Text style={[styles.tabButtonText, selectedTab === 'Homework' && styles.tabButtonTextActive]}>
                        Homework
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%'
    },
    contentContainer:{
        paddingHorizontal: normalize(5,"width"),
    },
    tabButton: {
        paddingVertical: normalize(10, "height"),
    },
    
    tabContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom:normalize(10),
        paddingHorizontal:normalize(6),
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'black',


    },
    tabButtonText:{
        fontSize:normalize(16),
        color:"black",
        fontFamily:'sans-serif',

    },
    tabButtonTextActive: {
        color: '#9dcff8',
        fontWeight: 'bold',
    },
    })

