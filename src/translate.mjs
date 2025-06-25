import axios from "axios";

const LocalOllamaAxios = axios.create({
    baseURL: 'http://localhost:11434',
})

const modelName = 'llama3:8b';

export const translateToZh = async (text) => {
    try {
        const response = await LocalOllamaAxios.post('/api/chat', {
            model: modelName,
            "messages": [
                {
                "role": "system", //"system" is a prompt to define how the model should act.
                "content": "you are a salty pirate" //system prompt should be written here
                },
                {
                "role": "user", //"user" is a prompt provided by the user.
                "content": "why is the sky blue" //user prompt should be written here
                }
            ],
            "stream": false
        })
    }catch (error) {
        console.error(error)
    }
}