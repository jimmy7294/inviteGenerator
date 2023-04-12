const form = document.getElementById("message-form");
const messageContainer = document.getElementById("message-container");
   
document.getElementById("time").style.display = "none";
document.getElementById("place").style.display = "none";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  form.style.display = "none";
  const name = event.target.name.value;
  const actor = event.target.actor.value;
  const language = event.target.language.value;
  const message = {
    role: "user",
    content: `Craft a funny message to ${name} as a character of ${actor} (anything even fictional character) inviting ${name} to a get-together night because you have not seen them for a long time and they are missed. 
    The message needs to be written in ${language} and encapsulates the character the more the better.
    Example:
    name=Jim, actor=Donald Trump, language=English
    "Hello there, Jim! It's been a tremendous amount of time since we last crossed paths. Believe me, everyone's been talking about how much they miss your company. So, I, Donald J. Trump, cordially invite you to an evening of tremendous entertainment and luxurious indulgence. We'll have the best champagne, the best caviar, and the best chocolate cake you've ever tasted. And don't worry, we'll make sure to build a wall around the party so that only the very best people can attend. So, what do you say, Jim? Are you ready to make this party great again?"`,
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
      max_tokens: 150,
    }),
  });
  const result = await response.json();
  messageContainer.innerHTML = result.choices[0].message.content;
  document.getElementById("time").style.display = "block";
  document.getElementById("place").style.display = "block";
});

