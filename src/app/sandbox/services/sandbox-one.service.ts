import { Injectable } from '@angular/core';
import { ISandbox } from './isandbox.interface';

@Injectable({
  providedIn: 'root'
})
export class SandboxOneService implements ISandbox {

  constructor() { }

  foo(){
    return SandboxOneService.name;
  }
}
