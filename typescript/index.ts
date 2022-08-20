export {}

// const a : string = "hello world";
// console.log(a);

// const b : string ="pulkit";
// const c : boolean = false;
// const d : number = 10;

// const data :string[] = ['anil', 'jeyo' , "merio"];

// data.push("100");
// console.log(data);

// object
//  interface usersTyped{
//     name : string,
//     age : number,
//     designation : string
//  }

//  let users : usersTyped = {
//     name : "pulkit",
//     age: 30,
//     designation : "web developer"
//  }

//  let anotherUser : any = {
//     name : "pulkit",
//     age: 30,
//     designation : "web developer"
//  }

//  console.log(users)

// union types ==> 

// let data : string |number |string[] = 30;
// data = ["ram"]
// console.log(data);

//interface

// interface userType{
//     name : string, 
//     age : number,
//     getName :()=>string
// }

function Cals(a: number, b?:number){
    return b ? a*b : a;
}

console.log(Cals(100))