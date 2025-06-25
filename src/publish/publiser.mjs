import { DBManager } from "../dbManager.mjs";
import {weiboPublish} from "./weiboPublisher.mjs"

/**
 *
 * @param {*} news
 * {
 *     Id: number,
 *     title: string,
 *     description: string,
 *     content: string,
 *     image: string,
 *     url: string,
 *     timestamp: number,
 *     published: boolean
 * }
 */
const publish = (news) => {
    weiboPublish(news.title, news.content, news.url);
    // update published status
    DBManager.setNewsPublished(news.Id, true);
}

export { publish };