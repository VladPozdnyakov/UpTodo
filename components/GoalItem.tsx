import React from 'react';
import {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native';
import EditTask from './EditTask';

interface propsType {
  onEditItem: Function;
  onDeleteItem: Function;
  id: string;
  text: string;
  header: string;
}

function GoalItem(props: propsType) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  function showModal() {
    setIsVisibleModal(true);
  }

  function hideModal() {
    setIsVisibleModal(false);
  }

  return (
    <View>
      <Text style={styles.header}>{props.header}</Text>
      <View style={styles.goalContainer}>
        <View style={styles.goalItem}>
          <Pressable>
            <Text style={styles.goalText}>{props.text}</Text>
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Pressable
            android_ripple={{color: '#dddddd'}} // for Android
            onPress={props.onDeleteItem.bind(this, props.id)}
            style={({pressed}) => pressed && styles.pressedItem}>
            <Image
              source={require('../images/delete.png')}
              style={styles.image}
            />
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Pressable onPress={showModal}>
            <Image
              source={require('../images/edit.png')}
              style={styles.image}
            />
          </Pressable>
          <EditTask
            visible={isVisibleModal}
            hideModal={hideModal}
            onEditItem={props.onEditItem}
            id={props.id}
            text={props.text}
            header={props.header}
          />
        </View>
      </View>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  goalItem: {
    flex: 6,
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    flexDirection: 'row',
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 25,
    height: 25,
    margin: 10,
    borderRadius: 6,
  },
  header: {
    color: 'white',
    margin: 10,
  },
});
