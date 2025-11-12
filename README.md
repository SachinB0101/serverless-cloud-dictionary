# Cloud Dictionary Application

Live Demo: [https://main.d1utiqi17bjp3v.amplifyapp.com](https://main.d1utiqi17bjp3v.amplifyapp.com)

A **serverless cloud dictionary application** that allows users to explore and learn cloud technology terms. Built with AWS serverless services and a React frontend, this project provides a fast, scalable, and easy-to-use platform for accessing cloud-related definitions.

## Features

- **Search Cloud Terms**: Quickly find definitions for terms related to cloud technologies.  
- **View Definitions**: Access detailed explanations for each cloud term.  
- **Serverless Architecture**: Leverages AWS services for scalability and low maintenance.  
- **Batch Data Upload**: Efficiently write multiple terms and definitions to DynamoDB using batch operations.  

## Architecture

The project is designed using a **serverless architecture**:

- **Backend**:  
  - **AWS Lambda**: Handles all API logic and processing.  
  - **Amazon DynamoDB**: Stores dictionary terms and their definitions.  
  - **Batch Operations**: Enables bulk writing of dictionary terms into DynamoDB.  
  - **API Gateway**: Exposes API endpoints to the frontend.  

- **Frontend**:  
  - **React.js** application hosted on **AWS Amplify**.  
  - Communicates with backend via the API endpoints deployed through Amplify.  

## Tech Stack

- **Frontend**: React.js, AWS Amplify  
- **Backend**: AWS Lambda, API Gateway  
- **Database**: Amazon DynamoDB  
- **Hosting**: AWS Amplify  

## Getting Started

### Prerequisites

- Node.js and npm installed  
- AWS account with Amplify, Lambda, and DynamoDB access  
- Amplify CLI installed (`npm install -g @aws-amplify/cli`)  

### Setup

1. **Clone the repository**  
   ```bash
   git clone <your-repo-url>
   cd serverless-cloud-dictionary
