import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountMask'
})
export class AccountMaskPipe implements PipeTransform {

  transform(value: string): string {
    return 'XXXXX' + value.slice(-4);
  }

}