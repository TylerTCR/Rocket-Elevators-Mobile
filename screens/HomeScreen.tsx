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
      <View style={styles.listContainer}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.button}>
                <Button
                  title={`Elevator ID: ${item.id}`}
                  color="white"
                  onPress={() => {
                    // Go to details page, passing the specific id and status along with it
                    navigation.navigate("Details", {
                      id: item.id,
                      status: item.status,
                    });
                  }}>
                </Button>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <TouchableOpacity 
        style={styles.logOutButton}
        onPress={() => {
          navigation.navigate("Root")
        }}>
        <Text style={styles.getStartedText}>Log Out</Text>
        {/* <Button
          title="Log Out"
          color="#ffffff"
          onPress={() => {
            navigation.navigate("Root")
          }}>
        </Button> */}
      </TouchableOpacity>
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
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10,
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
    color: "#ffffff"
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
