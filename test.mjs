import { DBManager } from "./src/dbManager.mjs";
import { getTopNews } from "./src/getNews.mjs";
import { publish } from "./src/publish/publiser.mjs";
import { PublishNewsTask } from "./src/tasks/publishNewsTask.mjs";

const type = 'business';
// getTopNews(type).then((data) => {
//     console.log('news: ', data);

//     DBManager.saveNews(data.articles?.map(item => {
//         return {
//             title: item.title,
//             description: item.description,
//             content: item.content,
//             image: item.image,
//             url: item.url,
//             timestamp: new Date(item.publishedAt).getTime(),
//             type: type,
//             published: false,
//         }
//     }));
// })

// DBManager.getLatestUnpublishedNews('science').then((data) => {
//     console.log('latest news: ', data);
//     // const news = data?.list?.[0];
//     // if (news) {
//     //     news.content = news.content.replace(/(\[.*\])$/, '')
//     //     publish(news);
//     // }
// })

// DBManager.cleanOutdatedNews();
// PublishNewsTask.startTask();
// DBManager.setNewsPublishedWithTitle('Robotaxi只上路了10辆，马斯克身家微涨1000亿-36氪');