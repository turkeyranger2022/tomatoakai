// // promise = new Promise((resolve,reject) => {
// // let tmpPromise = new Promise((resolve2) =>{
// //     setTimeout((value)=> {
// //         resolve2('hello');
// //         console.log('内側');
// //     },1000)
// // })
// //         resolve(tmpPromise);
// //   // tmpPromise.then(resolve,reject);

// // });
// // promise = new Promise((resolve,reject) => {
// // let thenableObj = {
// //     then(resolve2,reject2) {
// //         setTimeout(()=> {
// // resolve2('hello2');
// //         },1000)
// //     }
// // }
// //         resolve(thenableObj);
// //   // thennableObj.then(resolve,reject);

// // });
// // promise = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     reject(new Error("error"));
// //   }, 1000);
// // });


// promise = new Promise(() => {

// });

// promise.then(
//   (value) => {
//     console.log("then fulfilld", value);
//   },
//   (error) => {
//     console.log("then rejected", error.message);
//   }
// );
// promise.then(null, (error) => {
//   console.log("then rejected only", error.message);
// });
// promise.catch((error) => {
//   console.log("catch", error.message);
// });
// promise.finally((value) => {
//   console.log("finaly", value);
// });

// new Promise(() =>{})
// .then((value)=>{
// console.log(value)
// return 2;
// })
// .then((value)=> {
// console.log(value);
// throw new Error(3);
// })
// .catch((error)=>{
// console.log(error.message);
// throw new Error(4);
// })
// .catch((error) => {
//     console.log(error.message);
//     return 5;
// })
// .then((value) => {
// console.log(value);
// return 6
// })
// .catch(()=> console.log('skip'))
// .catch(()=> console.log('skip'))
// .then((value) => {
//     console.log(value)
//     throw new Error(7);
// })
// .then(()=> console.log('skip'))
// .then(()=> console.log('skip'))
// .then(()=> console.log('skip'))
// .catch((error) =>{
//  console.log(error.message);
//  return 8;
// })
// .catch(()=> console.log('skip'))
// .finally((value) => {
//     console.log('finally value:', value)
//     return new Promise((resolve) => {
//         setTimeout(()=> {
//             resolve();
//         },1000)
//     })
// })
// .then((value)=> {
//     console.log(value);
// })

// .finally(() => {
// //    throw new Error(9);
//    return new Promise((resolve,reject) => {
//     setTimeout(()=> {
//         reject(new Error(9));
//     },1000);
// });
// })
// .then(()=> console.log('skip'))
// .catch((error) => {
// console.log('1秒だったあとにー？'+error.message);
// return new Promise((resolve,reject) => {
//     setTimeout(()=> {
//         resolve(10);
//     },1000);
// });
// })
// .then((value) => {
//     console.log(value);
//     return new Promise((resolve,reject) => {
//         setTimeout(()=> {
//             reject(new Error(11));
//         },1000);
//     });
// })
// .catch((error) => {
//     console.log(error.message)
// })


//  promise =new Promise((resolve) => resolve(1))
// let promise2 = promise.then((value)=>{
// console.log(value)
// // return 2;
// throw new Error(2);
// })

// /*
// promise2: {
// [[promisefill]]}
// */
// let func2 = (value)=> {
//     console.log(value);
//     throw new Error(3);
//     };

// let promise3 = promise2.then(func2)

// let promise4 = promise3.catch((error)=>{
// console.log(error.message);
// // throw new Error(4);
// })
// let finallyFunc =() => {}
//  let promise5 = promise4.finaly(finallyFunc);

//  let promise6 = promise5.then(()=> {
//     throw new Error('error')
//  });

//  let promise7 = promise6.then(()=> {

//  });

//  let promise8 = promise7.catch((error)=> {
//     console.log(error.message);
//  })

//  navigator.mediaDevices.getUserMedia({video: true})
//  .then((value)=> {
//     console.log(value);
//  } )
//  .catch((error) => {
//     console.log(error.message);
//  })
//  .then(() => {
//      return navaigator.clipboard.readTxt()
//  })
//  .then((text)=> {
//     console.log(text)
//  })
//  .catch((error)=> {
//     console.log(error.message);
//  });

 let promisifiedSetTimeout = (time)=> {
    return new Promise((resolve) => {
        setTimeout(()=> {
resolve();
        },time)
    })
 }

 promisifiedSetTimeout(1000)
 .then(()=> {
    console.log('promisifiedSetTimeout1');
    return promisifiedSetTimeout(1000)
 })
 .then(()=> {
    console.log('promisifiedSetTimeout2');
    return promisifiedSetTimeout(1000)
 })
 .then(()=> {
    console.log('promisifiedSetTimeout3');
    return promisifiedSetTimeout(1000)
 })
 .then(()=> {
    console.log('promisifiedSetTimeout4');
    return promisifiedSetTimeout(1000)
 })

 Promise.all([])