import { normalize } from "../Normalize";
import React, {useState,useEffect} from "react";
import { View,Text,ScrollView,TouchableOpacity,StyleSheet,Dimensions, ActivityIndicator,Modal,Platform,Image} from "react-native";
import axios from "axios";
// import {VideoView} from "expo-video"
import * as VideoThumbnails from 'expo-video-thumbnails';



const {width,height} = Dimensions.get('window');


const Interviewtab = ({ selectedCategory }) => {
    
    const [Thumbnails, setThumbnails] = useState([]);
    const [videos, setVideos] = useState([]);

    const [error, setError] = useState(null);
    const [filterVideo, setFilterVideo] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadVideos = async () => {

        try {
            const response = await axios.get("https://oasisapp-flask-bacb79846120.herokuapp.com/interview");
            
            
            if (response.data.success) {
                
                const videoData = response.data.video_urls
                    .filter(item => item.url && !item.url.endsWith('None'))
                    .map(item => ({ url: item.url, title: item.name || 'No Title', description: item.description || 'No Description', category: item.category || 'No Category',
                    thumbnailPromise: VideoThumbnails.getThumbnailAsync(item.url)
                }));
                
                const videosWithThumbnails = await Promise.all(
                    videoData.map( async(video)=>{
                        const thumbnail = await video.thumbnailPromise;
                        return {...video, thumbnail};
                    })
                )
                
                setVideos(videosWithThumbnails)
                
                setFilterVideo(videoData.filter(video => video.category === selectedCategory));
                

            } else {
                setError("Failed to load videos");
            }
        } catch (error) {
            
            setError("Failed to load videos");
        }
    };

    useEffect(() => {

        loadVideos();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilterVideo(videos.filter(video => video.category === selectedCategory));
        } else {
            setFilterVideo(videos);
        }
    }, [selectedCategory, videos]);

    const handlePlayPress = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setIsModalVisible(true);
        
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedVideo(null);
    };

    console.log(selectedVideo)

    return (
        <View style={styles.container}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {videos.length > 0 ? (
                <ScrollView contentContainerStyle={styles.videoScrollContainer}>
                    {filterVideo.map((video, index) => (
                        <View key={index} style={styles.videoRow}>
                            <Image style={styles.thumbnail} source={video.thumbnail} />
                            
                            <View style={styles.textContainer}>
                                <View style={styles.textAndButtonContainer}>
                                    <View style={styles.textContent}>
                                        <Text style={styles.videoTitle}>{video.title}</Text>
                                        <Text style={styles.videoDescription}>{video.description}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handlePlayPress(video.url)} style={styles.playButtonContainer}>
                                        <Text style={styles.playButtonText}>▶</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
            <ActivityIndicator size="large" color="#36b2f9" style={styles.loadingIndicator} />            )}
            {selectedVideo && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={handleCloseModal}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                    {/* <VideoView
                            source={{ uri: selectedVideo.url }}
                            style={styles.fullScreenVideo}
                            useNativeControls
                            resizeMode="contain"
                        /> */}

                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>✖</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: normalize(20, "height"),
        backgroundColor: '#f5f5f5', // Light background for contrast
    },
    errorContainer: {
        alignItems: 'center',
        marginVertical: normalize(20, "height"),
    },
    thumbnail:{
        height:normalize(180, "height"),
        width: normalize(100),
        margin:normalize(10),
        borderRadius: normalize(10),
    },
    errorText: {
        color: 'red',
        marginVertical: normalize(3, "height"),
        fontSize: normalize(16, "width"),
    },
    retryButton: {
        backgroundColor: '#36b2f9',
        padding: normalize(10, "width"),
        borderRadius: normalize(5, "width"),
    },
    retryButtonText: {
        color: 'white',
        fontSize: normalize(16, "width"),
    },
    loadingIndicator: {
        marginTop: normalize(50, "height"),
    },
    videoScrollContainer: {
        paddingHorizontal: normalize(10, "width"),
    },
    videoRow: {
        flexDirection: 'row',
        marginBottom: normalize(10, "height"),
        backgroundColor: 'white',
        borderRadius: normalize(10, "width"),
        alignItems: 'center',
        padding: normalize(10, "width"),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: normalize(2, "height") },
        shadowOpacity: 0.1,
        shadowRadius: normalize(4, "width"),
        elevation: 3, // For Android shadow
    },
    video: {
        width: normalize(76, "width"),
        height: normalize(135, "height"),
        borderRadius: normalize(8, "width"),
        marginRight: normalize(10, "width"),
    },
    textContainer: {
        flex: 1,
    },
    textAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
    },
    videoTitle: {
        fontSize: normalize(16, "width"),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: normalize(7, "height"),
    },
    videoDescription: {
        fontSize: normalize(13, "width"),
        color: '#666',
        marginBottom: normalize(10, "height"),
    },
    playButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36b2f9',
        borderRadius: normalize(20, "width"),
        marginHorizontal:normalize(2),
        padding: normalize(10, "width"),
    },
    playButtonText: {
        fontSize: normalize(15, "width"),
        color: 'white',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideo: {
        width: normalize(width, "width"),
        height: normalize(height, "height"),
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? normalize(50, "height") : normalize(30, "height"),
        right: Platform.OS === 'ios' ? normalize(20, "width") : normalize(30, "width"),
        backgroundColor: 'white',
        borderRadius: normalize(20, "width"),
        padding: normalize(10, "width"),
        

    },
    closeButtonText: {
        fontSize: normalize(24, "width"),
        color: 'black',
    },
});


export default Interviewtab;


