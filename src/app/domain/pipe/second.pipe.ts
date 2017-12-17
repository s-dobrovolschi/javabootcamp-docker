import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'second'
})
export class SecondPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    return value / 1000;
  }

}
