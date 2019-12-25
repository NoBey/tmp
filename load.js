document.querySelector('#btn').addEventListener('click', function() {
  let mask = document.querySelector('.mask')
  console.log('mask:' + mask);
  mask.classList.add('hide')
  let bgm = document.querySelector('#bgm')
  bgm.load()
  bgm.play()

  let code = `
  /* 圣诞到了！*/
  /* 看看我为你做的圣诞老人吧！*/
  p {
    color: #f8e7dc;
    font-family: 'Mountains of Christmas';
    position: fixed;
    z-index: 999;
    font-size: 22px;
    margin-top: 30px;
  }

  .santa-claus-preview {
    position: relative;
    color: #d9604b;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-shadow: 0px 3px 10px #ccc;
  }

  .santa {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: -195px;
  }

  .hat {
    display: inline-block;
    position: relative;
    text-align: center;
    vertical-align: center;
  }

  /*先画出圣诞老人的帽子*/
  .hat-top-half-pt {
    position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: 120px;
    height: 60px;
    background: #d9604b;
    border-top: 5px solid #964034;
    border-left: 5px solid #964034;
    border-right: 5px solid #964034;
    border-top-left-radius: 80px;
    border-bottom-right-radius: 15px;
  }

  .hat-top-half-pt::before {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 5px solid #964034;
    background: #ffffff;
    position: absolute;
    right: -20px;
    top: -20px;
  }

  .hat-bottom-half-pt {
    width: 140px;
    height: 30px;
    border-radius: 10px;
    border: 5px solid #964034;
    background: #ffffff;
    position: relative;
    margin-top: -5px;
  }

  /*然后是他的脸庞*/
  .head {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 60px;
    background: #ffeeda;
    border: 5px solid #964034;
  }

  .head .eyes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80px;
    margin: 20px auto 0 auto;
  }

  .head .eyes .eye {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #964034;
  }

  .head::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #964034;
    position: absolute;
    left: -28px;
    top: 5px;
    background: #ffeeda;
  }

  .head::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #964034;
    position: absolute;
    right: -28px;
    top: 5px;
    background: #ffeeda;
  }

  .head .nose {
    width: 20px;
    height: 20px;
    background: #d9604b;
    border: 5px solid #964034;
    border-radius: 10px;
    display: inline-block;
    margin-top: 3px;
  }

  .head .nose .mouth {
    display: flex;
    justify-content: center;
    width: 40px;
    margin-top: 10px;
    margin-left: -15px;
    z-index: 5;
    position: relative;
  }

  .head .nose .mouth .lf-mouth {
    height: 20px;
    width: 15px;
    border-right: 5px solid #964034;
    border-bottom: 5px solid #964034;
    border-bottom-right-radius: 20px;
  }

  .head .nose .mouth .rt-mouth {
    height: 20px;
    width: 15px;
    border-left: 5px solid #964034;
    border-bottom: 5px solid #964034;
    border-bottom-left-radius: 20px;
  }

  /*最重要的是胡子！*/
  .beard {
    width: 140px;
    height: auto;
    margin-top: -2px;
  }

  .beard .beard-1 {
    height: 35px;
    position: relative;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #ffffff;
    border: 4px solid #964034;
    z-index: 4;
  }

  .beard .beard-1::after {
    content: '';
    width: 98px;
    position: absolute;
    bottom: -7px;
    height: 10px;
    background: #ffffff;
    left: 17px;
    z-index: 6;
  }

  .beard .beard-2 {
    height: 35px;
    width: 110px;
    position: relative;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #ffffff;
    border: 4px solid #964034;
    margin-left: 15px;
    margin-top: -7px;
    z-index: 3;
  }

  .beard .beard-2::after {
    content: '';
    width: 56px;
    position: absolute;
    bottom: -6px;
    height: 10px;
    background: #ffffff;
    left: 22px;
    z-index: 6;
  }

  .beard .beard-3 {
    height: 35px;
    width: 70px;
    position: relative;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #ffffff;
    border: 4px solid #964034;
    margin-left: 35px;
    margin-top: -7px;
    z-index: 2;
  }

  .beard .beard-3::after {
    content: '';
    width: 22px;
    position: absolute;
    bottom: -6px;
    height: 10px;
    background: #ffffff;
    left: 20px;
    z-index: 6;
  }

  .beard .beard-4 {
    height: 25px;
    width: 32px;
    position: relative;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #ffffff;
    border: 4px solid #964034;
    margin-left: 54px;
    margin-top: -5px;
    z-index: 1;
  }

  /*穿上衣服吧！*/
  .dressing {
    background: #d9604b;
    width: 140px;
    height: 140px;
    margin-top: -85px;
    position: relative;
  }

  .dressing .lf-arm {
    position: absolute;
    height: 140px;
    width: 50px;
    background: #d9604b;
    border-left: 4px solid #964034;
    transform: rotate(12deg);
    left: -15px;
  }

  .dressing .rt-arm {
    position: absolute;
    height: 140px;
    width: 50px;
    background: #d9604b;
    border-right: 4px solid #964034;
    transform: rotate(-12deg);
    right: -15px;
  }

  .dressing .line {
    height: 60px;
    position: absolute;
    bottom: 0;
  }

  .dressing .lf-line {
    border-left: 4px solid #964034;
    transform: rotate(-12deg);
    left: 20px;
  }

  .dressing .rt-line {
    border-right: 4px solid #964034;
    transform: rotate(12deg);
    right: 20px;
  }

  /*点亮小星星*/
  .star, p {
    position: absolute;
    transform: scale(2);
    animation: blink ease 1s infinite alternate;
  }

  .star.star1 {
    left: calc(50% - 100px);
    top: calc(50% - 140px);
  }

  .star.star2 {
    left: calc(50% - 130px);
    top: calc(50% + 80px);
  }

  .star.star3 {
    left: calc(50% - 140px);
    top: calc(50% - 30px);
  }

  .star.star4 {
    right: calc(50% - 130px);
    top: calc(50% + 80px);
  }

  .star.star5 {
    right: calc(50% - 140px);
    top: calc(50% - 30px);
  }

  .star.star6 {
    right: calc(50% - 100px);
    top: calc(50% - 140px);
  }

  .slogan,
  .star {
    z-index: 123124;
    visibility: visible !important;
  }
  /* 这样的圣诞老人你喜欢么XD */
  `

  let timeout = 8
  let n = 0;

  function ele(selector) {
    return document.querySelector(selector);
  }

  function writeCode(result, timeout) {
    return setInterval(() => {
      n += 1;
      ele('#code').innerHTML = Prism.highlight(result.substring(0, n), Prism.languages.css, 'css');
      ele('#styleTag').innerHTML = result.substring(0, n);
      ele('.code-preview').scrollTop = ele('#code').scrollHeight;
      if (n >= result.length) {
        window.clearInterval(timerId);
      }
    }, timeout)
  }

  let timerId = writeCode(code, timeout);
})