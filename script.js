// document.body representa todo o corpo do site
// addEventListener fica esperando um evento, no caso o 'keyup' e executa uma função
document.body.addEventListener("keyup", (event) => {
  console.log(event.code.toLowerCase()); // Exibe no console qual tecla ativou o evento
  playSound(event.code.toLowerCase()); // Chama a função passando o codigo da tecla em minusculo
});

// addEventListener fica esperando um evento, no caso um "click" no "button" que esta dentro da div "composer"
document.querySelector(".composer button").addEventListener("click", () => {
  let song = document.querySelector("#input").value;

  // Verificando campo
  if (song != "") {
    let songArray = song.split(""); // Transformando string em array
    playComposition(songArray);
  }
});

// Função responsavel por tocar o som
function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`); // Procura o primeiro elemento que combina com o parametro
  let keyElement = document.querySelector(`div[data-key="${sound}"]`); // Selecionar a tecla que esta sendo tocada

  // Se a tecla existir o som sera reproduzido
  if (audioElement) {
    audioElement.currentTime = 0; // Zera o audio atual, permitindo tocar outra tecla antes de acabar o audio
    audioElement.play(); // toca o audio
  }

  // Se a tecla existir sera atribuida uma classe CSS nela para destaca-la
  if (keyElement) {
    keyElement.classList.add("active");
    // Duração da animação
    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 300);
  }
}

// Função que toca a composição
function playComposition(songArray) {
  let wait = 0;
  for (let songItem of songArray) {
    // Aumentando intervalo entre cada nota
    setTimeout(() => {
      playSound(`key${songItem}`);
    }, wait);
    wait = wait + 200;
  }
}
