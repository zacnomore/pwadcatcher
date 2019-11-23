import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  public env: IEnvironment = environment;
}

export interface IEnvironment {
  production: boolean;
  appleSearchUrl: string;
}
