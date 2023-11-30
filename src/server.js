require('dotenv').config();
const express = require('express')
require("./db/conn")
const path = require('path')
const cors = require('cors');
const userRouter = require('./routers/users');
const authRouter = require('./routers/auth');
const extapiRouter = require('./routers/extapis');
const campaignRouter = require('./routers/campaigns');
const chapterRouter = require('./routers/chapters');
const videoRouter = require('./routers/videos');
const cookieParser = require('cookie-parser');
// const { urlencoded } = require('express');

const app = express()
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.enable('trust proxy')
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(userRouter);
app.use(campaignRouter);
app.use(chapterRouter);
app.use(videoRouter);
app.use(authRouter);
app.use(extapiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Express api server is listening on port:${port}`);
})