import axios from "axios";

class ChatService {
    async sendMessage(message) {
        const response = await axios.post("/api/chat", {message});

        return response.data;
    }
}

export default new ChatService();
