import { isRejected } from "@reduxjs/toolkit";

// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve) =>{
     const response = await fetch('http://localhost:8080/auth/signup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
     })
     const data = await response.json()
     resolve({data})
     }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async(resolve,reject) =>{
    try{
      const email = loginInfo.email;
     const password = loginInfo.password;
     const response = await fetch('http://localhost:8080/auth/login',{
      method:'POST',
      body:JSON.stringify(loginInfo),
      headers:{'content-type':'application/json'}
     });
     if(response.ok){
       const data = await response.json()
       resolve({data})
     }
     else{
      const error = await response.json()
      resolve(error)
     }
    }catch(error){
      reject(error)
    }
    }
  );
}

export function signOut(userId) {
  return new Promise(async(resolve) =>{
     
     resolve({data:'success'})
     }
  );
}

