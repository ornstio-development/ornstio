import { Injectable } from '@angular/core';
import { ISandbox } from './isandbox.interface';

@Injectable({
  providedIn: 'root'
})
export class SandboxTwoService implements ISandbox {

  constructor() { }

  foo(){
    return SandboxTwoService.name;
  }
}