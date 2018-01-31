'use strict';

var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 250;
var CLOUD_X = 100;
var CLOUD_Y = 50;
var GAP = 10;
var GAP_COLUM = GAP * 5;
var FONT_GAP = 40;
var TEXT_HEIGHT = 20;
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, FONT_GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, FONT_GAP + TEXT_HEIGHT * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'gray';
    ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + (COLUM_WIDTH * i + GAP_COLUM * i), TEXT_GAP);
    var randomOpacity = Math.random();
    ctx.fillStyle = 'rgba(3, 37, 144,' + randomOpacity + ')';


    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    }

    var columnHeight = COLUM_MAX * times[i] / maxTime;
    var columntYPosition = TEXT_GAP - columnHeight - GAP;
    var columnXPosition = COLUM_WIDTH * i + GAP_COLUM * i;

    ctx.fillRect(CLOUD_X + FONT_GAP + columnXPosition, columntYPosition, COLUM_WIDTH, columnHeight);

    // Отображаем статистику
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), (CLOUD_X + FONT_GAP) + (COLUM_WIDTH * i + GAP_COLUM * i), 100);
  }
};
