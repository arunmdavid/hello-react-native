/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  TextInput,
  ListView,
  NavigatorIOS,
  View,
  Image
} from 'react-native';

class MyChild extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>
          MyChild
        </Text>
      </View>      
    )
  }
}

class MyComp extends Component {
  constructor(props) {
    super(props);
    console.log('Child: constructor');
     this.state = {
      baz : 1,
      isLoading: false,
      listing: [],
      user: '',
      email: 'email',
      password: 'password',
    }
  }
  componentWillMount() {
    console.log('Child: ComponentWillMount');
  }
  _handleResponse(data){
    this.setState({
      isLoading: false,
      listing: data
    });
  }
  
  componentDidMount() {
    console.log('Child: ComponentDidMount');
    this.setState({isLoading: true});
    /*fetch("https://api.github.com/users/arunmdavid/repos")
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => 
        this.setState({
        isLoading: false,
        message: 'Error ' + error
     }));*/
  }
  
  shouldComponentUpdate() {
    console.log('Child: ShouldComponentUpdate');
    return true;
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('Child: ComponentWillRecieveProps');
  }
  
  componentWillUpdate() {
    console.log('Child: ComponentWillUpdate');
  }
  
  componentDidUpdate() {
    console.log('Child: ComponentDidUpdate');
  }
  
  componentWillUnmount() {
    console.log('Child: componentWillUnmount');
  }
  static defaultProps = {
    bar : 2
  };
  update() {
    console.log('Updating State');
    this.setState({baz: 2});
  }
  viewBlog() {
    this.props.navigator.push({
      title: "List",
      component: SearchResults,
      passProps: {listings: this.state.listing}
    });
  }
  postData()  {
    fetch('http://localhost:3000/content-api/login.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user":{"email":this.state.email, "password":this.state.password}})
    })
    .then(response => response.json())
    .then(json => this._handlePostResponse(json))
    .catch(error => 
        this.setState({
        isLoading: false,
        message: 'Error ' + error
     }));
  }
  _handlePostResponse(data){
    console.log("<<P<<"+JSON.stringify(data));
    this.setState({
      isLoading: false,
      user: JSON.stringify(data)
    });
  }
  render() {
    console.log('Child: render');
    return (
      <ScrollView style={styles.child}>
        <Text style={styles.welcome}>
          Child Prop : {this.props.bar}{"\n"}
          Child State : {this.state.baz}
        </Text>
        <TouchableHighlight 
          style={styles.button} 
          underlayColor='#99d9f4'
          onPress={() => this.update()}
        >
          <Text style={styles.buttonText}>
            Update Child
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button} 
          underlayColor='#99d9f4'
          onPress={() => this.viewBlog()}
        >
          <Text style={styles.buttonText}>
            View Blog
          </Text>
        </TouchableHighlight>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TouchableHighlight 
          style={styles.button} 
          underlayColor='#99d9f4'
          onPress={() => this.postData()}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>
        <Text>
          {this.state.user}
        </Text>
        <MyChild/>
        <Text>
          {this.state.isLoading ? 'Loading...' : this.state.message}
        </Text>
      </ScrollView>
    )
  }
}

class MainComponent extends Component {

  render() {
    console.log('Parent: render');
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native{"\n"}
          Parent Prop: {this.props.bar}{"\n"}
          Parent State: {this.state.foo}{"\n"}
        </Text>
        <TouchableHighlight 
          style={styles.button} 
          underlayColor='#99d9f4'
          onPress={() => this.update()}
        >
          <Text style={styles.buttonText}>
            Update Parent
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
  
  update() {
    console.log('Updating State');
    this.setState({foo: 2});
    this.props.navigator.push({
      title: "Child",
      component: MyComp
    });
  }

  static defaultProps = {
    bar : 1
  };
  
  constructor(props) {
    super(props);
    console.log('Parent: constructor');
    this.state = {
      foo : 1
    };
  }
  
  componentWillMount() {
    console.log('Parent: ComponentWillMount');
  }
  
  componentDidMount() {
    console.log('Parent: ComponentDidMount');
  }
  
  shouldComponentUpdate() {
    console.log('Parent: ShouldComponentUpdate');
    return true;
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('Parent: ComponentWillRecieveProps');
  }
  
  componentWillUpdate() {
    console.log('Parent: ComponentWillUpdate');
  }
  
  componentDidUpdate() {
    console.log('Parent: ComponentDidUpdate');
  }
  
  componentWillUnmount() {
    console.log('Parent: componentWillUnmount');
  }

}

class AwesomeProject extends Component {

  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Demo App',
          component: MainComponent,
        }}/>
    );
  }
}

class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings),
      listings: []
    };
  }

  componentDidMount() {
    console.log('<<<fetch');
    //fetch("https://api.github.com/users/arunmdavid/repos")
    fetch("http://localhost:3000/blog.json")
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error => 
        this.setState({
        isLoading: false,
        message: 'Error ' + error
     }));
  }

  _handleResponse(data){
    this.setState({
      listings: data.posts
    });
  }

  rowPressed(repoId) {
    var repo = this.state.listings.filter(prop => prop.id === repoId)[0];
    this.props.navigator.push({
      title: "Repo",
      component: RepoView,
      passProps: {repo: repo}
    });
  }
 
  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight 
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'
      >
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: rowData.cover_image.url}} />
          <Text style={styles.name}>{rowData.title}</Text>
          <Text style={styles.desc}>{rowData.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }
 
  render() {
    console.log("=="+this.state.dataSource);
    console.log(">>"+this.state.listings);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    return (
      <ScrollView style={styles.result}>
      <ListView
        dataSource={dataSource.cloneWithRows(this.state.listings)}
        renderRow={this.renderRow.bind(this)}/>
      </ScrollView>
    );
  }
 
}

class RepoView extends Component {
 
  render() {
    var repo = this.props.repo;
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Image style={styles.image} source={{uri: repo.cover_image.url}} />
          <Text style={styles.name}>{repo.title}</Text>
          <Text style={styles.desc}>{repo.description}</Text>
          <View style={styles.separator}/>
        </View>
        <Text>{repo.language}</Text>
      </View>
    );
  }
}

// < Button onClick={this.update}>
const styles = StyleSheet.create({
  row: {
    padding: 20
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  name: {
    fontSize: 18
  },
  desc: {
    fontSize: 14
  },
  image: {
    width: 100,
    height: 100
  },
  result: {
    backgroundColor: '#EEEEEE'
  },
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  welcome: {
    alignItems: 'center',
    marginTop: 150,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
module.exports = MainComponent;

