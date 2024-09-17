
# Github Interpreter

GitHub Interpreter is a MERN-based web application, enhanced with Generative AI capabilities, designed to simplify and enhance the process of code analysis, debugging, and code generation by allowing users to input GitHub repository links directly. This system efficiently identifies errors, automates debugging processes, and generates accurate code summaries, making it particularly beneficial for developers working on open-source projects, collaborative coding environments, or those needing quick insights into codebases.

## Features

- **Automated Code Analysis**: Extracts and analyzes code from GitHub repositories, identifying potential issues and providing solutions.
- **Debugging Automation**: Streamlines the debugging process, automating common fixes to improve efficiency.
- **Code Generation & Summarization**: Leverages Generative AI to generate relevant code snippets and deliver concise summaries for faster comprehension.
- **Secure Authentication**: Implements a robust user authentication system, including auto-login with refresh and auth tokens for an enhanced user experience.

## Installation

```bash
npm install // both in server and client
git clone https://github.com/code-inhub/Github-Interpreter.git
cd server
npm run dev
```
    
## Screenshots
![Screenshot 2024-09-17 013205](https://github.com/user-attachments/assets/08ca6417-cd3d-4831-8ed1-1c200a4433e0)

![Screenshot 2024-09-17 144257](https://github.com/user-attachments/assets/5dafb548-8b9e-4298-bf58-dd03dfe695db)

![Screenshot 2024-09-17 145006](https://github.com/user-attachments/assets/146e5c60-8700-49cf-a94a-cf5854c2c040)

![Screenshot 2024-09-17 144612](https://github.com/user-attachments/assets/837c7a77-af66-4084-a2b0-93876025ab3f)
![Screenshot 2024-09-17 144600](https://github.com/user-attachments/assets/7e90b88e-1376-4790-b933-0611d50f7d20)
![Screenshot 2024-09-17 144349](https://github.com/user-attachments/assets/2196154d-f1b4-4fae-b143-7365fe683193)

## Tech Stack

**Client:** React, TailwindCSS  
**Server:** Express  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens)  
**AI Integration:** OpenAI, Custom LLM with Ollama  
**Version Control:** Git, GitHub

## Future Optimizations

- **Custom LLM Integration**: Replacing third-party APIs with a custom LLM using Ollama to reduce costs and tailor the model for specific project needs.
- **Enhanced Debugging**: Improve error detection and debugging recommendations using machine learning.
- **Scalability**: Optimize the system for handling multiple simultaneous requests efficiently.
- **Security Upgrades**: Implement advanced security protocols like OAuth and multi-factor authentication.

## Contribution Guidelines  

1. Fork the repository.
 2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
 4. Submit a pull request.
