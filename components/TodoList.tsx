import * as React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import TodoCard from './TodoCard';
import {fetchTodos} from '../services/api';

type ItemData = {
  id: string;
  title: string;
};

const TodoList = () => {
  let [response, setResponse] = useState<ItemData[]>([]);

  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    fetchTodos()
      .then((result: ItemData[]) => {
        setResponse(result);
      })
      .catch(() => Alert.alert('Error', 'Failed to load todos'));
  }, []);

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#5e0acc';
    return (
      <TodoCard
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: 'black',
  },
  button: {
    marginTop: 20,
    marginRight: 44,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: '#black ',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoList;
