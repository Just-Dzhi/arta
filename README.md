# arta

Simple discord bot with AI and commands ^^

![arta](./arta.jpg)

---

# installation

1. clone the repository:

    `git clone https://github.com/Just-Dzhi/arta.git`

    `cd arta`

2. install the dependencies: `npm install`

3. build the project: `npm run build`

4. edit .env file: `cp .env.example .env` and then replace values with your own.

5. run the bot: `npm run launch`

---

# llama.cpp backend

The key feature of this bot is support for llama.cpp and launching LLM models, with which you can communicate simply by pinging the bot in discord.

Honestly, it is difficult for me to correctly describe all the installation steps, but below there will be instructions.

1. install llama.cpp binary from https://github.com/ggerganov/llama.cpp

2. unzip all files and place them in the project directory like this: arta/llama.cpp

3. create a launch script for your OS, in my case .bat and it looks like this:
`.\llama.cpp\llama-server -m YourModel.gguf -ngl 24 --mlock --ctx-size 2048 --temp 0.6`

    You can read more about launch parameters here:
    https://github.com/ggerganov/llama.cpp/blob/master/examples/main/README.md

4. You can modify arta/modelPrompt.txt to change the model behavior. Want a penguin? Write about it. Want a llama? Write about it. Want a cute girl? Write about it.

5. Run the script that will launch llama-server and ping the bot on the server by writing something to it, it will answer you.