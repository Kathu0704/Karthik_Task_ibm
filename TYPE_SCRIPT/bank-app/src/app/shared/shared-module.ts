import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountMaskPipe } from '../pipes/account-mask-pipe';

@NgModule({
  imports: [
    CommonModule,
    AccountMaskPipe
  ],
  exports: [
    AccountMaskPipe
  ]
})
export class SharedModule {}