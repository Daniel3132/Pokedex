let x=5;
const promesa = new Promise((resolve,reject)=>{
    if(x==10){
        resolve('La variable es igual a 10')
    }else{
        reject('La variable no es igual a 10')
    }
})

console.log(promesa);

promesa.then(res =>{
    console.log(res);

}).catch(error =>{
    console.log(error);
})