var React = require('react-native');
var {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = React;

var StopWatch = React.createClass({
  getInitialState: function(){
    return {
      timeElapsed: null
    }
  },
  render: function(){ //
    return <View style={styles.container}>

    <View style={[styles.header, this.border('yellow')]}>{/* Yellow */}
      <View style={[styles.timerWrapper, this.border('red')]}>{/* Red */}
          <Text>
          00:00:00
          </Text>
        </View>
        <View style={[styles.buttonWrapper, this.border('green')]}>{/* Green */}
         {this.startStopButton()}
         {this.lapButton()}
      </View>
    </View>

    <View style={[styles.footer, this.border('blue')]}>{/* Blue */}
      <Text>
        I am a list of laps...
      </Text>
    </View>

  </View>
  },
    startStopButton:function(){
      return <TouchableHighlight
       underlayColor="lightgreen"
       onPress={this.handleStartPress}>
        <Text>Start</Text>
      </TouchableHighlight>
    },
    lapButton: function(){
      return <TouchableHighlight
      underlayColor="blue"
      onPress={this.handleLapPress}>
        <Text>Lap</Text>
      </TouchableHighlight>
    },
    handleStartPress: function(){
      var startTime = new Date();

      () => {
        this.setState({
          timeElapsed: new Date() - startTime
        });
      }
    },

    handleLapPress: function(){
      console.log("Lap was pressed");
    },

    border: function(color){
      return {
        borderColor: color,
        borderWidth: 4
      }
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, //Fill entire screen
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: { //Red
    flex: 5, //takes 5/8ths of space available
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: { //Green
    flex: 3, //takes 3/8ths of space available
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);