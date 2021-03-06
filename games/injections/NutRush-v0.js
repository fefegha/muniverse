(function() {

  var MENU_TIMEOUT = 60000;

  var gameOver = false;

  window.muniverse = {
    init: function(options) {
      return pollAndWait(MENU_TIMEOUT, function() {
        return window.gameState === 'start';
      }).then(function() {
        document.body.style.overflow = 'hidden';

        window.faketime.pause();

        window.initGameEndFail = () => gameOver = true;
        window.initLevelComplete = () => gameOver = true;
        window.toggleManualPause = () => false;
        window.level = options.level;

        butEventHandler('startGame', null);

        // Skip the pre-game tutorial.
        if (window.level === 1) {
          window.faketime.advance(1000);
          butEventHandler('continue', null);
        }

        // Re-render the screen.
        window.faketime.advance(100);
      });
    },
    step: function(millis) {
      window.faketime.advance(millis);
      return Promise.resolve(gameOver);
    },
    score: function() {
      return Promise.resolve(100 * (acornScore || 0) + (levelScore || 0));
    }
  };

})();
