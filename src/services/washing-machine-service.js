
import axios from 'axios';

const washingMachineService = {

   getWashingMachines: function(){
     return axios.get(`http://localhost:8080/washingmachines`)
       .then(res => {
         return res.data;
       });
   },
}

export default washingMachineService
