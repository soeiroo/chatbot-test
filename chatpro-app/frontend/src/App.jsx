import React, { useState } from "react";
import { sendMessage } from "./api";

function App() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    setStatus("⏳ Enviando...");
    try {
      const data = await sendMessage(phone, message);

      if (data.status) {
        setStatus(`✅ Mensagem enviada! ID: ${data.id}`);
      } else {
        setStatus(`⚠️ Erro: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Erro ao enviar mensagem. Verifique o backend e o WhatsApp conectado.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📩 Enviar mensagem via ChatPro</h1>
      <input
        type="text"
        placeholder="Número (ex: 5588999999999)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "300px" }}
      />
      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ display: "block", marginBottom: "1rem", width: "300px", height: "100px" }}
      />
      <button onClick={handleSend}>Enviar</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
