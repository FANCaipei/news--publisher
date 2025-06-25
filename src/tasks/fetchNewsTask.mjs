import { NEWS_TYPES } from "../constants/newsType.mjs";
import { DBManager } from "../dbManager.mjs";
import { getTopNews } from "../getNews.mjs";


class FetchNewsTask {
    static taskId;
    static currentNewsTypeIndex = 0;
    static startTask = () => {
        if(this.taskId){
            console.log('fetch news task already started');
            return;
        }
        const task = async () => {
            getTopNews(NEWS_TYPES[this.currentNewsTypeIndex]).then((data) => {
                    console.log('news: ', data);

                    DBManager.saveNews(data.articles?.map(item => {
                        return {
                            title: item.title,
                            description: item.description,
                            content: item.content,
                            image: item.image,
                            url: item.url,
                            timestamp: new Date(item.publishedAt).getTime(),
                            type: NEWS_TYPES[this.currentNewsTypeIndex],
                            published: false,
                        }
                    })
                ).finally(() => {
                    this.currentNewsTypeIndex = (this.currentNewsTypeIndex + 1) % NEWS_TYPES.length;
                });
            });
        }

        task();
        const intervalTaskId = setInterval(task, 20 * 60 *1000 /**20 mins */);

        this.taskId = intervalTaskId;
    }

    static stopTask = () => {
        if(this.taskId){
            clearInterval(this.taskId);
        }
        this.taskId = null;
    }
}

export { FetchNewsTask };