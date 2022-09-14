async function f1 () {
    return "hello async"
}

let f2 = () => {
    return "hello f2"
}
// f1().then(o => {
//     console.log(o)
// }).then(Promise.resolve(f2))

let p1 = (flag) => {
    return new Promise((resolve, reject) => {
        if (flag === 1) {
            console.log("p1=1")
            return resolve(1)
        }
        return reject("p1<>1")
    })
}

let p2 = new Promise((resolve, reject) => {
    console.log("p2")
})

Promise.resolve()
    .then(p1(2), f => {
        console.error(f)
    }).catch(o => console.log(o))
    .then(p2)