'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 250;
var CLOUD_X = 100;
var CLOUD_Y = 50;
var GAP = 10;
var GAP_DOUBLE = GAP * 2;
var GAP_COLUM = GAP * 5;
var FONT_GAP = 40;
var TEXT_HEIGHT = 20;
var TEXT_HEIGHT_DOUBLE = TEXT_HEIGHT * 2;
var TEXT_GAP = 275;
var COLUM_WIDTH = 40;
var COLUM_MAX = CLOUD_Y * 3;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getcolumnXPosition = function (value) {
  return COLUM_WIDTH * value + GAP_COLUM * value;
};

var getcolumnHeight = function (value, MaxElement) {
  return COLUM_MAX * times[value] / MaxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_DOUBLE, FONT_GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_DOUBLE, FONT_GAP + TEXT_HEIGHT_DOUBLE);

  var maxTime = getMaxElement(times);
  var columnHeight = getcolumnHeight(i, maxTime);

  // var columnHeight = getcolumnHeight(i, getMaxElement(times) );

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'gray';
    ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + getcolumnXPosition(i), TEXT_GAP);
    var randomOpacity = Math.random();
    ctx.fillStyle = 'rgba(3, 37, 144,' + randomOpacity + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    }
    // var columnHeight = COLUM_MAX * times[i] / maxTime;
    var columntYPosition = TEXT_GAP - columnHeight - GAP;
    // var columnXPosition = COLUM_WIDTH * i + GAP_COLUM * i;
    ctx.fillRect(CLOUD_X + FONT_GAP + getcolumnXPosition(i), columntYPosition, COLUM_WIDTH, columnHeight);
    // Отображаем статистику
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), (CLOUD_X + FONT_GAP) + getcolumnXPosition(i), columntYPosition - GAP_DOUBLE, COLUM_WIDTH, columnHeight);
  }
};
