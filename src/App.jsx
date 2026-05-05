import { useEffect, useState,useCallback,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
const [password,setPassword]=useState("")
const [length,setLength]=useState(8)
const [number,setNumber]= useState(false)
const [char,setChar]= useState(false)
const passwordRef=useRef(null)
const [copied,setCopied]=useState(false)

  let strength='weak'
  if(length>8 && number && char){
    strength="strong"
  }
  else if(length>8){
    strength="medium"
  }

const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if(number) str+='0123456789'
    
    if(char) str+='!@#$%^&*_-'
  
  for (let i = 0; i < length; i++) {
    let Char=Math.floor(Math.random()*str.length)
    pass+=str.charAt(Char)
  }
  setPassword(pass)
},[length,number,char,setPassword])
  

useEffect(()=>{
  passwordGenerator()
},[length,number,char])
const copyPassword=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,20)
  window.navigator.clipboard.writeText(password)
  setCopied(true)
  setTimeout(()=> setCopied(false),1500)
},[password])
  
  return (
    <>
      <div className="box">
        <div className="inputBox">
          <input type="text" value={password} readOnly ref={passwordRef} />
          <div className="s"><p className={`strength ${strength}`}>{strength}</p></div>
          <button onClick={copyPassword}>{copied? 'Copied':'Copy'}</button>
        </div>
        <div className="attribute">
          <span><input type="range" name="length" id="length" onChange={(e)=> setLength(Number(e.target.value))}/>Length:{length}</span>
          <span><input type="checkbox" name="Number" id="Number" onClick={()=>setNumber((prev)=>(!prev))}  />Number</span>
          <span><input type="checkbox" name="char" id="char" onClick={()=>setChar((prev)=>(!prev))}/>Character</span>
        </div>
      </div>
    </>
  )
}

export default App
