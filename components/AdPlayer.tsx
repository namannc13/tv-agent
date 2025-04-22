import React, { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";

const screen = Dimensions.get("window");

const mockAds = [
  {
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: undefined,
  },
  {
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: undefined,
  },
  {
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: undefined,
  },
];

export default function AdPlayer() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const currentAd = mockAds[currentAdIndex];

    if (currentAd.type === "image") {
      const timer = setTimeout(() => {
        nextAd();
      }, currentAd.duration);

      return () => clearTimeout(timer);
    }
  }, [currentAdIndex]);

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % mockAds.length);
  };

  const currentAd = mockAds[currentAdIndex];

  return (
    <View style={styles.container}>
      {currentAd.type === "image" ? (
        <Image
          source={{ uri: currentAd.url }}
          style={styles.media}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{ uri: currentAd.url }}
          style={styles.media}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
              nextAd();
            }
          }}
          ref={videoRef}
          useNativeControls={false}
          shouldPlay
          isLooping={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  media: {
    width: screen.width,
    height: screen.height,
  },
});
