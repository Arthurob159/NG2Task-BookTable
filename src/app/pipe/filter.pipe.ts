import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name:'filterByTitle'})
export class FilterByTitlePipe implements PipeTransform {
    transform(args:string[]) : any {
        var stringData = args;
        console.log('args:',args);
        console.log('stringData:',stringData);
        
        return stringData;
    }
}