// // 创建一个Promise实例
// let p =new Promise((resolve,reject)=>{
// //   一顿异步通信操作之后，返回成功或失败
// // 然后判断成功或失败去执行resolve或reject
//     if (false) {
    
//     }else{
//         // console.log('异步通信执行失败！');
//         reject('执行失败');
//     }
// })

function p(flag) {
    return new Promise((resolve, reject) => {
        if (flag=== 1) {
            return resolve("ok")
        }
        return reject("error")
    })
}

// // then方法可执行resolve的回调函数
// // catch方法可执行 reject的回调函数
// p(2).then((value)=>{
//     console.log(value);
// }).catch((reason)=>{
//     console.error(reason);
//     return new Promise((resolve, reject) => {})
// }).then(o => console.log("111"))

await p(2)