import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const agent = new HttpsProxyAgent('http://localhost:8001');

const API_KEY = 'c2ef648b6eacc1574da65f402df4f563';

// api doc https://gnews.io/docs/v4#top-headlines-endpoint
const Axios = axios.create({
    baseURL: 'https://gnews.io/api',
    httpsAgent: agent,
    params: {
        apikey: API_KEY,
    }
})

/**
 * 
 * @param {*} type // general, world, nation, business, technology, entertainment, sports, science and health
 * @returns 
 */
export const getTopNews = async (type='general') => {
    try {
        const response = await Axios.get('/v4/top-headlines', {
            params: {
                category: type, // general, world, nation, business, technology, entertainment, sports, science and health
                lang: 'zh',
                country: 'cn',
            },
        })
        return response.data;
    } catch (error) {
        console.error(error)
    }
}