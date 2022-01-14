import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function DetailsScreen({ route, navigation }) {
  const { id, status } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const elevatorStatusEndpoint = `https://tyler-rocket-elevator.azurewebsites.net/elevator/${id}`
  const updateElevatorStatusEndpoint = "https://tyler-rocket-elevator.azurewebsites.net/elevator"

  useEffect(() => {
    fetch(elevatorStatusEndpoint)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }, []);

  function updateStatus() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic");
    headers.append("Origin", "*");

    fetch(updateElevatorStatusEndpoint, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT",
        "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
      }),
      body: JSON.stringify({
        id: id,
        status: "Active"
      })
    })
    .then((response) => response.text())
    .then((responseText) => {
      alert(responseText)
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        Elevator #{JSON.stringify(id)}
      </Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View>

        <Text style={styles.title} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
        Current Status:
        </Text>

        {isLoading ? <ActivityIndicator/> : (
          <Text 
          style={[styles.status, data.status == "Active" ? {color: "green"} : {color: "red"}]}>
          {status}
          </Text>
        )}
        
      </View>

      <View style={styles.button}>
        <Button
          title="Set to Active"
          color="#ffffff"
          onPress={() => {
            updateStatus()
            // navigation.navigate("Home")
          }}>
        </Button>
      </View>

      <View style={styles.logOutButton}>
        <Button
          title="Log Out"
          color="#ffffff"
          onPress={() => {
            navigation.navigate("Root")
          }}>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  status: {
    padding: 20,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  button:{
    backgroundColor: "#61c058",
    borderRadius: 10,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  logOutButton:{
    backgroundColor: "#ff192b",
    borderRadius: 10,
    padding: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
});
