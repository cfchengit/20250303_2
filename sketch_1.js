let input;
let textToDisplay = '❤️😍💕';
let slider; // 滑桿
let button; // 按鈕
let jiggle = false; // 跳動狀態
let yOffset = 0; // 垂直偏移量
let select; // 下拉式選單
let iframe; // iframe 元素
let radio; // 選鈕
let effect = 'normal'; // 效果

function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput('');
  input.position(20, 20);
  input.size(200, 50); // 設定文字輸入框的寬度和高度
  input.style('font-size', '50px');
  input.input(updateText);

  textAlign(CENTER, CENTER);

  // 建立滑桿
  slider = createSlider(15, 80, 50); // 最小值，最大值，預設值
  slider.size(200, 50); // 設定文字輸入框的寬度和高度
  slider.style('font-size', '50px');
  slider.position(230, 30); // 設定滑桿位置

  // 建立按鈕
  button = createButton('跳動');  
  button.style('font-size', '50px');
  button.position(500, 20); // 設定按鈕位置在文字框右邊
  button.mousePressed(toggleJiggle); // 設定按鈕點擊事件
  
    // 建立下拉式選單
  select = createSelect();
  select.position(650, 20); // 設定選單位置在跳動按鈕右邊
  select.style('font-size', '30px');
  select.option('淡江大學');
  select.option('教育科技學系');
  select.option('week2');
  select.changed(changeWebsite);
  
  // 建立選鈕
  radio = createRadio();
  radio.style('font-size', '30px');
  radio.size(400, 50);
  radio.option('normal', '一般性');
  radio.option('rotate', '旋轉');
  radio.option('size', '大小');
  radio.position(950, 20); // 設定選鈕位置在下拉式選單右邊
  radio.changed(changeEffect);
  
  // 取得 iframe 元素
  iframe = document.querySelector('#myDiv iframe');
}

function draw() {
  background(220);

  let fontSize = slider.value(); // 獲取滑桿的值
  textSize(fontSize); // 設定文字大小
  textStyle(BOLD)
  fill(0);

  let y = 150; // 起始 y 座標
  let rowSpacing = 80; // 排間間隔
  let rowCount = 0; // 排數計數器

  while (y < height) {
    let x = 0;
    let spacing = textWidth(textToDisplay); // 文字間距
    

    while (x < width) {
      let yOffset = 0; // 垂直偏移量
      if (jiggle) {
        yOffset = map(sin(frameCount * 0.1 * (rowCount + 1) + x * 0.05), -1, 1, -10, 10); // 計算垂直偏移量，每排和每列使用不同的倍數
      }
      
      push(); // 儲存目前的繪圖狀態
      
      switch (effect) {
        case 'normal':
          // 一般性：文字不做任何改變
          break;
        case 'rotate':
          // 旋轉：文字以左邊為基準，做 -90 度轉到 90 度
          translate(x, y + yOffset);
          rotate(map(sin(frameCount * 0.05 + rowCount * 0.2), -1, 1, -HALF_PI, HALF_PI));
          translate(-x, -(y + yOffset));
          break;
        case 'size':
          // 大小：文字從現有的文字大小變大 30%，然後又恢復原本大小
          let sizeFactor = map(sin(frameCount * 0.1 + rowCount * 0.3), -1, 1, 1, 1.3);
          textSize(fontSize * sizeFactor);
          break;
      }
      
      text(textToDisplay, x, y + yOffset); // 加上垂直偏移量
      
      pop(); // 恢復之前的繪圖狀態
      textSize(fontSize); // 恢復文字大小
      x += spacing + 20; // 調整文字間距
    }

    y += rowSpacing; // 增加 y 座標，換下一排
    rowCount++; // 增加排數計數器
  }
}

function updateText() {
  textToDisplay = input.value();
}

function toggleJiggle() {
  jiggle = !jiggle; // 切換跳動狀態
}

function changeWebsite() {
  let selectedWebsite = '';
  let selectedWebsite_str = select.value();  
  switch(selectedWebsite_str) {
    case '淡江大學':
      selectedWebsite = 'https://www.tku.edu.tw';
      break;
    case '教育科技學系':
      selectedWebsite = 'https://www.et.tku.edu.tw';
      break;
    case 'week2':
      selectedWebsite = 'https://cfchengit.github.io/20250225/';
      break;
    default:
      selectedWebsite = 'https://www.google.com';
  }
  
  
  iframe.src = selectedWebsite;
}

function changeEffect() {
  effect = radio.value();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}