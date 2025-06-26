import { NEWS_TYPES } from "../constants/newsType.mjs";
import { DBManager } from "../dbManager.mjs";
import { getTopNews } from "../getNews.mjs";


class FetchNewsTask {
    static taskId;
    // static currentNewsTypeIndex = 0;
    static startTask = () => {
        if(this.taskId){
            console.log('fetch news task already started');
            return;
        }
        const task = async () => {
            NEWS_TYPES.forEach((type, index) => {
                setTimeout(() => {
                    getTopNews(type).then((data) => {
                            // console.log('news: ', data);
                            if(!data?.articles?.length){
                                return;
                            }

                            DBManager.saveNews(data.articles?.map(item => {
                                return {
                                    title: item.title,
                                    description: item.description,
                                    content: item.content,
                                    image: item.image,
                                    url: item.url,
                                    timestamp: new Date(item.publishedAt).getTime(),
                                    type: type,
                                    published: false,
                                }
                            })
                        ).finally(() => {
                            // this.currentNewsTypeIndex = (this.currentNewsTypeIndex + 1) % NEWS_TYPES.length;
                        });
                    })
                }, index * 3000); // send request per 3 seconds to avoid reaching request rate limit
            });
        }

        task();
        const intervalTaskId = setInterval(task, 2 * 60 * 60 * 1000 /**2 hours */);

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