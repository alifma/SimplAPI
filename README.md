# SimplAPI
Sample of Simple API so you don't have to create rest-api if you want to learn Frontend or Testing

## Table of Contents

- [About](#about)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## About
SimplAPI is a simple api written on javascript that can be running locally in purpose of learning to create frontend application or unit testing and documentation. Feel free to use it, or fork it to make your own version.

## Dependencies

List the main dependencies your project relies on
- bcrypt@5.1.1
- body-parser@1.20.2
- dotenv@16.3.1
- express@4.18.2
- jest@29.7.0
- jsonwebtoken@9.0.2
- sequelize@6.33.0
- sqlite3@5.1.6
- supertest@6.3.3


## Getting Started

### Installation

Provide instructions on how to install your project, including any dependencies. For example:

```bash
# Clone this repository
git clone https://github.com/alifma/SimplAPI.git

# Navigate to the project directory
cd SimplAPI

# Install required dependencies
npm install

# Clone the env sample
cp .env.development .env

# Run the project, server will be available on port 3000
npm start
# Server is running on port 3000
```

### Configuration
You may changes the configuration such as secret_key, jwt expire time, and port of the application by using the env files
```bash
SECRET_KEY=your-secret-key
JWT_EXPIRATION=86400
PORT=8081
```