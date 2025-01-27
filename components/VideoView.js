
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const VideoView = ({
  source,
  style,
  useNativeControls,
  resizeMode = 'contain',
  shouldPlay = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Video
        source={source}
        style={[styles.video, style]}
        useNativeControls={useNativeControls}
        resizeMode={resizeMode}
        shouldPlay={shouldPlay}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default VideoView;
