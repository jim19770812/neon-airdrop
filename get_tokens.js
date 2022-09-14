/**
* 定时点击GET TOKENS按钮领水
  执行后，要首先在界面上人工点击一次GET_TOKENS按钮才可以
*/
setInterval(() => {
    let btn=document.querySelector('.button.button--primary.tg-form__btn')
    btn.focus()
    btn.click()
    console.log('模拟点击完成')
}, 1000*215);
