const userName = prompt('Seu Nome')
const povei = { name : userName}

const promissePost = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',povei
)
promissePost.then(console.log('deu certo'))
promissePost.then(BuscaeMensagens)

function BuscaeMensagens () {

  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
  promisse.then(menssageProcess)
}


function menssageProcess(respose) {
  console.log(respose)
  const menssagess = document.querySelector('.teste')
  menssagess.innerHTML = ''
  for(let i = 0; respose.data.length > i ; i++){
    let newMenssagess
    if(respose.data[i].type === "status"){
      newMenssagess = `<div class="status"><span class="timee">(${respose.data[i].time})</span> ${respose.data[i].from} ${respose.data[i].text}</div>`
      menssagess.innerHTML = newMenssagess + menssagess.innerHTML
    }
    if(respose.data[i].type === "message"){
      newMenssagess = `<div class="messagePub"><span class="timee">(${respose.data[i].time})</span> ${respose.data[i].from} para ${respose.data[i].to} ${respose.data[i].text}</div>`
      menssagess.innerHTML = newMenssagess + menssagess.innerHTML
    }
    

    
  }
}