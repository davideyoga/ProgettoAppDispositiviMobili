import {Injectable} from '@angular/core';
import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ReorderIndexes} from '../types';

//Providers
import {AccountProvider} from './account.provider';

//Models 
import {Task} from '../models/task.model';

//Constants
import {URL_BASE, URL} from '../constants';

//Types
import {ResponseServer, OrderTask} from '../types';

@Injectable()
export class TaskProvider {

    private _tasks: Array<Task> = null;

    constructor(
        private _http: Http,
        private _sAccount: AccountProvider
    ) {
        console.log('Hello Task Provider');

        this._sAccount.events.subscribe('user:logout', () => {
            this._tasks = null;
        });
    }

    /**
     * Recupera i task dal server.
     */
    getTasks(): Promise<Array<Task>> {
        return new Promise((resolve) => {
            if (this._tasks === null) {
                this._tasks = [];

                this._http.get(URL_BASE + URL.TASKS.GETALL + this._sAccount.getUser().token).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const tasks = json.data;
                            for (let task of tasks) {
                                this._tasks.push(new Task(task));
                            }
                            resolve(this._tasks);
                        } else {
                            resolve(this._tasks);
                        }
                    })
                    .catch(() => resolve(this._tasks));
            } else {
                resolve(this._tasks);
            }
        });
    }

    /**
     * Salva un task sul server
     */
    saveTask(task: Task): Promise<any> {
        if (task.id === -1) {
            return this._createTask(task);
        } 
        
        return this._editTask(task);
    }

    /**
     * Cancella un task dal server
     */
    deleteTask(task: Task): Promise<any> {
        return new Promise((resolve, reject) => {
            let index = this._tasks.indexOf(task);
            if (index !== -1) {
                this._http.delete(URL_BASE + URL.TASKS.EDIT + this._sAccount.getUser().token + "/" + task.id)
                    .toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            this._tasks.splice(this._tasks.indexOf(task), 1);
                            resolve();
                        } else {
                            reject();
                        }
                    });
            }
        });
    }

    /**
     * Aggiorna la posizione di ogni task.
     */
    reorderTasks(indexes: ReorderIndexes): Promise<any> {
        return new Promise((resolve, reject) => {
            reorderArray(this._tasks, indexes);

            this._saveOrderTask()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => reject());
        });
    }

    /**
     * Ritorna il task corrispondente all'id.
     */
    getTask(id: number): Task {
        return this._tasks.find(task => task.id === id);
    }


    /* funzioni private */

    private _createTask(newTask: Task) {
        return new Promise((resolve, reject) => {
            this._http.post(URL_BASE + URL.TASKS.CREATE + this._sAccount.getUser().token, {
                text: newTask.text,
                completed: newTask.completed,
                position: newTask.position
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        newTask.id = json.data.id;
                        this._tasks.unshift(newTask);
                        this._saveOrderTask();
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }
    private _editTask(task: Task) {
        return new Promise((resolve, reject) => {
            this._http.put(URL_BASE + URL.TASKS.EDIT + this._sAccount.getUser().token + "/" + task.id, {
                text: task.text,
                completed: task.completed,
                position: task.position
            })
                .toPromise()
                .then((res: Response) => {
                    const json = res.json() as ResponseServer;

                    if (json.result) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }
    
    private _saveOrderTask() {
        this._tasks.forEach((task, index) => task.position = index);
        
        return this._http.post(URL_BASE + URL.TASKS.EDIT + this._sAccount.getUser().token + '/' + URL.TASKS.ORDER, this._getOrderArrayForServer())
                .toPromise()
    }

    private _getOrderArrayForServer(): Array<OrderTask> {
        return this._tasks.map(task => {return {id: task.id, position: task.position}});
    }

}
