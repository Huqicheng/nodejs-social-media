import 'whatwg-fetch';

var BASE_URL = 'http://localhost:3001';

export {userLogin, userLogout, userRegister,userUpdatePassword,test_non_parameter};

function userLogin(fetch_object){
  var url = "http://localhost:3001/user/login";
  return fetch(url,{
        method : "POST",
        body: JSON.stringify(fetch_object),
        headers:{
              'Content-Type': 'application/json'
            }
      })
}

function userLogout(){
  var url = "${BASE_URL}/user/logout";
  const fetch_object = {};
  return fetch(url,{
    method : "POST",
    body: fetch_object,
  }).catch(function(err){
    console.log("Fetch error:"+err);
  });
}

function userRegister(fetch_object){
  var url = "http://localhost:3001/user/login";
  return fetch(url,{
        method : "POST",
        body: JSON.stringify(fetch_object),
        headers:{
              'Content-Type': 'application/json'
            }
      })
}

function userUpdatePassword(){
  var url = "http://localhost:3001/user/updatePassword";
  const fetch_object = {};
  return fetch(url,{
    method : "POST",
    body: fetch_object,
  }).catch(function(err){
    console.log("Fetch error:"+err);
  });
}

function test_non_parameter(){
  var url = "http://localhost:3001/user/test_non_parameter";
  return fetch(url,{
    method : "GET",
  }).catch((err)=>{
    console.log("Fetch error:"+err);
  });
}

