import { DBManager } from "../dbManager.mjs";


class CleanDataTask {
    static taskId;
    static startTask = () => {
        if(this.taskId){
            console.log('fetch news task already started');
            return;
        }
        const task = () => {
            DBManager.cleanOutdatedNews();
        }

        task();
        const intervalTaskId = setInterval(task, 24 * 60 * 60 *1000 /** 24h */);

        this.taskId = intervalTaskId;
    }

    static stopTask = () => {
        if(this.taskId){
            clearInterval(this.taskId);
        }
        this.taskId = null;
    }
}

export { CleanDataTask };