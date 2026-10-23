---
title: "Hobby AI Setup"
date: 2025-10-16
status: released
tags: [AI, Ollama, OpenRouter, Coding]
---

# Hobby Coding AI Setup

Alright, I cannot go past it: AI is growing so big in coding that I cannot go past it. So instead of fighting, trying to understand it seemed a wiser option to me. So, why not applying it to my hobby coding?

## Architecture

### Requirements

A hobby setup cannot compare with a professional-grade setup: not only is the budget a key factor, it is also overkill for most of our needs. So here we go. The setup must:

- Be installable and usable in both Windows and Linux environments
- Be shared between multiple users in Windows environments
- Support free open-weight models or support very low-cost models
- Provide on-demand access to cutting-edge flagship models such as the latest Claude Code or Codex models. However, the default mode would rely on the free models
- Have a CLI interface
- Provide guardrails in case of mistakes with easy rollbacks

As a nice-to-have, the setup could:

- Support local models or at least having a strong focus on privacy
- Be accessible from VS Code

### Plan

Ollama and OpenRouter are the cornerstone of the overall setup:

- [Ollama](https://ollama.com/) provides access to the free open-weight models ([List of local models supported by Ollama](https://ollama.com/search?c=local)). This will keep cost low and ensure privacy
- [OpenRouter](https://openrouter.ai/) provides access to flagship models without vendor lock-in. With a pay-as-you-go pricing, the setup can easily switch between Claude Code or Codex. While there is a platform fee (5.5% as of October 2026), it does not significantly impact the total pricing considering my low usage

Two interfaces will be added to interact with the models:

- [Cline VS Code extension](https://cline.bot/ide) for direct editing in VS Code
- [Aider CLI](https://aider.chat) for an all-rounder CLI interface

The considered models, as of October 2026, are:

- Flagship models: [Claude Sonnet 5](https://openrouter.ai/anthropic/claude-sonnet-5) or [GPT 5.6 Sol](https://openrouter.ai/openai/gpt-5.6-sol)
- Privacy-oriented: [Mistral Medium 3.5](https://openrouter.ai/mistralai/mistral-medium-3-5)
- Local models: [Qwen 3.5 family](https://ollama.com/library/qwen3.5) (0.8B, 4B and 8B)

## Setup

### Pre-requisites

On a Windows 11 machine, Node and Python need to be installed first.

**Node.js**

I don't use many programming languages for my hobby coding. While I use [ASDF](https://asdf-vm.com/) at work, I will stick to a simple [NVM for Windows setup](https://www.nvmnode.com/).

- Download NVM installer from https://www.nvmnode.com/guide/download.html and install it (https://www.nvmnode.com/guide/installation.html). I downloaded the 2.0.0 version.
- Check the basic commands if needed on https://www.nvmnode.com/guide/usage.html
- Install the latest LTS or a specific version. I personally installed Node v26.10.0: `nvm install 26.10.0`
- Use it: `nvm use 26.10.0`.
- Check the installation with `node --version`. Restart PowerShell if needed

**Python**

- Install with `winget`:

    ```sh
    winget install Python.Python.3.12
    ```

    <details>
    <summary>Using winget makes Python upgrade easier</summary>

    ``` 
    # Check what you have installed
    winget list Python

    # See available upgrades (all winget packages)
    winget upgrade

    # Upgrade Python specifically
    winget upgrade Python.Python.3.12
    ```

    Note: Moving between major versions (3.12 → 3.13) is NOT an upgrade — it's a new install:

    ```
    winget install Python.Python.3.13
    ```

    Such major version upgrade requires a re-installation of Aider
    </details>

### Ollama

**Installation**

- Check the Windows installation guide: https://docs.ollama.com/windows.
- Install Ollama from https://ollama.com/download. 
  
  I personally picked the manual installer so that I can install it into a shared location:

  ```sh
  ./OllamaSetup.exe /DIR="C:\Program Files\Ollama"
  ```

  This is required to have Ollama installed in a shared location across Windows users

  > PowerShell must run in administrator mode for this.

- Create a folder to store downloaded Ollama models. I created `C:\Ollama\Models`
- Setup the Ollama models location to the newly created folder
  - Change via environment variable (https://docs.ollama.com/windows#changing-model-location)
  - Change via the Ollama Setting (Right click on the Ollama tray icon > Settings > Model location)
- Restart Ollama

**Pull a model**

- Check the available local models: https://ollama.com/search?c=local
- Ensure your device supports the model
  - As a reference, assume the entire model size dumped into VRAM (Video RAM). So a 4GB download will roughly consume 4GB from your GPU. The key metrics are the number of parameters involved. To read more: https://plugable.com/blogs/news/gpu-vram-requirements-for-local-llms-plugable-guide.
  - If your GPU is a Nvidia, check your VRAM usage with `nvidia-smi`. A useful display is:

    ```sh
    nvidia-smi --query-gpu=memory.total,memory.used,memory.free --format=csv
    ```

    With a qwen3.5 4B running, an example is:

    ```
    memory.total [MiB], memory.used [MiB], memory.free [MiB]
    8151 MiB, 4626 MiB, 3266 MiB
    ```
  - Use the "Download size" filter from Ollama 
- Pull it:

    ```sh
    ollama pull qwen3.5:0.8b
    ```
- Test the model

  - Run it 

    ```
    ollama run qwen3.5:0.8b
    ```

    Type any prompt and a response should appear. If your device does not support it, an error will be thrown while attempting to run the model.

    Use the following command to monitor the currently active models:

    ```
    ollama ps
    ```
  - Open the Ollama Chat (Right click on the Ollama tray icon > Open Ollama > Select the "Chat" tab > pick the pulled model) and input a prompt

### OpenRouter

- Sign up for a new account https://openrouter.ai/
- If necessary, top up your credit.
- Open the dashboard ([link](https://openrouter.ai/workspaces/default/keys)) and create an API key

### Cline extension

- Install Cline from the extension menu in VS Code ([link](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)). Alternatively, install it from https://cline.bot/ide in your favourite IDE.
- Open the Cline settings
- Connect it with the models (https://docs.cline.bot/getting-started/authorizing-with-cline#ide-setup)
  - *Ollama*:
    - Select "Ollama" in API Provider
    - Select the model
  - *OpenRouter*:
    - Select "OpenRouter" in API Provider
    - Input your OpenRouter API Key
    - Select your desired model. Beware, costs may be incurred.
- You are ready to go!
  - For additional safety, start with "Plan" mode with the bottom right toggle to avoid undesired changes

### Aider

- Check the [installation guide](https://aider.chat/docs/install.html) and [Ollama setup](https://aider.chat/docs/llms/ollama.html#ollama).
- Install Aider:

    ```sh
    python -m pip install aider-install
    aider-install
    ```
- Configure the Ollama endpoint

    ```sh
    setx   OLLAMA_API_BASE http://127.0.0.1:11434
    ```

- Restart the shell if needed
- Move to your repository location

    ```sh
    cd <your_repository>
    ```
- Start Aider
  
    ```sh
     aider --model ollama_chat/qwen3.5:4b --chat-language english
    ```

## Workflow

The simple setup uses Cline + Ollama + Qwen family model, which is sufficient to revamp my personal website. However, the architecture was set up using Claude Code.

Aider is involved when multiple files are edited, such as a refactoring, or a non VS Code action (e.g. raw JSON file manipulation) is required.

As for OpenRouter, it is only used when flagship models are required.

## Next steps

Now that the AI coding setup is completed, the Pandora box is opened:

- What about daily chat such as https://chat.mistral.ai? 
- What about LLM-powered knowledge base as presented by Tina Huang in the [video](https://www.youtube.com/watch?v=4Hvkv_I8QDE)
- What about always-on agents such as [Hermes](https://hermes-agent.nousresearch.com/) or [OpenClaw](https://openclaw.ai/)
