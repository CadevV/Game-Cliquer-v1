const add = document.querySelector('#add')
const remv = document.querySelector('#remv')
const reset = document.querySelector('#reset')
const contador = document.querySelector('#cliques')
const price = document.querySelectorAll('.valor')
const pricePower = document.querySelectorAll('.valorPower')
const level = document.querySelectorAll('.level')
const btnUp = document.querySelectorAll('.btnUp')
const btnPowerUp = document.querySelectorAll('.btnPowerUp')
const infoClique = document.querySelector('#infoClique')
const infoTempo = document.querySelector('#infoTempo')
const infoTempoPowerUp = document.querySelector('#infoTempoPowerUp')

const btnDebug = document.getElementById('debug')
const menuDebug = document.getElementById('menuDebug')
const btnAddMulti = document.getElementById('addMulti')
const btnAddClick = document.getElementById('addClick') 
const aplicarDebug = document.getElementById('aplicar')

const debugs = [
    menuDebug,
    reset,
    remv 
]

const jogador = {
    click: 0,
    multi: 1,
    bonus: 1
}

const melhoria1x = {
    valor: 10,
    aumento: 1,
    nivel: 1,
    lugar: 0,
    objHtml: btnUp
}
const melhoria5x = {
    valor:50,
    aumento: 5,
    nivel: 1,
    lugar: 1,
    objHtml: btnUp
}
const melhoria10x = {
    valor: 100,
    aumento: 10,
    nivel: 1,
    lugar: 2,
    objHtml: btnUp
}
const melhoria25x = {
    valor: 250,
    aumento: 25,
    nivel: 1,
    lugar: 3,
    objHtml: btnUp
}
const melhoria50x = {
    valor: 500,
    aumento: 50,
    nivel: 1,
    lugar: 4,
    objHtml: btnUp
}
const melhoria100x = {
    valor: 1000,
    aumento: 100,
    nivel: 1,
    lugar: 5,
    objHtml: btnUp
}

const melhorias = [
    melhoria1x,
    melhoria5x,
    melhoria10x,
    melhoria25x,
    melhoria50x,
    melhoria100x
]

const powerUp2x = {
    valor: 1000,
    aumento: 2,
    duracao: 60000,
    lugar: 0,
    objHtml: btnPowerUp
}

const powerUp5x = {
    valor: 5000,
    aumento: 5,
    duracao: 60000,
    lugar: 1,
    objHtml: btnPowerUp
}

const powerUp10x = {
    valor: 10000,
    aumento: 10,
    duracao: 60000,
    lugar: 2,
    objHtml: btnPowerUp
}

const powerUps = [
    powerUp2x,
    powerUp5x,
    powerUp10x,
]


function atualizarTudo(){

    infoClique.innerHTML = jogador.multi * jogador.bonus
    
    contador.innerHTML = jogador.click

    melhorias.forEach(element => {
        price[element.lugar].innerHTML = element.valor
        level[element.lugar].innerHTML = element.nivel
    });

    powerUps.forEach(element => {
        pricePower[element.lugar].innerHTML = element.valor
    });
    
    atualizarBotoes()
}

function atualizarBtns(item){
    if(jogador.click >= item.valor){
        item.objHtml[item.lugar].classList.remove('naoCompravel')
        item.objHtml[item.lugar].classList.add('compravel')
    } else {
        item.objHtml[item.lugar].classList.add('naoCompravel')
        item.objHtml[item.lugar].classList.remove('compravel')
    }
}

function atualizarBotoes() {
    melhorias.forEach(element => {
        atualizarBtns(element)
    });

    powerUps.forEach(element => {
        atualizarBtns(element)
    })
}

function poderClick(){
    return jogador.multi * jogador.bonus
}

function comprarMulti(melhoria){

    if(jogador.click >= melhoria.valor){

        jogador.click -= melhoria.valor
        jogador.multi += melhoria.aumento

        melhoria.nivel++

        melhoria.valor += Math.floor(melhoria.valor*1.1 / 2.4)

        atualizarTudo()
    }
}

function compraPowerUp(powerUp){
    if(jogador.bonus !== powerUp.aumento){
        if(jogador.click >= powerUp.valor){
            
            jogador.click -= powerUp.valor

            powerUp.valor *= 2

            jogador.bonus = powerUp.aumento

            powerUps.forEach(element =>{
                btnPowerUp[element.lugar].classList.add('indisponivel')
                btnPowerUp[element.lugar].disabled = true;
            })
            
            atualizarTudo()

            setTimeout(() => {
                jogador.bonus = 1

                powerUps.forEach(element =>{
                    btnPowerUp[element.lugar].classList.remove('indisponivel')
                    btnPowerUp[element.lugar].disabled = false;
                })

                atualizarTudo()
            }, powerUp.duracao);
        
        }
    }
}

function adicionar(){

    jogador.click += poderClick()

    atualizarTudo()
}

function ativarDebug(){
    let addClick = Number(btnAddClick.value)
    let addMulti = Number(btnAddMulti.value)

    jogador.click += addClick
    jogador.multi += addMulti

    atualizarTudo()
}

function remover(){
    if(jogador.click > 0){
        jogador.click--

        atualizarTudo()
    }
}

function resetar(){
    jogador.click = 0

    atualizarTudo()
}

btnDebug.addEventListener('click', ()=>{
    debugs.forEach(element =>{
        element.classList.toggle('show')
        element.classList.toggle('hidden')
    })
})

aplicarDebug.addEventListener('click', ativarDebug)

add.addEventListener('click', adicionar)

remv.addEventListener('click', remover)

reset.addEventListener('click', resetar)

melhorias.forEach(melhoria => {
    btnUp[melhoria.lugar].addEventListener('click', ()=>{
        comprarMulti(melhoria)
    })
});

powerUps.forEach(powerUp => {
    btnPowerUp[powerUp.lugar].addEventListener('click', ()=>{
        compraPowerUp(powerUp)
    })
})

atualizarTudo()
