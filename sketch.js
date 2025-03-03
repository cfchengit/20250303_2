let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput(); // 產生一個文字框  
  input.position(10, 10); // 把文字框放在座標為(10, 10)的位置
  input.size(300, 50); // 設置文字框的大小(設定寬與高)
  input.value('淡江大學'); // 設置文字框的預設文字
  input.style('font-size', '50px'); // 設置文字框的字體大小
  
  slider = createSlider(20, 50, 32); // 產生一個滑桿，範圍從28到50，預設值為32
  slider.position(input.x + input.width + 150, 35); // 把滑桿放在文字框的右側
  
  button = createButton('跳動文字'); // 產生一個按鈕
  button.position(slider.x + slider.width + 20, 15); // 把按鈕放在滑桿的右側
  button.mousePressed(toggleBounce); // 設置按鈕的點擊事件
  button.size(200, 50); // 設置按鈕的大小(設定寬與高)
  button.style('font-size', '35px'); // 設置按鈕的字體大小
  
  dropdown = createSelect(); // 產生一個下拉式選單
  dropdown.position(button.x + button.width + 20, 15); // 把下拉式選單放在按鈕的右側
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('第三周');
  dropdown.style('font-size', '30px'); // 設置下拉式選單的字體大小
  dropdown.size(200, 50); // 設置下拉式選單的大小(設定寬與高)
  dropdown.changed(handleDropdownChange); // 設置下拉式選單的變更事件

  iframe = createElement('iframe'); // 產生一個 iframe 元素
  iframe.position(100, 100); // 設置 iframe 的位置
  iframe.size(windowWidth - 200, windowHeight - 200); // 設置 iframe 的大小
  iframe.hide(); // 初始時隱藏 iframe
}

function draw() {
  background(0); // 背景顏色為黑色
  fill(255); // 文字顏色為白色
  textSize(32); // 設置文字大小
  text('文字大小', input.x + input.width + 80, 45); // 顯示文字「文字大小」在文字框的右側
  let txt = input.value().split('').join(' ');
  textAlign(CENTER, CENTER);
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  let txtWidth = textWidth(txt);
  let y = 100; // 從 y 座標 100 開始顯示
  let lineHeight = textAscent() + textDescent() + 10; // 設置行高

  if (txtWidth > 0) {
    let repeatedTxt = '';
    while (textWidth(repeatedTxt) < width) {
      repeatedTxt += txt + ' ';
    }
    for (let i = y; i < height; i += lineHeight) {
      let displayY = i;
      if (isBouncing) {
        displayY += offsets[i % offsets.length];
      }
      text(repeatedTxt, width / 2, displayY);
    }
  }

  if (isBouncing) {
    updateOffsets();
  }
}

function toggleBounce() {
  isBouncing = !isBouncing;
  if (isBouncing) {
    offsets = Array.from({ length: Math.ceil(height / (textAscent() + textDescent() + 10)) }, () => Math.random() * 20 - 10);
  }
}

function updateOffsets() {
  for (let i = 0; i < offsets.length; i++) {
    offsets[i] = Math.random() * 20 - 10;
  }
}

function handleDropdownChange() {
  let selected = dropdown.value();
  iframe.show(); // 顯示 iframe
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw'); // 設置 iframe 的 src 屬性
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 設置 iframe 的 src 屬性
  } else if (selected === '第三周') {
    iframe.attribute('src', 'https://hackmd.io/@cfchen/H15O7KGske'); // 設置 iframe 的 src 屬性
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 200, windowHeight - 200); // 調整 iframe 的大小
}
