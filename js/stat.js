 'use strict';

var WHITE_COLOR = '#fff';
var BLACK_COLOR = '#000';

// clouds
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var SHADOW_COLOR = 'rgba(0, 0 , 0, 0.7)';

// results: text
var HEADER_MESSAGE = 'Ура вы победили!\nСписок результатов:';
var TEXT_HEIGHT = 16;
var CLOUD_FONT = '16px PT Mono';

// results: bar
var BAR_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var YOUR_COLOR = 'rgba(255, 0, 0, 1)';
var CURRENT_PLAYER_STRING = 'Вы';

var getPreparedTimes = function (times) {
  return times.map(function (time) {
    return Math.round(time);
  });
};

var getRandomBluishColor = function () {
  return 'rgba(0, 0, 255, ' + Math.random() + ')';
};

var getMaxTime = function (arr) {
  var maxTime = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxTime) {
      maxTime = arr[i];
    }
  }

  return maxTime;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = BLACK_COLOR;
  ctx.font = CLOUD_FONT;
  ctx.fillText(text, x, y);
};

var renderHeaderMessage = function (ctx, string) {
  var textArr = string.split('\n');

  textArr.forEach(function (substring, i) {
    renderText(ctx, substring, CLOUD_X + TEXT_HEIGHT, CLOUD_Y + TEXT_HEIGHT * (i + 1) + TEXT_HEIGHT);
  });
};

var renderResultsBar = function (ctx, names, times) {
  var roundedTimes = getPreparedTimes(times);
  var maxTime = getMaxTime(roundedTimes);

  for (var i = 0, n = roundedTimes.length; i < n; i++) {
    renderText(ctx, roundedTimes[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT - (BAR_HEIGHT * roundedTimes[i]) / maxTime);

    renderText(ctx, names[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, CLOUD_HEIGHT - GAP);

    if (names[i] === CURRENT_PLAYER_STRING) {
      ctx.fillStyle = YOUR_COLOR;
    } else {
      ctx.fillStyle = getRandomBluishColor();
    }
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * (i), CLOUD_HEIGHT - (TEXT_HEIGHT + GAP) - (BAR_HEIGHT * roundedTimes[i]) / maxTime, COLUMN_WIDTH, (BAR_HEIGHT * roundedTimes[i]) / maxTime);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);

  renderHeaderMessage(ctx, HEADER_MESSAGE);

  renderResultsBar(ctx, names, times);
};
