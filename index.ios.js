var formatTime = require('minutes-seconds-milliseconds');
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
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function(){ //
    return <View style={styles.container}>

    <View style={[styles.header]}>{/* Yellow */}
      <View style={[styles.timerWrapper]}>{/* Red */}
          <Text style={styles.timer}>
          {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>{/* Green */}
         {this.startStopButton()}
         {this.lapButton()}
      </View>
    </View>

    <View style={[styles.footer]}>{/* Blue */}
      {this.laps()}
    </View>

  </View>
  },

  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },

    startStopButton:function(){
      var style = this.state.running ? styles.stopButton : styles.startButton;
      return <TouchableHighlight style={[styles.button, style]}
       underlayColor="lightgreen"
       onPress={this.handleStartPress}>
        <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    },

    lapButton: function(){
      return <TouchableHighlight style={[styles.button, styles.lapButton]}
      underlayColor="blue"
      onPress={this.handleLapPress}>
        <Text>Lap</Text>
      </TouchableHighlight>
    },

    handleStartPress: function(){
      if(this.state.running){
        clearInterval(this.interval);
        this.setState({running:false});
        return
    }

      this.setState({startTime: new Date()});

      this.interval = setInterval(() => {
        this.setState({
          timeElapsed: new Date() - this.state.startTime,
          running: true
        });
      }, 30);
    },

    handleLapPress: function(){
      var lap = this.state.timeElapsed;

      this.setState({
        startTime: new Date(),
        laps: this.state.laps.concat([lap])
      });

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
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: 'lightgreen'
  },
  lapButton: {
    borderColor: 'blue'
  },
  stopButton: {
    borderColor: 'red'
  },
  lap : {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);