import { NEWS_TYPES } from "../constants/newsType.mjs";
import { DBManager } from "../dbManager.mjs";
import { publish } from "../publish/publiser.mjs";


class PublishNewsTask {
    static taskId;
    static currentNewsTypeIndex = 0;
    static startTask = () => {
        if(this.taskId){
            console.log('publish task already started');
            return;
        }
        const task = async () => {
            // console.log('currentNewsTypeIndex: ', NEWS_TYPES[this.currentNewsTypeIndex]);
            DBManager.getLatestUnpublishedNews(NEWS_TYPES[this.currentNewsTypeIndex]).then((data) => {
                const news = data?.list?.[0];
                console.log('news: ', data?.list);
                if (news) {
                    news.content = news.content.replace(/(\[.*\])$/, '')
                    publish(news);
                }
            }).finally(() => {
                this.currentNewsTypeIndex = (this.currentNewsTypeIndex + 1) % NEWS_TYPES.length;
            });
        }

        task();
        const intervalTaskId = setInterval(task, 3 * 60 *1000 /**3 mins */);

        this.taskId = intervalTaskId;
    }

    static stopTask = () => {
        if(this.taskId){
            clearInterval(this.taskId);
        }
        this.taskId = null;
    }
}

export { PublishNewsTask };