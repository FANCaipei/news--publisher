import weiboPost from "weibo-post";
import { DBManager } from "../dbManager.mjs";


async function weiboPublish(title, content, url) {
    const cookie = await DBManager.getWeiboToken();
    if (!cookie) {
        console.error('weibo cookie not found');
        return;
    }
    weiboPost.setCookie(cookie);
    const publishContent = content?.startsWith(title) ? `${content}\n${url}` : `${title}\n${content}\n${url}`;
    weiboPost.post(publishContent);
}

export {weiboPublish}