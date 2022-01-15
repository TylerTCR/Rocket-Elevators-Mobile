import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function DetailsScreen({ route, navigation }) {
  let { id, status } = route.params;
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
  }, [data]);

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
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => {
          navigation.navigate("Home")
        }}>
        <View style={styles.backButton}>
          <Text>Go Back</Text>
        </View>
      </TouchableOpacity>
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
          style={[styles.status, status == "Active" ? {color: "green"} : {color: "red"}]}>
          {status}
          </Text>
        )}
        
      </View>
      <TouchableOpacity 
        style={styles.button}
        disabled={status == "Active" ? true : false}
        onPress={() => {
          navigation.navigate("Details", {
            id: id,
            status: "Active",
          });
          updateStatus()
        }}>
        <Text style={styles.getStartedText}>Set to Active</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logOutButton}
        onPress={() => {
          navigation.navigate("Root")
        }}>
        <Text style={styles.getStartedText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flex: 0.9,
    marginStart: -275,
  },
  container: {
    flex: 0.75,
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
    width: '70%',
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
    fontSize: 18,
    lineHeight: 24,
    padding: 7,
    color: "#ffffff",
    textAlign: 'center',
  },
  button:{
    backgroundColor: "#61c058",
    borderRadius: 10,
    padding: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },
  backButton:{
    backgroundColor: "#000aff",
    borderRadius: 10,
    padding: 15,
    width: "80%",
    alignItems: "center",
  },
  logOutButton:{
    backgroundColor: "#ff192b",
    borderRadius: 10,
    padding: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },
});
