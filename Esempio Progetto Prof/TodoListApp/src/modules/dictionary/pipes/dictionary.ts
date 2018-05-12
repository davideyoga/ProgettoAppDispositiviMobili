import {Pipe} from '@angular/core';
import {DictionaryService} from '../providers/dictionary.service';

    
@Pipe({
    name: 'dictionary'
})
export class DictionaryPipe {
    
    constructor(private sDict: DictionaryService) {}
    
    transform(value, ...args) {
        return this.sDict.get(value);
    }
    
}
