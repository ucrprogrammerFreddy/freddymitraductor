

document.querySelector("#translateButton").addEventListener("click", async () => {


let inputText = document.querySelector("#inputText");


  const text = document.querySelector("#inputText").value.trim();
  const targetLang = document.querySelector("#targetLang").value;

  if (!text) return;

  // Crear y mostrar el mensaje del usuario
  const userMessage = document.createElement("div");
  userMessage.className = "chat-message user";
  userMessage.textContent = text;

  const messagesContainer = document.querySelector(".chat-messages");
  messagesContainer.appendChild(userMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Limpiar el input
  document.querySelector("#inputText").value = "";

  // Hacer la petición al backend
  try {
    const response = await fetch("/api/traducir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLanguage: targetLang })
    });

    const data = await response.json();

    const botMessage = document.createElement("div");
    botMessage.className = "chat-message bot";
    botMessage.textContent = data.translatedText || "Error en la traducción.";

    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

  } catch (err) {
    console.error("Error al traducir:", err);
  }
});


// peticiones AJAX al Bckend

// try {

//      const response = await fetch("/api/traducir", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ 
//             text,targetLang
//          })

//        });

//       const data = await response.json();
//          alert(data.translatedText);


// }catch(error) {

//  console.log("Error:" ,error);

// }