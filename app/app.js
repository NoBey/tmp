const Koa = require("koa");
const Router = require("koa-router");
const path = require("path");
const fs = require("fs").promises;
const { readFileSync } = require("fs");
const { koaBody } = require("koa-body");
const app = new Koa();
const router = new Router();
const generatePreview = require("ffmpeg-generate-video-preview");
const Replicate = require("replicate");
const fetch = require("cross-fetch");
const { Configuration, OpenAIApi } = require("openai");
const { apiKey, REPLICATE_API_TOKEN, PROT } = require("../.key");
const https = require('https');


const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

router.get("/", async (ctx) => {
  ctx.body = {
    data: "hello nobey",
  };
});

router.post("/img2text", koaBody({ multipart: true }), async (ctx) => {
  const file = ctx.request.files.file;

  const filePath = path.join(__dirname, "uploads", `${Math.random() * 999}_${file.originalFilename}`);

  try {
    await fs.mkdir(path.join(__dirname, "uploads"));
    console.log(`Created directory: ${path.join(__dirname, "uploads")}`);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  await fs.copyFile(file.filepath, filePath);
  console.log(`Saved file: ${filePath}`);

  const data = await fs.readFile(filePath);
  // Convert the buffer into a base64-encoded string
  const base64 = data.toString("base64");
  // Set MIME type for PNG image
  const mimeType = "image/png";
  // Create the data URI
  const dataURI = `data:${mimeType};base64,${base64}`;

  const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN, //process.env.REPLICATE_API_TOKEN,
    fetch,
  });

  const output = await replicate.run(
    // "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
    "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
    {
      input: {
        image: dataURI,
      },
    }
  );

  console.log("图片内容", output);

  ctx.body = { msg: "ok", data: output };
  
});

router.get("/gpt", async (ctx) => {
  const { prompt } = ctx.request.query;
  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  ctx.status = 200;
  ctx.type = "application/json";
  ctx.body = { msg: "ok", data: completion.data.choices[0].text };

});

router.post("/upload", koaBody({ multipart: true }), async (ctx) => {
  console.log(">>>>", ctx.request.files.file);
  const file = ctx.request.files.file;

  const filePath = path.join(__dirname, "uploads", file.originalFilename);

  try {
    await fs.mkdir(path.join(__dirname, "uploads"));
    console.log(`Created directory: ${path.join(__dirname, "uploads")}`);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }

  await fs.copyFile(file.filepath, filePath);
  console.log(`Saved file: ${filePath}`);

  await generatePreview({
    input: filePath,
    output: path.join(__dirname, "uploads", "preview.jpg"),
    width: 500,
  });

  const data = await fs.readFile(
    path.join(__dirname, "uploads", "preview.jpg")
  );
  // Convert the buffer into a base64-encoded string
  const base64 = data.toString("base64");
  // Set MIME type for PNG image
  const mimeType = "image/png";
  // Create the data URI
  const dataURI = `data:${mimeType};base64,${base64}`;

  //   const input = {
  //     image: dataURI,
  //   };
  const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN, //process.env.REPLICATE_API_TOKEN,
    fetch,
  });

  const output = await replicate.run(
    // "methexis-inc/img2prompt:50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
    "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
    {
      input: {
        image: dataURI,
      },
    }
  );

  console.log("图片内容", output);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${output}
  把上面的内容翻译成中文, 使用关键内容写一篇文案, 使用中文回复, 200字
  `,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(completion.data.choices);

  ctx.status = 200;
  ctx.type = "application/json";
  ctx.body = {
    msg: "File uploaded successfully.",
    data: completion.data.choices[0].text,
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PROT, () =>
  console.log("Server is running at http://localhost:" + PROT)
);



try{
  const options = {
    key: readFileSync('/root/.acme.sh/ss4.nobey.cn_ecc/ss4.nobey.cn.key'),
    cert: readFileSync('/root/.acme.sh/ss4.nobey.cn_ecc/ss4.nobey.cn.cer'),
    ca: [ readFileSync('/root/.acme.sh/ss4.nobey.cn_ecc/ca.cer') ]
  };
  
  // https.createServer(options, app.callback()).listen(443);
}
catch(err){
  console.log('https err', err)
}


// [Wed Jun  7 04:25:12 UTC 2023] Your cert is in: /root/.acme.sh/ss4.nobey.cn_ecc/ss4.nobey.cn.cer
// [Wed Jun  7 04:25:12 UTC 2023] Your cert key is in: /root/.acme.sh/ss4.nobey.cn_ecc/ss4.nobey.cn.key
// [Wed Jun  7 04:25:12 UTC 2023] The intermediate CA cert is in: /root/.acme.sh/ss4.nobey.cn_ecc/ca.cer
// [Wed Jun  7 04:25:12 UTC 2023] And the full chain certs is there: /root/.acme.sh/ss4.nobey.cn_ecc/fullchain.cer


