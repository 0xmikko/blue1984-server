import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {LineChart} from 'react-native-chart-kit';
import {RootState} from '../../store';
import {GraphItem} from '../../containers/Stat/GraphItem';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';

interface Parameters {
  name: string,
  index: string
}

export const StatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [updater, setUpdater] = useState<NodeJS.Timeout>();

  useEffect(() => {
    dispatch(actions.stat.getList());
  }, []);

  const {data, status} = useSelector((state: RootState) => state.stat.List);

  const onStart = () => {
    dispatch(
      actions.profile.updateProfile({
        status: 'NEW',
      }),
    );
  };

  const parameters: Parameters[] = [
    {name: 'KeyValue get operation (Last 20)', index: 'keyValue'},
    {name: 'Create operation (Last 20)', index: 'create'},
    {name: 'Update operation (Last 20)', index: 'update'},
  ];

  if (data === undefined) return <Loading />;

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.main}>
          {parameters.map((e) => (
            <GraphItem name={e.name} data={data[e.index]} key={e.index} />
          ))}

          <View style={styles.button}>
            <Button
              onPress={onStart}
              title={'Reset all settings'}
              buttonStyle={styles.buttonS}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    paddingTop: 50,
  },
  button2: {
    width: '80%',
    paddingTop: 20,
  },

  buttonS: {
    borderRadius: 5,
    backgroundColor: '#82131d',
  },
  scrollContainer: {
    width: '100%',
    alignContent: 'center',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
