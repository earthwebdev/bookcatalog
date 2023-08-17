import { getDataWithoutToken } from '../services/axios.service';
const SettingUtil = async () => {
        const resp = await getDataWithoutToken('/settings')
        //console.log(resp);
        const settingData = {};
    if(resp.status){
        if(resp.data && resp?.data?.length > 0){
            const datas = resp.data;
            
            datas.forEach(element => {
              //console.log(element.name)
              //const name = element.name;
              settingData[element.name] = element.value
              //settingData.name = element.value;
            });
            //setSetting(settingData);
            //console.log(settingData.pagelimits);
        }
        return settingData;
          //console.log(settingData);            
    }
}

export default SettingUtil