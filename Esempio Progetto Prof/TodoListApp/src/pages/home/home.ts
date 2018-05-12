import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController, ItemSliding} from 'ionic-angular';

//Providers
import {TaskProvider} from '../../providers/task.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

//Models
import {Task} from '../../models/task.model';

//Types
import {ReorderIndexes} from '../../types';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    
    tasks: Array<Task> = [];
    public bAnimate: boolean = true;
    
    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public sTask: TaskProvider,
        public sDictionary: DictionaryService
    ) {
        this.sTask.getTasks()
            .then(tasks => {
                this.tasks = tasks;
                console.log(this.tasks);
            });
    }
    
    addTask() {
        this.alertCtrl.create({
            title: this.sDictionary.get("NEW_TASk"),
            inputs: [{
                name: "task",
                type: "text"
            }],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("ADD"),
                handler: (data) => {
                    const task = new Task({ text: data.task });
                    this.sTask.saveTask(task);
                }
            }]
        }).present();
    }
    
    editTask(task: Task, sliding: ItemSliding) {
        sliding.close();
        
        this.alertCtrl.create({
            title: this.sDictionary.get("EDIT_TASK"),
            inputs: [{
                name: "task",
                type: "text",
                value: task.text
            }],
            buttons: [{
                text: this.sDictionary.get("CANCEL"),
                role: "cancel"
            }, {
                text: this.sDictionary.get("EDIT"), 
                handler: (data) => {
                    task.text = data.task;
                    this.sTask.saveTask(task);
                }
            }]
        }).present();
    }
    
    toggleStateTask(task: Task) {
        task.completed = !task.completed;
        this.sTask.saveTask(task);
    }
    
    deleteTask(task: Task, sliding: ItemSliding) {
        sliding.close();
        
        this.sTask.deleteTask(task);
    }
    
    reorderTasks(indexes: ReorderIndexes) {
        this.bAnimate = false;
        this.sTask.reorderTasks(indexes);
        
        setTimeout(() => {
            this.bAnimate = true;
        }, 300);
    }

}
