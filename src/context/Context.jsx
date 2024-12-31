import { createContext, useState } from "react";
import run from "../config/gemini";
import './Context.css'

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPromt,setRecentPromt] = useState("");
    const [prevPromts,setPrevPromts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    
    const delayPara = (index,nextWord) =>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }


    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let respones;
        if (prompt !== undefined) {
          respones = await run(prompt)
          setRecentPromt(prompt)
        }
        else{
          setPrevPromts(prev=>[...prev,input])
          setRecentPromt(input)
          respones = await run(input)
        }
        setRecentPromt(input);
        setPrevPromts(prev=>[...prev,input])
        const response = await run(input); // Assume run() is your function that fetches the response
        let responesArray = response.split("**"); // Splitting the response
        let newRspones = "" ; // Initialize newRspones as an empty string
      
        for (let i = 0; i < responesArray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newRspones += responesArray[i]; // Append to newRspones
          } else {
            newRspones += "<b>" + responesArray[i] + "</b>"; // Bold text if condition met
          }
        }
      
        let newRspones2 = newRspones.split("*").join("</br>"); // Correctly assign newRspones2
        let newRsponesArray = newRspones2.split(" ");
      
        for (let i = 0; i < newRsponesArray.length; i++) {
          const nextWord = newRsponesArray[i];
          delayPara(i, nextWord + " "); // Assuming delayPara function is defined elsewhere
        }
      
        setLoading(false);
        setInput(""); // Reset input field
      };
      


    // onSent("")


    const contecxtValue = {
         prevPromts,
         setPrevPromts,
         onSent,
         setRecentPromt,
         recentPromt,
         showResult,
         loading,
         resultData,
         input,
         setInput,
     }

    return(
        <Context.Provider value={{ contecxtValue }}>
            {props.children}
        </Context.Provider>
    )
} 

export default ContextProvider