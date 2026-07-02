touch server.js README.md .env .env.example 
echo "node_modules/" > .gitignore 
echo ".env" >> .gitignore 

mkdir controllers middleware models utils constantes views 
npm init -y
npm install -D nodemon dotenv
npm install express
# git init
