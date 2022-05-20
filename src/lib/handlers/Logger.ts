import Application from "../../configs/Application";
import Environment from "../../utils/environments/Environment";

const isStagingOrDevelopment = Application.DevelopmentEnviroment === Environment.DEVELOPMENT || Application.DevelopmentEnviroment === Environment.STAGING;
export default class Logger {
  public static log = (...args: any[]) => {
    isStagingOrDevelopment && console.log('[default] ', ...args);
  }

  public static logError = (...args: any[]) => {
    console.error('[error] ', ...args);
  }

  public static logWarning = (...args: any[]) => {
    console.warn('[warning] ', ...args);
  }
  
}