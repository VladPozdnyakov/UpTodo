import * as React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
};

const TodoCard = ({item, onPress, backgroundColor}: ItemProps) => (
  <Pressable onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={styles.title}>{item.title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 6,
  },
  title: {
    color: 'white',
    padding: 8,
  },
});

export default TodoCard;
