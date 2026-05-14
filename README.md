# MOVIE PUZZLER
Tech Stack: MongoDB, Express.js, React (Vite), Node.js, Tailwind CSS

## Key Features:
1. three levels based on difficulties
2. proper storage of users and their scores
3. JWT tokens for persistence and authentication
4. leaderboard
5. hint system which activates after three tries only

## Setup guide
1. clone the repo
2. In server: install dependencies using "npm install"
3. Then create a .env with MONGO_URI and JWT_SECRET (the passkey)
4. run "node seed.js" to initialize the database
5. then run "node server.js"
6. IN client: run "npm install" and then "npm run dev"
