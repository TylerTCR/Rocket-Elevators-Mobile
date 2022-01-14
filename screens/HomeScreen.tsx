import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'LogIn'>) {
  const elevatorListEndpoint = "https://tyler-rocket-elevator.azurewebsites.net/elevator/inactive";
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getElevators = async () => {
    try {
      const response = await fetch(elevatorListEndpoint, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Origin, Content-Type, Accept"
        }),
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getElevators();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inactive Elevators</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <View>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}
                  onPress={() => {
                    navigation.navigate("Details", {
                      id: item.id,
                      status: item.status,
                    });
                  }}>
                  Elevator ID: {item.id}
                </Text>
              </TouchableOpacity>
              // <Text
              //   style={styles.getStartedText}
              //   lightColor="rgba(0,0,0,0.8)"
              //   darkColor="rgba(255,255,255,0.8)">
              //   Elevator ID: {item.id}, Status: {item.status}
              // </Text>
            )}
          />
        )}
        {/* <Text
        style={styles.getStartedText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Eventual list of elevators to view
        </Text> */}
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
      {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "23%",
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonText:{
    fontSize: 20,
    color: '#fff',
    padding: 10,
    borderRadius: 5
  },
  button:{
    backgroundColor: "#59bbff",
    borderRadius: 10,
    padding: 5,
    width: "95%",
    alignItems: "center",
    margin: 5,
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
