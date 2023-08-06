import axios from 'axios';

const Server_url = import.meta.env.VITE_SERVER_URL;

export const getDataWithoutToken = async (url) => {
    //console.log(Server_url+url);     
    //try {
      const response = await axios.get(Server_url+url);
      
      //console.log(response.data);
      return response.data;
    /* } catch (error) {
      console.error(error);
    }   */  
}