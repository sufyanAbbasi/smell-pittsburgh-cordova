

// Internet


function isConnected() {
  var result = false;

  if (navigator.connection.type != Connection.NONE) {
    result = true;
  }

  return result;
}


// Spinner


function showSpinner(text) {
  SpinnerPlugin.activityStart(text, {dimBackground: true});
}


function hideSpinner() {
  SpinnerPlugin.activityStop(null, null);
}


// Firebase helpers


function initializeFCM() {
  console.log("onInitializeFCM");
  FCMPlugin.getToken(
    // success
    function (token) {
      // empty for now
      console.log("Your firebaseInstanceID is "+token);
    },
    // error
    function (error) {
      // empty for now
    }
  );
  FCMPlugin.onNotification(
    // callback
    function (data) {
      console.log("FCMPlugin.onNotification callback:data="+JSON.stringify(data));
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user. 
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
      }
    },
    // success
    function (message) {
      console.log("FCMPlugin.onNotification success:message="+message);
    },
    // error
    function (error) {
      console.log("FCMPlugin.onNotification error:error="+error);
    }
  );
}


// App-wide Callbacks


// when keyboard appears, we want to scroll the focused textfield into view
function onKeyboardShowInHomePage(keyboardHeight) {
  App.htmlElementToScrollAfterKeyboard.scrollIntoView();
}

function onKeyboardHide(e) {
  console.log("keyboard CLOSE");
  $(App.htmlElementToBlurAfterKeyboardCloses).blur();
}


/*
 * Okay, rant time.
 * Due to delay issues with handling clicks in iOS, the FastClick library was
 * included in the project and attached to HTML onLoad. However, this inotrudced
 * a new problem within iOS: clicks on checkboxradio widgets would first have to
 * focus the widget, then the desired click action would fire after a second
 * click. Luckily, FastClick implements the "needsclick" class, which tells
 * FastClick to revert to the default clicking action.
 *
 * Sigh... thanks for listening.
 */
function disableUnwantedFastClickElements() {
  // Home
  $(".radio-smell").addClass("needsclick");
  // Settings
  $("#checkbox_smell_notifications").addClass("needsclick");
  $(".checkbox-smell-subscribe").addClass("needsclick");
}
