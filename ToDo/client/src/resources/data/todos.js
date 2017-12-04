import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class ToDos {
    
    constructor(data) {
        		this.data = data;
        		this.TODO_SERVICE = 'todos';
this.todoArray =[];

   		 }
async getUserTodo(id){
    let response = await this.data.get(this.TODO_SERVICE + "/user/" +id);
    if(!response.error && !response.message){
        this.todoArray = response;
    }
}

async save(todo){
    if(todo){
        if(!todo._id){
            let serverResponse = await this.data.post(todo, this.TODO_SERVICE);
            if(!serverResponse.error){
                this.todoArray.push(serverResponse);
            }
            return ServerResponse;
        } else {
            let response = await this.data.put(todo, this.TODO_SERVICE + "/" + todo._id);
            if(!response.error){
                
            }
            return response;
        }
    }


}
async deleteTodo(id){
    let response = await this.data.delete(this.TODO_SERVICE + "/" + id);
    if(!response.error){
        for(let i = 0; i < this.todoArray.length; i++){
            if(this.todoArray[i]._id === id){
                this.todoArray.splice(i,1);
            }
        }
    }
}

}

