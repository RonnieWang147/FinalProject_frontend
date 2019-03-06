import axios from 'axios';

const BASE_URL = "http://localhost:8080"
const FB_TOKEN ="EAAHZCaLiHg90BADulAaYnCTOUZBSsw2CE5voIDUcs1FPJ1Df8tgYZBsfLjiYJH1v7pewLhP9cralEm4yyQLl5hTCzyi2fby3xaf9MqwajHZAzbNZBPl29q6iOxbxReZCQI8422SEGZBZB3BzlMOUpnhG5xlHPJ2ZAvDfwkWUfFnOU8gZDZD";
export function setToken(token){
    if (token) {
      axios.defaults.headers.common['JWT'] = "Bearer " + token;
    } else {
      axios.defaults.headers.common['JWT'] = null;
      /*if setting null does not remove `bearer` header then try     
      delete axios.defaults.headers.common['bearer'];
      */
    }
  }
  
  export function resetPassword(token, password) {
    const url = `${BASE_URL}/resetPassword.php`;
    const formData = new FormData();
    formData.append('password', password);
    if(token)
    axios.defaults.headers.common['JWT'] = "Bearer " + token;
    return axios.post(url,formData).then(
      response => {
          return response.data;
      }
    ).catch(function (error){
      throw error;
    });
  }
  let getter = (url) => {
    let JWToken =  localStorage.getItem("jwt");
    
    if(JWToken)
    axios.defaults.headers.common['JWT'] = "Bearer " + JWToken;
    return axios.get(url).then(
      response => {
        if(response.data.rc === -2){
          let RefreshToken =  localStorage.getItem("refreshtoken");
          axios.defaults.headers.common['refreshtoken'] = RefreshToken;
          return axios.get(`${BASE_URL}/refreshToken.php`).then(response=>{
            let token = response.data.token;
            let role = response.data.role;
            let assets = response.data.assets;
            if(token){
              localStorage.setItem("jwt",token);
              localStorage.setItem("authed",role);
              localStorage.setItem('assets', JSON.stringify(assets));
              axios.defaults.headers.common['bearer'] = token;
              return axios.get(url).then(
                response => response.data
              ).catch(function (error){
                if(error) throw error;
              })
            }
          })
        }
        else
          return response.data;
      }
    ).catch(function (error){
        throw error;
    });
  }
  let poster = (url,content) => {
    let JWToken =  localStorage.getItem("jwt");
    if(JWToken)
    axios.defaults.headers.common['JWT'] = "Bearer " + JWToken;
    return axios.post(url,content).then(
      response => {
        if(response.data.rc === -2){
          let RefreshToken =  localStorage.getItem("refreshtoken");
          axios.defaults.headers.common['refreshtoken'] = RefreshToken;
          return axios.get(`${BASE_URL}/refreshToken.php`).then(response=>{
            let token = response.data.token;
            let role = response.data.role;
            let assets = response.data.assets;
            if(token){
              localStorage.setItem("jwt",token);
              localStorage.setItem("authed",role);
              localStorage.setItem('assets', JSON.stringify(assets));
              axios.defaults.headers.common['bearer'] = token;
              return axios.post(url,content).then(
                response => response.data
              ).catch(function (error){
                if(error) throw error;
              })
            }
          })
        }
        else
          return response.data;
      }
    ).catch(function (error){
      throw error;
    });
  }
  export function LoginSubmit(username, password) {
    const url = `${BASE_URL}/login`;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return poster(url,formData);
  }