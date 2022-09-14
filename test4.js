// function timeout(ms) {
//     return new Promise((resolve) => {
//         console.log("before setTimeout")
//         setTimeout(resolve, ms);
//         console.log("after setTimeout")
//     });
// }

// async function asyncPrint(value, ms) {
//     await timeout(ms).then(o=>console.log("1"));
//     console.log(value);
// }

// asyncPrint('hello world', 50);

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncPrint(){
    await sleep(1000)
    console.log("11")
}

asyncPrint()