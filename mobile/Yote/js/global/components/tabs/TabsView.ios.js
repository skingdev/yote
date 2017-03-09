
// import react things
import React, { PropTypes } from 'react';
import Base from '../BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import StatusBar from 'StatusBar';
import TabBarIOS from 'TabBarIOS';
// import TabBarIOS.Item from 'TabBarIOS.Item';
import Navigator from 'Navigator';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';

// import components

import Profile from '../../../modules/user/components/Profile';
//import ProductTemplateLibrary from '../../../modules/productTemplate/components/Library';
import Home from './Home';
import Product from '../../../modules/product/components/Product'; 
import Feed from '../../../modules/post/components/Feed'; 
// import actions


// import styles
import YTColors from '../../styles/YTColors';
var styles = StyleSheet.create({
  container: {
    flex: 1
    , flexDirection: 'column'
    , alignSelf: 'stretch'
    , justifyContent: 'center'
    , backgroundColor: '#ffffff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  newButton: {


  },
  newText: {
    color: 'green',
  }
});



class TabsView extends Base {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
    this._bind('_openNew');
  }

  componentDidMount() {
    StatusBar && StatusBar.setBarStyle('dark-content');
  }

  _openNew() {
    //this.props.navigator.push({newShowing: true});
  }

  _onTabSelect(tab: Tab) {
    console.log("tab selected");
    this.setState({selectedTab: tab});
  }

  render() {
    // console.log("TabsView rendering ");
    // console.log(this.props);
    return (
      <TabBarIOS
        tintColor={YTColors.darkText}
      >

        <TabBarIOS.Item
          title="Home"
          selected={this.state.selectedTab === 'home'}
          onPress={this._onTabSelect.bind(this, 'home')}
          icon={require('./img/house.png')}
          selectedIcon={require('./img/house_filled.png')}
        >
          <Home
            navigator={this.props.navigator}
          />

        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Products"
          selected={this.state.selectedTab === 'products'}
          onPress={this._onTabSelect.bind(this, 'products')}
          icon={require('./img/shoppingBag.png')}
          selectedIcon={require('./img/shoppingBag_filled.png')}
        >
          <Product
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'posts'}
          onPress={this._onTabSelect.bind(this, 'posts')}
          icon={require('./img/feed.png')}
          selectedIcon={require('./img/feed_filled.png')}
        >
          <Feed
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  }

}

TabsView.propTypes = {
  dispatch: PropTypes.func
  // tab: PropTypes.string
}
//
// TabsView.defaultProps = {
//   tab: 'showings'
// }

const mapStoreToProps = (store) => {
  return {

  }
}

export default connect(
  mapStoreToProps
)(TabsView);