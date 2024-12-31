import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from "../../assets/assets"
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPromt, showResult, loading, resultData, setInput, input } = useContext(Context).contecxtValue;

   






    return (
        <div className='main'>
            
            <div className="nav">
                <p>CodeMind-AI</p>
                {/* <img src={assets.user_icon2} alt="" /> */}
                <button onClick={()=>setLogin} className='login-btn'>Login</button>
            </div>
            <div className="main-container">
            

                    {!showResult
                    ?<>
                           <div className="greet">
                    <p><span>Hello, Akash Parmar</span></p>
                    <p>How Can I Assist You Today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban plannig</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstrom team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                    </>
                    :<div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon2} alt="" />  
                            <p>{recentPromt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.code_icon1} alt="" />
                            {loading
                            ?<div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>
                    </div>
                    }

               
                <div className="main-bottom">
                    <div className="search-box">
                       <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                    CodeMind-AI may display inaccurate info, including about people, so double-check its respones. Your privacy and CodeMind-AI Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
