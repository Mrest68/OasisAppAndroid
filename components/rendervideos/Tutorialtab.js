import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  Platform,
  Image,
  SafeAreaView
} from "react-native";
import axios from "axios";
import { normalize } from "../Normalize";
import VideoView from "../VideoView";

const { width, height } = Dimensions.get('window');

const Tutorialtab = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMoreVideos, setHasMoreVideos] = useState(true);
  const [totalVideos, setTotalVideos] = useState(0);

  const loadVideos = async (pageNum) => {
    if (!selectedCategory) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://oasisapp-flask-bacb79846120.herokuapp.com/tutorials?category=${encodeURIComponent(selectedCategory)}&page=${pageNum}`
      );

      if (response.data.success) {
        const videoData = response.data.video_urls
          .filter(item => item.url && !item.url.endsWith('None'))
          .map(item => ({
            url: item.url,
            title: item.name || 'No Title',
            description: item.description || 'No Description',
            category: item.category || 'No Category'
          }));

        setVideos(videoData);
        setTotalVideos(response.data.total_videos);
        setHasMoreVideos(response.data.has_more);
        setError(null);
      } else {
        setError("Failed to load videos");
      }
    } catch (error) {
      console.error('Error loading videos:', error);
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setVideos([]);
    setHasMoreVideos(true);
    loadVideos(1);
  }, [selectedCategory]);

  useEffect(() => {
    loadVideos(page);
  }, [page]);

  const handlePlayPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedVideo(null);
  };

  const handleRetry = () => {
    loadVideos(page);
  };

  const handleNextPage = () => {
    if (hasMoreVideos) {
      setPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#36b2f9" style={styles.loadingIndicator} />
      ) : (
        <ScrollView key={`${selectedCategory}-${page}`} contentContainerStyle={styles.videoScrollContainer}>
          {videos.length > 0 ? (
            <>
              {videos.map((video, index) => (
                <View key={index} style={styles.videoRow}>
                  <Image
                    style={styles.thumbnail}
                    source={require('../../assets/images/OasisLogo.png')}
                  />
                  <View style={styles.textContainer}>
                    <View style={styles.textAndButtonContainer}>
                      <View style={styles.textContent}>
                        <Text style={styles.videoTitle}>{video.title}</Text>
                        <Text style={styles.videoDescription}>{video.description}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handlePlayPress(video.url)}
                        style={styles.playButtonContainer}
                      >
                        <Text style={styles.playButtonText}>▶</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
              <Text style={styles.paginationInfo}>
                Showing {((page - 1) * 3) + 1} - {Math.min(page * 3, totalVideos)} of {totalVideos} videos
              </Text>
            </>
          ) : (
            <Text style={styles.noVideosText}>
              No videos available for the selected category.
            </Text>
          )}
        </ScrollView>
      )}

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          style={[styles.paginationButton, page <= 1 && styles.disabledButton]}
          disabled={page <= 1}
        >
          <Text style={[styles.paginationText, page <= 1 && styles.disabledText]}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>Page {page}</Text>

        <TouchableOpacity
          onPress={handleNextPage}
          style={[styles.paginationButton, !hasMoreVideos && styles.disabledButton]}
          disabled={!hasMoreVideos}
        >
          <Text style={[styles.paginationText, !hasMoreVideos && styles.disabledText]}>Next</Text>
        </TouchableOpacity>
      </View>
      
      {/* The Modal to play the selected video */}
      
      {selectedVideo && (
        
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={handleCloseModal}
          animationType="slide"
        >
          <TouchableOpacity style={styles.modalBackground} >
            <View style={styles.modalContainer}>
              <VideoView
                source={{ uri: selectedVideo }}
                style={styles.fullScreenVideo}
                useNativeControls
                resizeMode="contain"
                shouldPlay
              />
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>✖</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
       

      )}
    </View>
    
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: normalize(20, "height"),
        backgroundColor: '#f5f5f5',
    },
    thumbnail:{
        height: 100,
        width: 100,
        margin:normalize(10),
        borderRadius: normalize(10),
    },
    errorContainer: {
        alignItems: 'center',
        marginVertical: normalize(20, "height"),
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
        elevation: 3,
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
        marginHorizontal: normalize(2, "width"),
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
        padding: normalize(5, "width"),
    },
    closeButtonText: {
        fontSize: normalize(24, "width"),
        color: 'black',
    },
    noVideosText: {
        fontSize: normalize(16, "width"),
        color: '#888',
        textAlign: 'center',
        marginTop: normalize(20, "height"),
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(20, "height"),
    },
    paginationButton: {
        padding: normalize(10, "width"),
        marginHorizontal: normalize(5, "width"),
        backgroundColor: '#36b2f9',
        borderRadius: normalize(5, "width"),
    },
    paginationText: {
        fontSize: normalize(16, "width"),
        color: '#333',
        marginHorizontal: normalize(10, "width"),
    },
    disabledText: {
        color: '#999',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    paginationInfo: {
        textAlign: 'center',
        marginTop: normalize(10, "height"),
        color: '#666',
        fontSize: normalize(14, "width"),
    },
});

export default Tutorialtab;