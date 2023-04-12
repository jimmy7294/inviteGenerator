const form = document.getElementById("message-form");
const messageContainer = document.getElementById("message-container");
   
document.getElementById("time").style.display = "none";
document.getElementById("place").style.display = "none";

// fetch an interesting science fact from the API when the page loads with an element with id="science-fact"
async function fetchScienceFact() {
  const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
  const data = await response.json();
  document.getElementById("science-fact").innerHTML = "Once a upon a time, a wise man in Kaari said: "+ data.text;
}
// run the function when the page loads
fetchScienceFact();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // hide the element with id = "science-fact"
  document.getElementById("science-fact").style.display = "none";
  form.style.display = "none";
  const name = event.target.name.value;
  const actor = event.target.actor.value;
  const language = event.target.language.value;    
  const message = {
    role: "user",
    content: `Craft a funny message to ${name} as a character of ${actor} (anything even fictional character) inviting ${name} to a get-together night because you have not seen them for a long time and they are missed. 
    The message needs to be written in ${language} encapsulates the character, the more the better.`,
  };

  const apiKey = "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";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [message],
      temperature: 1,
      max_tokens: 200,
    }),
  });
  const result = await response.json();
  messageContainer.innerHTML = result.choices[0].message.content;
  document.getElementById("time").style.display = "block";
  document.getElementById("place").style.display = "block";
});

