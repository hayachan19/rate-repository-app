import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useDebounce } from 'use-debounce';
import { Button, Menu, Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const sortReducer = (value) => {
  switch (value) {
    case 'latest':
      return {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      };
    case 'highest':
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };
    case 'lowest':
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      };
    default:
      return null;
  }
};

const sortingTypes = {
  latest: 'Latest repositories',
  highest: 'Highest rated repositories',
  lowest: 'Lowest rated repositories',
};

const SortPicker = ({ currentSort, sortingHandler }) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{sortingTypes[currentSort]}</Button>}>
        <Menu.Item onPress={() => { sortingHandler('latest'); closeMenu(); }} title={sortingTypes.latest} />
        <Menu.Item onPress={() => { sortingHandler('highest'); closeMenu(); }} title={sortingTypes.highest} />
        <Menu.Item onPress={() => { sortingHandler('lowest'); closeMenu(); }} title={sortingTypes.lowest} />
      </Menu>
    </View>
  );
};

const SortFilterHeader = ({ currentSort, sortingHandler, currentFilter, filterHandler }) => {
  return (
    <View style={{ backgroundColor: 'white', marginBottom: 5 }}>
      <Searchbar placeholder='Search' value={currentFilter} onChangeText={(text) => filterHandler(text)} />
      <SortPicker currentSort={currentSort} sortingHandler={sortingHandler} />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (<SortFilterHeader currentSort={props.currentSort} sortingHandler={props.sortingHandler} currentFilter={props.currentFilter} filterHandler={props.filterHandler} />);
  }

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.history.push(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const history = useHistory();
  const [sorting, setSorting] = useState('latest');
  const [filter, setFiltering] = useState('');
  const [value] = useDebounce(filter, 1000);
  const { repositories, fetchMore } = useRepositories({ ...sortReducer(sorting), searchKeyword: value, first: 4 });
  const onEndReach = () => { fetchMore(); };
  return <RepositoryListContainer repositories={repositories}
    currentSort={sorting} sortingHandler={setSorting}
    currentFilter={filter} filterHandler={setFiltering}
    history={history} onEndReach={onEndReach} />;
};

export default RepositoryList;