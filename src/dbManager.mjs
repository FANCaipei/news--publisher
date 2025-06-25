import axios from "axios";

const dbToken = 'RwMPNgGFxYPz7uAGXZ4zcfPa1nzWtWHkYVQ5_Gzm';

const AxiosClient = axios.create({
    baseURL: 'http://localhost:8080/api/v2',
    headers: {
        'xc-token': dbToken,
    }
})

class DBManager {
    /**
     * 
     * @param {*} news 
     * {
        "title": "string",
        "description": "string",
        "content": "string",
        "image": "string",
        "url": "string",
        "timestamp": 0,
        "published": boolean
        }
     */
    static saveNews = async (news) => {
        // news?.forEach((item) => {
        //     AxiosClient.post('/tables/mupgt2edzfgbrot/records', {
        //         title: item.title,
        //         description: item.description,
        //         content: item.content,
        //         image: item.image,
        //         url: item.url,
        //         timestamp: item.timestamp,
        //         published: item.published ? 'true':'false',
        //     })
        // });
        if(news?.length <= 0){
            return;
        }
        AxiosClient.post('/tables/mupgt2edzfgbrot/records', news.map(item => {
            return {
                title: item.title,
                description: item.description,
                content: item.content,
                image: item.image,
                url: item.url,
                timestamp: item.timestamp,
                type: item.type,
                published: item.published ? 'true':'false',
            }
        }));
    }

    static getLatestUnpublishedNews = async (type='general') => {
        return AxiosClient.get('/tables/mupgt2edzfgbrot/records', {
            params: {
                where: `(published,eq,false)~and(type,eq,${type})`, 
                viewId: 'vwntuqoia6tcnwy7',
                sort: '-timestamp',
                limit: 5,
            }
        }).then(resp => {
            return resp.data;
        })
    }

    static setNewsPublished = async (id, published) => {
        return AxiosClient.patch(`/tables/mupgt2edzfgbrot/records`, {
            Id: id,
            published: published? 'true':'false',
        });
    }

    /**
     * clean outdate news (>24 hours)
     * @returns 
     */
    static cleanOutdatedNews = async () => {
        const currentTimestamp = new Date().getTime();
        const outdateTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;

        const resp = await AxiosClient.get('/tables/mupgt2edzfgbrot/records', {
            params: {
                where: `(timestamp,lt,${outdateTimestamp})`, 
                viewId: 'vwntuqoia6tcnwy7',
                limit: 10000,
            }
        })

        const deleteIds = resp.data?.list?.map(item => {
            return {
                Id: item.Id,
            }
        }) ?? [];

        return AxiosClient.delete('/tables/mupgt2edzfgbrot/records', {
            data: deleteIds
        })
    }

    static getWeiboToken = async () => {
        return AxiosClient.get('/tables/mrc3u0ys1mj9v79/records', {
            params: {
                viewId: 'vwxdyg8jwckvj1kl',
            }
        }).then(resp => {
            return resp.data?.list?.[0]?.cookie;
        })
    }
}

export { DBManager }