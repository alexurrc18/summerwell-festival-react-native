import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useRef, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

export default function Map() {

  const mapRef = useRef<MapView>(null);

  useFocusEffect(
    useCallback(() => {
      mapRef.current?.animateToRegion({
          latitude: 44.5668049534031, 
          longitude: 25.939700548772894,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
      }, 0); 
    }, [])
  );

  return (
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 44.5668049534031, 
                longitude: 25.939700548772894,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }}
        >
    </MapView>
  );
}