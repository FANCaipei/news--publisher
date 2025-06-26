import axios from "axios";

const dbToken = process.env.DB_TOKEN;
const newsTableId = process.env.NEWS_TABLE_ID;
const weiboCookieTableId = process.env.WEIBO_COOKIE_TABLE_ID;

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
        if(news?.length <= 0){
            return;
        }
        news?.forEach(async (item) => {
            const resp = await AxiosClient.get(`/tables/${newsTableId}/records`, {
                params: {
                    where: `(title,eq,${item.title})`,
                    limit: 5,
                }
            });
            if(!resp.data?.list?.length){
                AxiosClient.post(`/tables/${newsTableId}/records`, {
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    image: item.image,
                    url: item.url,
                    timestamp: item.timestamp,
                    type: item.type,
                    published: item.published ? 'true':'false',
                });
            }
        });
    }

    static getLatestUnpublishedNews = async (type='general') => {
        return AxiosClient.get(`/tables/${newsTableId}/records`, {
            params: {
                where: `(published,eq,false)~and(type,eq,${type})`, 
                // viewId: 'vwntuqoia6tcnwy7',
                sort: '-timestamp',
                limit: 5,
            }
        }).then(resp => {
            return resp.data;
        })
    }

    static setNewsPublished = async (id) => {
        return AxiosClient.patch(`/tables/${newsTableId}/records`, {
            Id: id,
            published: 'true',
        });
    }

    static setNewsPublishedWithTitle = async (title) => {
        const resp = await AxiosClient.get(`/tables/${newsTableId}/records`, {
            params: {
                where: `(title,eq,${title})`, 
                // viewId: 'vwntuqoia6tcnwy7',
                limit: 10000,
            }
        })

        const updateRows = resp.data?.list?.map(item => {
            return {
                Id: item.Id,
                published: 'true',
            }
        }) ?? [];

        return AxiosClient.patch(`/tables/${newsTableId}/records`, updateRows);
    }

    /**
     * clean outdate news (>24 hours)
     * @returns 
     */
    static cleanOutdatedNews = async () => {
        const currentTimestamp = new Date().getTime();
        const outdateTimestamp = currentTimestamp - 24 * 60 * 60 * 1000;

        const resp = await AxiosClient.get(`/tables/${newsTableId}/records`, {
            params: {
                where: `(timestamp,lt,${outdateTimestamp})`, 
                // viewId: 'vwntuqoia6tcnwy7',
                limit: 10000,
            }
        })

        const deleteIds = resp.data?.list?.map(item => {
            return {
                Id: item.Id,
            }
        }) ?? [];

        return AxiosClient.delete(`/tables/${newsTableId}/records`, {
            data: deleteIds
        })
    }

    static getWeiboToken = async () => {
        return AxiosClient.get(`/tables/${weiboCookieTableId}/records`, {
            // params: {
            //     viewId: 'vwxdyg8jwckvj1kl',
            // }
        }).then(resp => {
            return resp.data?.list?.[0]?.cookie;
        })
    }
}

export { DBManager }