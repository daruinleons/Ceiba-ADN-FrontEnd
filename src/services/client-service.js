
import axios from 'axios';

const clientService = {

   getClients: function(){
     return axios.get(`http://localhost:8080/clients`)
       .then(res => {
         return res.data;
       });
   },
}

export default clientService;
