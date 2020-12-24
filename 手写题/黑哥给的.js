
function getRandomInt(max) {
  const a = Math.floor(Math.random() * Math.floor(max))
  console.log(a)
  return a;
}

function addSync(a, b) {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, getRandomInt(10000));
  });
}

function addSum(args) {
  const promiseArr = []
  for(let i=0; i<args.length; i=i+2) {
    args[i+1] ? promiseArr.push(addSync(args[i],args[i+1])) : promiseArr.push(addSync(args[i],0))
  }
  Promise.all(promiseArr).then(res => {
    if(res.length>1) {
      addSum(res)
    }
    else {
      console.log(res[0])
    }
  }) 
}

addSum([1,2,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5])
