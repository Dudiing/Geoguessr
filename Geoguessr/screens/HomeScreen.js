import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const HomeScreen = () => {
  const initialRegion = {
    latitude: 40.239748,
    longitude: -4.239292,
    latitudeDelta: 50.0,
    longitudeDelta: 50.0,
  };

  const correctLocation = {
    latitude: 41.7220195,
    longitude: 1.8182334,
  };

  const [userLocations, setUserLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    if (userLocations.length > 1) {
      const coordinates = userLocations.map((location) => ({
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [userLocations]);

  const handleMapPress = (event) => {
    setUserLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const calculateDistance = () => {
    if (!userLocation) {
      return null;
    }

    const distance = getDistance(correctLocation, userLocation);
    setDistance(distance);
    return distance;
  };

  const getDistance = (point1, point2) => {
    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;

    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance * 1000; // Convertir a metros
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const handleCheckLocation = () => {
    const calculatedDistance = calculateDistance();

    if (calculatedDistance !== null) {
      setModalVisible(true);
    } else {
      alert('Error al calcular la distancia.');
    }

    setUserLocations([...userLocations, userLocation]);
  };

  const handlePlayAgain = () => {
    setUserLocations([]);
    setUserLocation(null);
    setDistance(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAPA!</Text>
      <MapView style={styles.map} initialRegion={initialRegion} onPress={handleMapPress} ref={mapRef}>
        {userLocations.map((location, index) => (
          <Marker key={index} coordinate={location} title={`Ubicación ${index + 1}`} />
        ))}
        {userLocations.length > 0 && userLocation && (
          <Polyline
            coordinates={[
              { latitude: correctLocation.latitude, longitude: correctLocation.longitude },
              { latitude: userLocation.latitude, longitude: userLocation.longitude },
            ]}
            strokeWidth={2}
            strokeColor="red"
          /> 
        )}
        {userLocation && <Marker coordinate={userLocation} title="Ubicación seleccionada" />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleCheckLocation}>
        <Text style={styles.buttonText}>Verificar Ubicación</Text>     </TouchableOpacity>

      {/* Textos de distancia y botones */}
      {modalVisible && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            Distancia: {distance !== null ? distance.toFixed(2) + ' metros' : 'No se ha calculado la distancia'}
          </Text>
          <TouchableOpacity style={styles.overlayButton} onPress={handlePlayAgain}>
            <Text style={styles.buttonText}>Jugar de Nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  map: {
    width: '80%',
    height: '50%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
