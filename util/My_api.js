import {AsyncStorage} from 'react-native';
import axios from 'axios';

const BASE_URL = "https://my-capstone-project-235720.appspot.com"
// const BASE_URL = "http://192.168.1.14:8080"
const YELP_API_KEY = "tc8-NjddT_4EnBddv0CPfDckf_L0R3gNe7Iteso3rjxtcT-OlT_eoS4nnFFVPCJhjkGflD1RxG5ZmZ-EK4rZIQvSrhzXIZ-1j7bbnAIvJ8aYuYtnUW9askzu3v97XHYx";
const FB_TOKEN ="EAAHZCaLiHg90BADulAaYnCTOUZBSsw2CE5voIDUcs1FPJ1Df8tgYZBsfLjiYJH1v7pewLhP9cralEm4yyQLl5hTCzyi2fby3xaf9MqwajHZAzbNZBPl29q6iOxbxReZCQI8422SEGZBZB3BzlMOUpnhG5xlHPJ2ZAvDfwkWUfFnOU8gZDZD";


export async function yelpSearch(latitude, longitude, radius = 1000){
    
    // if(YELP_API_KEY)
    //     axios.defaults.headers.common['Authorization'] = "Bearer " + YELP_API_KEY;
    // return axios.get(`https://api.yelp.com/v3/businesses/search?location=${latitude},${longitude}&radius=${radius}&limit=5`)
    try {
        const res = await axios.get(`https://api.yelp.com/v3/businesses/search`, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            },
            params: {
                location: `${latitude},${longitude}`,
                radius: radius,
                limit: 5
            }
        });
        // return res.data;
        let returnData = res.data.businesses.map(async business => {
            const detail = await getBusinessByID(business.id);
            return detail;
        })
        let results = Promise.all(returnData).then(results => results).catch(e => console.log(e));
        return results;
    }
    catch (err) {
        console.log(err);
    }
}

export async function facebookSearch(latitude, longitude, radius = 1000){
    
    // return axios.get(`https://graph.facebook.com/v3.2/search?type=place&center=${latitude},${longitude}&distance=${radius}&q=cafe&fields=name,checkins,picture,cover,description,single_line_address,rating_count,overall_star_rating,description&limit=5&access_token=${FB_TOKEN}`)
    try {
        const res = await axios.get(`https://graph.facebook.com/v3.2/search`, {
            params: {
                type: 'place',
                center: `${latitude},${longitude}`,
                distance: radius,
                q: 'cafe',
                fields: 'name,checkins,picture,cover,description,single_line_address,rating_count,overall_star_rating,location,category_list,hours,phone,price_range,website',
                limit: 5,
                access_token: FB_TOKEN
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function getBusinessByID(id){
    try {
        const res = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            }
        });
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}
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
  let getter = async (url) => {
    let JWToken = await AsyncStorage.getItem('jwt');
    
    if(JWToken)
    axios.defaults.headers.common['JWT'] = "Bearer " + JWToken;
    try {
          const response = await axios.get(url);
        //   if (response.data.rc === -2) {
        //       let RefreshToken = localStorage.getItem("refreshtoken");
        //       axios.defaults.headers.common['refreshtoken'] = RefreshToken;
        //       return axios.get(`${BASE_URL}/refreshToken.php`).then(response_1 => {
        //           let token = response_1.data.token;
        //           let role = response_1.data.role;
        //           let assets = response_1.data.assets;
        //           if (token) {
        //               localStorage.setItem("jwt", token);
        //               localStorage.setItem("authed", role);
        //               localStorage.setItem('assets', JSON.stringify(assets));
        //               axios.defaults.headers.common['bearer'] = token;
        //               return axios.get(url).then(response_2 => response_2.data).catch(function (error) {
        //                   if (error)
        //                       throw error;
        //               });
        //           }
        //       });
        //   }
        //   else
              return response.data;
      }
      catch (error_1) {
          throw error_1;
      }
  }
  let poster = async (url,content) => {
    let JWToken = await AsyncStorage.getItem('jwt');
    if(JWToken)
    axios.defaults.headers.common['JWT'] = "Bearer " + JWToken;
    try {
        console.log(url);
        console.log(JSON.stringify(content));
          const response = await axios.post(url, content);
          console.log(`response: ${JSON.stringify(response.data)}`);
        //   if (response.data.rc === -2) {
        //       let RefreshToken = localStorage.getItem("refreshtoken");
        //       axios.defaults.headers.common['refreshtoken'] = RefreshToken;
        //       return axios.get(`${BASE_URL}/refreshToken.php`).then(response_1 => {
        //           let token = response_1.data.token;
        //           let role = response_1.data.role;
        //           let assets = response_1.data.assets;
        //           if (token) {
        //               localStorage.setItem("jwt", token);
        //               localStorage.setItem("authed", role);
        //               localStorage.setItem('assets', JSON.stringify(assets));
        //               axios.defaults.headers.common['bearer'] = token;
        //               return axios.post(url, content).then(response_2 => response_2.data).catch(function (error) {
        //                   if (error)
        //                       throw error;
        //               });
        //           }
        //       });
        //   }
        //   else
              return response.data;
      }
      catch (error_1) {
        //   throw error_1;
        console.log(error_1);
      }
  }
  export async function LoginSubmit(username, password) {
    const url = `${BASE_URL}/login`;
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);
    // return await poster(url,formData);
    return await poster(url,{username: username, password: password});
  }
  export async function search(latitude, longitude) {
    const url = `${BASE_URL}/search?latitude=${latitude}&longitude=${longitude}`;
    // const formData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);
    // return await poster(url,formData);
    return await getter(url);
  }