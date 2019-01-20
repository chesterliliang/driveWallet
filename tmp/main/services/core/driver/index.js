import { GetStatus as _getStatus } from './GetStatus';
import { GetPinStatus as _getPinStatus } from './GetPinStatus';
import { GetStatusByIndex as getStatusByIndex } from './GetStatusByIndex';
import { GetDevNum as getDevNum } from './GetDevNum';
import { GetCoinAddress as getDeviceAddresses } from './GetCoinAddress';
import { GenSeedToUseState as initialize } from './GenSeedToUseState';
import { ChangePIN as changePIN } from './ChangePIN';
import { UpdateCos as updateCOS } from './UpdateCos';
import { format } from './format';
import { RecoverMNE as recoverMne } from './RecoverMNE'
import { Seed2PrivateKey as seed2PrivateKey} from './Seed2PrivateKey'
import { ImportMne as importMne} from './ImportMne'
import { app } from 'electron';
import {GetLibVer}from './GetLibVer';

let pinstatus= -1;
let statusCallback = null;
let COSVersion = null;

const PAEW_DEV_INFO_LCD_NULL = 0x00000000                  
const PAEW_DEV_INFO_LCD_SHOWLOGO = 0x00000001              
const PAEW_DEV_INFO_LCD_WAITTING = 0x00000002              
const PAEW_DEV_INFO_LCD_SHOWOK = 0x00000004                
const PAEW_DEV_INFO_LCD_SHOWCANCEL = 0x00000008            
const PAEW_DEV_INFO_LCD_SHOWSKEYHASH = 0x00000010          
const PAEW_DEV_INFO_LCD_SHOWADDRESS = 0x00000020           
const PAEW_DEV_INFO_LCD_SHOWBTCSIGN = 0x00000040           
const PAEW_DEV_INFO_LCD_SHOWETHSIGN = 0x00000080           
const PAEW_DEV_INFO_LCD_SETNEWPIN = 0x00000100             
const PAEW_DEV_INFO_LCD_CHANGEPIN = 0x00000200             
const PAEW_DEV_INFO_LCD_VERIFYPIN = 0x00000400             
const PAEW_DEV_INFO_LCD_PINLOCKED = 0x00000800             
const PAEW_DEV_INFO_LCD_FORMAT = 0x00001000                
const PAEW_DEV_INFO_LCD_REBOOT = 0x00002000                
const PAEW_DEV_INFO_LCD_SHOWBIP39 = 0x00004000             
const PAEW_DEV_INFO_LCD_CHECKBIP39 = 0x00008000            
const PAEW_DEV_INFO_LCD_SHOWBTSSIGN = 0x00010000           
const PAEW_DEV_INFO_LCD_PINERROR = 0x00020000              
const PAEW_DEV_INFO_LCD_SELECT_MNENUM = 0x00040000         
const PAEW_DEV_INFO_LCD_SHOWM = 0x00080000                 
const PAEW_DEV_INFO_LCD_SHOWTIMEOUT = 0x00100000           
const PAEW_DEV_INFO_LCD_SHOWEOSSIGN = 0x00200000           
const PAEW_DEV_INFO_LCD_SHOWFAIL = 0x00400000              
const PAEW_DEV_INFO_LCD_SHOWNEOSIGN = 0x00800000           
const PAEW_DEV_INFO_LCD_WAITING_TIMEOUT = 0x01000000       
const PAEW_DEV_INFO_LCD_GET_MNENUM = 0x02000000            
const PAEW_DEV_INFO_LCD_GETMNE_BYDEV = 0x04000000          


async function getStatus() {
  try {    
    const pindata = await _getPinStatus();
    const newPinStatus = pindata.result || parseInt(pindata, 10);
    if (newPinStatus !== pinstatus) {
      pinstatus = newPinStatus;
      statusCallback && statusCallback(null, newPinStatus);
    }

    if (newPinStatus) {
      return pindata;
    }

    let data = await _getStatus();
    let isOldDevice = false;

    let resultCode = data.result || parseInt(data, 10);
    if (resultCode === 0x8000001F) {
      isOldDevice = true;
      data = await _getStatus(isOldDevice);
      resultCode = data.result || parseInt(data, 10);
    }
    if (!!resultCode) {
      return data;
    }

    const { DevInfo: [{ COS, LcdState }] } = data;
    if (!COSVersion) {
      COSVersion = COS;
    }
    if (!isOldDevice) {
      if (LcdState != PAEW_DEV_INFO_LCD_NULL && LcdState != PAEW_DEV_INFO_LCD_SHOWLOGO && LcdState != PAEW_DEV_INFO_LCD_VERIFYPIN) {
        statusCallback && statusCallback(null, LcdState);
        return LcdState;
      }
    } else {
      data.DevInfo['LcdState'] = 0;
    }

    return data; 
  } catch (error) {
    statusCallback && statusCallback(error);

    return { result: -1 };
  }
}

function onPinStatus(cb) {
  statusCallback = cb;
}

function getCOSVersion() {
  return COSVersion;
}
async function getAppVersion() {
  let libVer = await GetLibVer()
  return {result:0, ElectronVer:app.getVersion(), MidWareVer:libVer.libVer};
}

export {
  changePIN,
  getStatus,
  getStatusByIndex,
  getDevNum,
  getDeviceAddresses,
  format,
  initialize,
  updateCOS,
  onPinStatus,
  getCOSVersion,
  getAppVersion,
  recoverMne,
  seed2PrivateKey,
  importMne
};
