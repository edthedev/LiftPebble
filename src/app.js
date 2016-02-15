/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
// var Vector2 = require('vector2');
var Wakeup = require('wakeup');
var Vibe = require('ui/vibe');
var sets = 0;
var coolDown = 90;

var main = new UI.Card({
  title: 'Lift!',
  // icon: 'images/menu_icon.png',
  subtitle: 'by EdTheDev',
  body: 'Press Up to record a set, down to start cooldown timer.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});
main.show();

main.on('click', 'up', function(e) {
  console.log('Main click up!');
  sets += 1;
  displaySets();
});

function displaySets() {
  main.subtitle("Completed: " + sets);
}

main.on('click', 'select', function(e) {
  console.log('Main click!');
  if(coolDown == 90) {
    coolDown = 60;
  } else {
    coolDown = 90;
  }
  main.body('Cool down is ' + coolDown + ' seconds.');
  console.log('Cool down is ' + coolDown + ' seconds.');
});

main.on('click', 'down', function(e) {
  main.body(coolDown + " second cool down started.");
  Wakeup.schedule(
  {
    // Set the wakeup event for one minute from now
    time: Date.now() / 1000 + 90,
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
  main.body("Time for next set.");
});