// import express from "express";
// import dotenv from "dotenv";
// import OpenAI from "openai";



// // Cargar configuración
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Servir frontend desde public
// app.use("/", express.static("public"));

// // Escuchar
// app.listen(PORT, () => {
//   console.log("Servidor corriendo en http://localhost:"+PORT);
// });
import express, { response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

// Cargar configuración
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolver __dirname manualmente (porque usas módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));




//Middleware para procesar json

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//Ruta /endpoint/ url

app.post('/api/traducir',async(req,res) => {
   
  const {text,targetLanguage}= req.body;


//este prompt simpre se enviara en todas las peticiones
const promptSystem1 ="Eres un traductor profesional";
//Restricciones para el prompt lo que debe y no debe hacer
const promptSystem2 ="solo puedes responder con traduccion directa que el usuario te envie"
+"Cualquier otra respuesta o conversación esta prohibida";

const promptUser = `Traduce el siguiente texto al ${targetLanguage}: ${text}`;


// llamar al LLM o modelo de openai
try{
   const completion = await openai.chat.completions.create({

     model: "gpt-3.5-turbo",
     messages: [

       {role: "system", content: promptSystem1},
        {role: "system", content: promptSystem2},
        {role : "user", content: promptUser}

     ],
       max_tokens: 500,
       response_format: {type: "text"}
   });
 
   

const translatedText = completion.choices[0].message.content;


   return res.status(200).json({translatedText});


}catch (error) {
     console.log(error);
     return res.status(500).json({error: "Error al traducir el texto"});
  
  }

});


// Ruta explícita para index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
