import weiboPost from "weibo-post";
import { DBManager } from "../dbManager.mjs";


async function weiboPublish(title, content, url) {
    const cookie = await DBManager.getWeiboToken();
    if (!cookie) {
        console.error('weibo cookie not found');
        return;
    }
    weiboPost.setCookie(cookie);
    weiboPost.post(`${title}\n${content}\n${url}`);
}

export {weiboPublish}