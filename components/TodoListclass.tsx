import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TodoCard from './TodoCard';

type ItemData = {
  id: string;
  title: string;
};

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      error: '',
      selectedId: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(result => {
        this.setState({response: result});
      })
      .catch(error => {
        this.setState({error: error});
      });
  }

  renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor =
      item.id === this.state.selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <TodoCard
        item={item}
        onPress={() => this.setState({selectedId: item.id})}
        backgroundColor={backgroundColor}
      />
    );
  };

  render() {
    const {response, selectedId} = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FF4500', '#DB7093', '#FF1493']}
          style={styles.linearGradient}>
          <FlatList
            data={response}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
          />
        </LinearGradient>
      </View>
    );
  }
}
