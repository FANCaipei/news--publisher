import { CleanDataTask } from "./src/tasks/cleanDataTask.mjs";
import { FetchNewsTask } from "./src/tasks/fetchNewsTask.mjs";
import { PublishNewsTask } from "./src/tasks/publishNewsTask.mjs";

const start = () => {
    try {
        FetchNewsTask.startTask();
        PublishNewsTask.startTask();
        CleanDataTask.startTask();
    } catch (error) {
        console.error(error);
    }
    
}

start();