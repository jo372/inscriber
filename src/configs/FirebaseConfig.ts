interface FirebaseConfigProps {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export class FirebaseConfig implements FirebaseConfigProps {
  
  public readonly apiKey: string;
  public readonly authDomain: string;
  public readonly projectId: string;
  public readonly storageBucket: string;
  public readonly messagingSenderId: string;
  public readonly appId: string;

  constructor({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }: FirebaseConfigProps) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    this.projectId = projectId;
    this.storageBucket = storageBucket;
    this.messagingSenderId = messagingSenderId;
    this.appId = appId;
  }

  public toJSON() {
    return {
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId,
    };
  }
}

