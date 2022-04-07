// Change mode
const changeMode = document.querySelector('.appMode')
const mode = document.querySelector('body')

const myMode = localStorage.getItem('myMode');
if(myMode){
    mode.classList.add(myMode)
} else{
    mode.classList.add('light-mode')
    localStorage.setItem('myMode', 'light-mode')
}

const changeModeFuc = () =>{
    if(mode.classList.contains('dark-mode')){
        
        mode.classList.toggle('dark-mode')
        mode.classList.add('light-mode')
        localStorage.setItem('myMode', 'light-mode')
        changeMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
        
    }
    else{
        
        mode.classList.toggle('light-mode')
        mode.classList.add('dark-mode')
        localStorage.setItem('myMode', 'dark-mode')
        changeMode.innerHTML = '<i class="fa-solid fa-sun"></i>'
    }

}


changeMode.addEventListener('click', changeModeFuc)



const numberKey = document.querySelectorAll(".numberKey")
const operatorKey = document.querySelectorAll(".operatorKey")
const calc = document.getElementById('calc')
const res = document.getElementById('result')
const clearAllKey = document.getElementById('clearAll')
const backSpaceKey = document.getElementById('backSpace')
const equalKey = document.getElementById('equal')



let calcResult = ''
let calcArray = []

const getNumber = (num) => {
    const lastChar = calcResult[calcResult.length-1]
    if (lastChar === '.' && num === '.') return
    calcResult += num
    calcArray.push(num)
    if (calc.innerHTML === '0') {
        calc.innerHTML = ''
    }
    calc.innerHTML += calcArray[calcArray.length - 1]
    setResult()
    console.log(calcResult, calcArray)
}

const getOperator = (operator) => {
    const lastChar = calcResult[calcResult.length - 1]
    if (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/' && lastChar !== '%') {
        calcResult += operator
        calcArray.push(`<span style = "color: #ff3c39; margin: 0 10px">${operator}</span>`)
        calc.innerHTML += calcArray[calcArray.length - 1]
        console.log(calcResult)
    }
}

const setResult = () => {
    res.innerHTML = (eval(calcResult)!==Infinity && !Number.isNaN(eval(calcResult))) ? Math.round((eval(calcResult)+Number.EPSILON)*10**9) / 10**9 : 'Error Value'
}

const clearAll = () => {
    calcResult = ''
    calcArray = []
    calc.innerHTML = '0'
    res.innerHTML = '0'
}

const backSpace = () => {
    calcArray.splice(-1, 1)
    calcResult = calcResult.substr(0, calcResult.length - 1)
    calc.innerHTML = calcArray.join("")
    if (calcResult === '') clearAll()
}

const getEqual = () => {
    if(eval(calcResult) !== Infinity || eval(calcResult) !== NaN){
        resultStr = Math.round((eval(calcResult)+Number.EPSILON)*10**9) / 10**9
        calcArray = []
        for(let i = 0; i<resultStr.length; i++){
            calcArray.push(resultStr.charAt(i))
        }
        calcResult = Math.round((eval(calcResult)+Number.EPSILON)*10**9) / 10**9
        calc.innerHTML = Math.round((eval(calcResult)+Number.EPSILON)*10**9) / 10**9
    }
}

numberKey.forEach(element => {
    element.addEventListener('click', (e) => {
        const keyValue = e.target.innerText
        getNumber(keyValue)
    })
});

operatorKey.forEach(element => {
    element.addEventListener('click', (e) => {
        const keyValue = e.target.innerText
        getOperator(keyValue)
    })
})

clearAllKey.addEventListener('click', clearAll)
backSpaceKey.addEventListener('click', backSpace)
equalKey.addEventListener('click', getEqual)


