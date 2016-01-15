/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Wakeup = require('wakeup');
var Vibe = require('ui/vibe');
var sets = 0;

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});
main.show();

main.on('click', 'up', function(e) {
  sets += 1;
  displaySets();
});

function displaySets() {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Sets completed: ' + sets,
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
}

main.on('click', 'select', function(e) {
  displaySets();
});

main.on('click', 'down', function(e) {
  var wind = new UI.Card({
    title: 'Lift',
    subtitle: 'Cool down',
    body: 'Cool down started.'
  });
  wind.show();
  
  Wakeup.schedule(
  {
    // Set the wakeup event for one minute from now
    time: Date.now() / 1000 + 60,
    // Pass data for the app on launch
    data: { hello: 'world' }
  },
  function(e) {
    if (e.failed) {
      // Log the error reason
      console.log('Wakeup set failed: ' + e.error);
    } else {
      console.log('Wakeup set! Event ID: ' + e.id);
    }
  }
);
});

// Single wakeup event handler example:
Wakeup.on('wakeup', function(e) {
  Vibe.vibrate('long');
  console.log('Wakeup event! ' + JSON.stringify(e));
  var wind = new UI.Card({
    title: 'Lift',
    subtitle: 'Cool down',
    body: 'Time for next set.'
  });
  wind.show();
  
  
});