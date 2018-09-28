// //本地测试地址
// const BASE_REAL_TIME_URL = 'http://39.107.67.255:9099/api/RTDATA/getvalues?'; //测点实时数据服务
// const BASE_DEVICE_URL = 'http://39.107.67.255:9898/rtdb/api/query?';//设备模型服务
// const BASE_DATA_URL='http://192.168.2.67:7099/api/snap';//数据模型
// const BASE_ARCH_URL='http://39.107.67.255:9198/api/arch';//历史服务
// const BASE_LOGIN_URL = 'http://39.107.241.142:9000/THPISC/';//登录权限服务
// const BASE_CONTROL_URL = "http://39.107.241.142:3502/api/rmsg/send_control_commmd";//设备遥控服务
// const BASE_SERVICES_URL = "http://39.107.241.142/api/";
// const BASE_webgis__URL = "http://39.107.241.142:3501/webgis/get_Tissue_structure";
// const BASE_CURRENT_URL = 'http://192.168.2.67:7099/api/snap';//实时库调用
// const KAFKA_URL = 'http://192.168.2.67:3502/rmsg';//遥调遥控调用
// const MESSAGE_URL = 'http://192.168.3.230:8080/webrtdbboxserver';//报文暂时用这个调试
// const KAFKA_WS_URL = 'http://192.168.2.67:3502';//kafka调用
// const SOCKET_URL='ws://192.168.2.67:3001/';     //kafka监控数据地址
// const ALARM_URL='http://192.168.2.77:9898/alarm/api/query?';    //历史告警服务


//访问云服务器地址
const BASE_REAL_TIME_URL = 'http://39.107.67.255:9099/api/RTDATA/getvalues?'; //测点实时数据服务
const BASE_DEVICE_URL = 'http://39.107.67.255:9898/rtdb/api/query?';//设备模型服务
const BASE_DATA_URL='http://39.107.67.255:7099/api/snap';//数据模型
const BASE_ARCH_URL='http://39.107.67.255:9198/api/arch';//历史服务
const BASE_LOGIN_URL = 'http://39.107.241.142:9000/THPISC/';//登录权限服务
const BASE_CONTROL_URL = "http://39.107.241.142:3502/rmsg/send_control_commmd";//设备遥控服务
const BASE_SERVICES_URL = "http://39.107.241.142/api/";
const BASE_webgis__URL = "http://39.107.241.142:3501/webgis/get_Tissue_structure";
const BASE_CURRENT_URL = 'http://39.107.67.255:7099/api/snap';//实时库调用
const KAFKA_URL = 'http://39.107.241.142:3502/rmsg';//遥调遥控调用
const MESSAGE_URL = 'http://192.168.3.230:8080/webrtdbboxserver';//报文暂时用这个调试
const KAFKA_WS_URL = 'http://39.107.241.142:3502';//kafka调用
const SOCKET_URL='ws://39.107.241.142:3500/';     //kafka监控数据地址
const ALARM_URL='http://39.107.67.255:9898/alarm/api/query?';    //历史告警服务


//用户登录
const SysInfo = {
  client_id: '40288109638fb7ff01638fbae8c60002',
  client_secret: 'b97e4b4c-6fef-4c9d-948b-fd9d39d71dc9',
  scope: 'read,write',
  grant_type: 'password'
};

export default {
  "BASE_REAL_TIME_URL": BASE_REAL_TIME_URL,
  "BASE_DEVICE_URL": BASE_DEVICE_URL,
    "BASE_DATA_URL": BASE_DATA_URL,
    "BASE_ARCH_URL": BASE_ARCH_URL,
  "BASE_LOGIN_URL": BASE_LOGIN_URL,
  "BASE_CONTROL_URL": BASE_CONTROL_URL,
  "SysInfo": SysInfo,
  "BASE_SERVICES_URL": BASE_SERVICES_URL,
    "BASE_CURRENT_URL":BASE_CURRENT_URL,
    "KAFKA_URL":KAFKA_URL,
    "MESSAGE_URL":MESSAGE_URL,
    "KAFKA_WS_URL":KAFKA_WS_URL,
    "SOCKET_URL":SOCKET_URL,
     "ALARM_URL":ALARM_URL,
}