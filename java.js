const userName = prompt('Seu Nome')
const povei = { name : userName}

const promissePost = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',povei
)
promissePost.then(console.log('deu certo'))
promissePost.then(BuscaeMensagens)
function connectStatus () {
  const conStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', povei)
}
setInterval(connectStatus, 5000)

function BuscaeMensagens () {

  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
  promisse.then(menssageProcess)
}

setInterval(BuscaeMensagens, 3000)

function menssageProcess(respose) {
  const menssagess = document.querySelector('.teste')
  menssagess.innerHTML = ''
  for(let i = 0; respose.data.length > i ; i++){
    let newMenssagess
    if(respose.data[i].type === "status"){
      newMenssagess = `<div class="status"><span class="timee">(${respose.data[i].time}) </span> <span class="nameMenssage"> ${respose.data[i].from}</span> ${respose.data[i].text}</div>`
      menssagess.innerHTML = newMenssagess + menssagess.innerHTML
    }
    if(respose.data[i].type === "message"){
      newMenssagess = `<div class="messagePub"><span class="timee">(${respose.data[i].time}) </span> <span class="nameMenssage"> ${respose.data[i].from}</span> para <span class="nameMenssage">${respose.data[i].to}:</span> ${respose.data[i].text}</div>`
      menssagess.innerHTML = newMenssagess + menssagess.innerHTML
    }
    

    
  }
}

function sendMenssage () {
  const inputContent = document.querySelector('.inputChat')
  let menssageInp = inputContent.value
  let menssagePut = {
    from: userName,
	  to: "Todos",
	  text: menssageInp,
	  type: "message"
  }
  inputContent.value = ''
  const promissePut = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', menssagePut)
  promissePut.then(BuscaeMensagens)
}