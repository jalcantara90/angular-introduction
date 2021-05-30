import { environment } from "src/environments/environment";
import { EnvironmentSettings } from "src/environments/environment.model";

export function registerSettings(settings: EnvironmentSettings): void {
  environment.applicationInsights = settings.applicationInsights;
  environment.apiUrl = settings.apiUrl;
}
