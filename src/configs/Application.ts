import Environment from "../utils/environments/Environment";
import Themes from "../utils/themes/Themes";

export type RootStackParamList = {
  FirstTimeSetup: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  CreateNote: undefined;
};

export default class Application {
  public static readonly Themes = Themes;
  public static readonly DevelopmentEnviroment : Environment = Environment.DEVELOPMENT;
  public static readonly VERSION_NUMBER = '0.0.1';
  public static readonly DATABASE_NAME = 'notes.db';
}