
//Models
import {User} from '../models/user.model';

export interface UserPersistanceInterface {
    
    save(user: User): Promise<any>;
    
    get(): Promise<User>;
    
    remove(): Promise<any>;
    
}