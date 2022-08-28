
let userName
let povei

function nameInputSend() {
  const nameInput = document.querySelector('.nameInput')
  userName = nameInput.value
  povei = { name : userName}
  console.log('whyyy')
  const promissePost = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',povei
  )
  promissePost.then(BuscaeMensagens)
  promissePost.catch(processError)
  promissePost.then(setInterval(connectStatus, 5000))
  promissePost.then(closeFirst)
}
function processError (erro) {
    
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
    alert("Nome invalido ou já utilizado, escolha outro.")
    window.location.reload()
    

  
}
function connectStatus () {

    console.log(povei)
    const conStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', povei)
  
}
function closeFirst () {
  
    const screenName = document.querySelector('.firstScreen')
    screenName.classList.add('closeScreen')
  
}

function BuscaeMensagens () {
  
  const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
  promisse.then(menssageProcess)
  

}



setInterval(BuscaeMensagens, 3000)
let z = 0
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
  if(z === 0) {

    const elementoQueQueroQueApareca = document.querySelector('.scrolll');
    elementoQueQueroQueApareca.scrollIntoView();
  }
  z = 1
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
  
}

