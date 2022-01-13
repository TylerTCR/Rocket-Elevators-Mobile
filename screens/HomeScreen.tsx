import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function HomeScreen() {
  const elevatorListEndpoint = "https://tyler-rocket-elevator.azurewebsites.net/elevator/inactive";
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getElevators = async () => {
    try {
      const response = await fetch(elevatorListEndpoint);
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
      <Text style={styles.title}>All Elevators</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Button
                title={`Elevator ID: ${item.id}`}
                onPress={() => {
                 
                }}>

              </Button>
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
      {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
