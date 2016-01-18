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
  title: 'Lift!',
  // icon: 'images/menu_icon.png',
  subtitle: 'by EdTheDev',
  body: 'Press Up to record a set, down to start cooldown timer.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});
main.show();

main.on('click', 'up', function(e) {
  sets += 1;
  displaySets();
});

function displaySets() {
  main.body("Sets completed " + sets);
}

main.on('click', 'select', function(e) {
  displaySets();
});

main.on('click', 'down', function(e) {
  main.body("90 second cool down started.");
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