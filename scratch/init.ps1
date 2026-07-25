cd c:\skillnexis
mkdir -Force week3\image-upload-app\backend
cd week3\image-upload-app\backend
npm init -y
npm install express multer cors mongoose

cd c:\skillnexis
npm create vite@latest week3/image-upload-app/frontend -- --template react

cd c:\skillnexis
mkdir -Force week3\task-manager\backend
cd week3\task-manager\backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv

cd c:\skillnexis
npm create vite@latest week3/task-manager/frontend -- --template react

cd c:\skillnexis\week3\todo-frontend
npm install axios react-router-dom
npm install
