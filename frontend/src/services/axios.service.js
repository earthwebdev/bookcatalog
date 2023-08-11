import axios from 'axios';

const Server_url = import.meta.env.VITE_SERVER_URL;

export const getDataWithoutToken = async (url) => {
    //console.log(Server_url+url);     
    try {
      const response = await axios.get(Server_url+url);
      
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;    
    }     
}

export const postDatasFromAxios = async(url='', posttype=get, data) => {
  try {
    //console.log(posttype, 'type', Server_url+url, data);
    const responseData = await axios[posttype](Server_url+url, data);
    //console.log(responseData);
    return responseData.data;
    
  } catch (error) {
    return error.response.data;    
  }
}

export const postDatasFromAxiosWithToken = async(url='', posttype=get, data, token) => {
  try {
    //console.log(posttype, 'type', Server_url+url, data);
    const responseData = await axios[posttype](Server_url+url, data, {headers: {'Authorization': `Bearer ${token}`}});
    //console.log(responseData);
    return responseData.data;
    
  } catch (error) {
    return error.response.data;    
  }
}

export const deleteDatasFromAxiosWithToken = async(url='',  token) => {
  try {
    //console.log(posttype, 'type', Server_url+url, data);
    const responseData = await axios.delete(Server_url+url, {headers: {'Authorization': `Bearer ${token}`}});
    //console.log(responseData);
    return responseData.data;
    
  } catch (error) {
    return error.response.data;    
  }
}

export const getDataWithToken = async(url='', token) => {
  try {
    //console.log(Server_url+url)
    const responseData = await axios.get(Server_url+url, {headers: {'Authorization': `Bearer ${token}`}});
    //console.log(responseData);
    return responseData.data;
    
  } catch (error) {
    //console.log(error.response)
    return error.response.data;    
  }
}