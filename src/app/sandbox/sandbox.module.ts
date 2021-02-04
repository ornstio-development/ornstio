import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox.component';
import { SandboxOneService } from './services/sandbox-one.service';
import { SandboxTwoService } from './services/sandbox-two.service';

@NgModule({
  declarations: [SandboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SandboxComponent},
      { path: '1', component: SandboxComponent, data: { service: SandboxOneService.name } },
      { path: '2', component: SandboxComponent, data: { service: SandboxTwoService.name } },
    ])
  ], exports: [
    RouterModule
  ],
  providers: [
    { provide: SandboxOneService.name, useClass: SandboxOneService },
    { provide: SandboxTwoService.name, useClass: SandboxTwoService },
  ]
})
export class SandboxModule { }
