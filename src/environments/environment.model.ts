export interface EnvironmentSettings {
  production: boolean;
  applicationInsights: ApplicationInsights;
  apiUrl: string;
}

export interface ApplicationInsights {
  instrumentationKey: string;
}
