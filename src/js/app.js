/**
 * Lift! by EdTheDev
 * Copyright (c) 2016 Edward Delaporte
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var UI = require('ui');
var Wakeup = require('wakeup');
var Vibe = require('ui/vibe');
var sets = 0;
var coolDown = 90;

var main = new UI.Card({
  title: 'Lift!',
  subtitle: 'by EdTheDev',
  body: 'Press Up to record a set, down to start cooldown timer.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});
main.show();

function displaySets() {
  main.subtitle("Completed: " + sets);
}

main.on('click', 'up', function(e) {
  sets += 1;
  displaySets();
});

main.on('click', 'select', function(e) {
  if(coolDown == 90) {
    coolDown = 180;
  } else {
    coolDown = 90;
  }
  main.body('Cool down is ' + coolDown + ' seconds.');
});

main.on('click', 'down', function(e) {
  main.body(coolDown + " second cool down started.");
  Wakeup.schedule(
  {
    // Set the wakeup event for one minute from now
    time: Date.now() / 1000 + coolDown,
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