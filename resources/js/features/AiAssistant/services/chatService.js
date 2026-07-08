import axios from "axios";

class ChatService {
    async sendMessage(message) {
        try {
            const response = await axios.post("/chat", { message });

            return response.data;
        } catch (error) {
            console.log(
                "Erreur dans features/AiAssistant/services/chatServices",
                error,
            );
        }
    }
}

export default new ChatService();
