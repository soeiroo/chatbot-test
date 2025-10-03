import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Variáveis do ambiente
const INSTANCE_ID = process.env.CHATPRO_INSTANCE_ID; // ex: chatpro-no3klw7pt3
const TOKEN = process.env.CHATPRO_TOKEN; // ex: 175d67453dab88d176bc6fa40d07cdc8

app.post("/send-message", async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "Número e mensagem são obrigatórios" });
  }

  try {
    // Axios igual ao curl que funcionou
    const response = await axios({
      method: "post",
      url: `https://v5.chatpro.com.br/${INSTANCE_ID}/api/v1/send_message`,
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": TOKEN,
      },
      data: {
        number,
        message
      }
    });

    const data = response.data;

    if (data.status === true) {
      return res.json({
        status: true,
        message: "Mensagem enviada com sucesso!",
        id: data.resposeMessage?.id
      });
    } else {
      return res.status(400).json({
        status: false,
        message: data.message || "Erro ao enviar a mensagem"
      });
    }

  } catch (err) {
    console.error("Erro ChatPro:", err.response?.data || err.message);
    return res.status(err.response?.status || 500).json(err.response?.data || { error: err.message });
  }
});

app.listen(3001, () => console.log("✅ Backend rodando em http://localhost:3001"));
