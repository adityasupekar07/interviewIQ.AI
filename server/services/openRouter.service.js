import axios from "axios"
export const askAi = async (messages) => {
    try {
        if (!message || Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty")
        }
        const responce = axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: 'openai/gpt-5.2',
            messages: messages
        },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        )

        const content = responce?.data?.choices?.[0]?.message?.content;
        if (!content || !content.trim()) {
            throw new Error("AI returned empty responce.");
        }
        return content;
    } catch (err) {
        console.error("openrouter error:", error.responce?.data || error.message);
        throw new Error("openrouter api error");
    }
}