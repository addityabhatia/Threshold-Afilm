const scenes = [
  {title: "Mask", lines: [
    {speaker: "A", text: "I wear a version of myself.", style: "a-stylish"},
    {speaker: "B", text: "That mask doesn’t fit.", style: "b-line"},
    {speaker: "A", text: "It’s not for me. It’s for the crowd.", style: "a-stylish"},
    {speaker: "B", text: "Funny thing—no one’s watching.", style: "b-line"}
  ]},
  {title: "Race", lines: [
    {speaker: "A", text: "I run. Always run.", style: "a-stylish"},
    {speaker: "B", text: "From what?", style: "b-line"},
    {speaker: "A", text: "The mirror.", style: "a-stylish"},
    {speaker: "B", text: "Careful. Even the finish line reflects.", style: "b-line"}
  ]},
  {title: "Control", lines: [
    {speaker: "B", text: "You’re gripping the wheel too hard.", style: "b-line"},
    {speaker: "A", text: "If I let go, I crash.", style: "a-normal"},
    {speaker: "B", text: "If you hold on, you strangle yourself.", style: "b-line"},
    {speaker: "A", text: "So either way, I lose?", style: "a-normal"},
    {speaker: "B", text: "That’s the game.", style: "b-line"}
  ]},
  {title: "Silence", lines: [
    {speaker: "A", text: "…say something.", style: "a-normal"},
    {speaker: "B", text: "You’re loud enough.", style: "b-line"},
    {speaker: "A", text: "That was cruel.", style: "a-normal"},
    {speaker: "B", text: "That was honest.", style: "b-line"}
  ]},
  {title: "Awakening", lines: [
    {speaker: "A", text: "It’s all… empty.", style: "a-normal"},
    {speaker: "B", text: "Now you see it.", style: "b-line"},
    {speaker: "A", text: "So what fills it?", style: "a-normal"},
    {speaker: "B", text: "That’s your joke to write.", style: "b-line"}
  ]},
  {title: "Choice", lines: [
    {speaker: "B", text: "So, what now?", style: "b-line"},
    {speaker: "A", text: "I thought you’d tell me.", style: "a-normal"},
    {speaker: "B", text: "I just did.", style: "b-line"},
    {speaker: "A", text: "…nothing.", style: "a-normal"}
  ]},
  {title: "Ending", lines: [
    {speaker: "", text: "THE END", style: "credit"},
    {speaker: "", text: "Directed by AB", style: "credit"},
    {speaker: "", text: "Screenplay by Aditya Bhatia", style: "credit"},
    {speaker: "", text: "THRESHOLD", style: "credit"},
    {speaker: "", text: `
  <a href='#' onclick='location.reload()' style='color:white; text-decoration:underline; cursor:pointer;'>Replay</a>
  <br><br>
  <a href='TCJ/index.html' target='_blank' style='
    color:white;
    background:transparent;
    border:1px solid white;
    padding:8px 16px;
    border-radius:8px;
    text-decoration:none;
    font-family:monospace;
    transition:0.3s;
    display:inline-block;
  ' onmouseover="this.style.background='white';this.style.color='black';" onmouseout="this.style.background='transparent';this.style.color='white';">
    THRESHOLD: THE COMPLETE JOURNEY
  </a>
`, style: "credit"}

  ]}
];

const cinema = document.getElementById("cinema");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text, style) {
  const span = document.createElement("div");
  span.className = style;
  // Allow HTML for replay link
  if (text.includes("<a")) {
    span.innerHTML = text;
  } else {
    span.textContent = text;
  }
  cinema.appendChild(span);
  // typing effect only for non-HTML text
  if (!text.includes("<a")) {
    for (let i = 0; i < text.length; i++) {
      span.textContent = text.substring(0, i + 1);
      await delay(30);
    }
  }
}

async function playMovie() {
  // Title Threshold
  cinema.textContent = "THRESHOLD";
  await delay(5000);
  cinema.textContent = "";
  await delay(2000);

  for (let scene of scenes) {
    cinema.textContent = "Scene: " + scene.title;
    await delay(2000);
    cinema.textContent = "";
    await delay(500);
    for (let line of scene.lines) {
      await typeLine((line.speaker ? line.speaker + ": " : "") + line.text, line.style);
      await delay(500);
    }
if (scene.title !== "Ending") {
  await delay(7000);
  cinema.textContent = "";
}
  }
}
const audio = new Audio('moonvenus.mp3');
audio.loop = true;
audio.volume = 0.4; 
// Wait for first user interaction to play music
function startAudio() {
    audio.play().catch(err => console.log('Autoplay blocked:', err));
    window.removeEventListener('click', startAudio);
}

window.addEventListener('click', startAudio);


playMovie();


