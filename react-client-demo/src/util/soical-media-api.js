import 'whatwg-fetch';

var BASE_URL = 'http://localhost:3001';

export {userLogin, userRegister,test_non_parameter};

function userLogin(){
  var url = "http://localhost:3001/user/login";
  return fetch(url,{
    method : "POST",
    body: fetch_object,
  }).catch(function(err){
    console.log("Fetch error:"+err);
  });
}

function userLogout(){
  var url = "${BASE_URL}/user/logout";
  return fetch(url,{
    method : "POST",
    body: fetch_object,
  }).catch(function(err){
    console.log("Fetch error:"+err);
  });
}

function userRegister(){
  var url = "http://localhost:3001/user/register";
  return fetch(url,{
    method : "POST",
    body: fetch_object,
  }).catch(function(err){
    console.log("Fetch error:"+err);
  });
}

function userUpdatePassword(){
  var url = "http://localhost:3001/user/updatePassword";
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

