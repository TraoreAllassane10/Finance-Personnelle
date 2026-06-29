import { motion } from "framer-motion";

const ChatWindow = ({ onClose }) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                y: 40,
                scale: 0.9,
            }}
            transition={{
                duration: 0.25,
            }}
            className="fixed bottom-24 right-6 h-[650px] w-[390px] overflow-hidden rouded-3xl border bg-white shadow-2xl"
        >
            <div className="h-full flex items-center justify-center">
                <h2>Conseiller IA</h2>
            </div>
        </motion.div>
    );
};

export default ChatWindow;
