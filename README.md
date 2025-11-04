# 🧠 Philosobot — A Chatbot for Thoughtful Conversations

**Philosophbot** is an intelligent chatbot designed to engage in meaningful conversations — especially about **philosophy** — while remaining conversational and human-like on general topics.  

Built with **Flask**, **React**, **Docker**, and powered by **LLaMA-based models** using **Groq API**, this project demonstrates a clean and scalable setup for an AI-driven application.

---

## 🚀 Features

- 💬 **Conversational Chatbot:** Naturally interacts with users; shifts into philosophical mode when asked.  
- 🦙 **Groq + LLaMA Integration:** Uses Groq’s optimized large language models for low-latency inference.  
- 🌐 **Full-Stack Setup:** Flask backend with a React frontend, containerized with Docker.  



---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Valadis-Mastoras/PhilosoBOT.git
```

### 2. Create a .env File

In the project root, create a .env file

### 3. Build and Run with Docker Compose

```bash
docker-compose up --build
```

Backend runs on http://localhost:5000

Frontend runs on http://localhost:5001