import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketPrice = () => {
    const [socketUrl, setSocketUrl] = useState('ws://quotise.com:10010/price/');
    //const [messageHistory, setMessageHistory] = useState([]);
    const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
    const [messageEURUSDandGBPUSD, setmessageEURUSDandGBPUSD] = useState([]);


    useEffect(() => {
        if (lastMessage !== null) {
            //setMessageHistory(prev => prev.concat(lastMessage));
            const obj = JSON.parse(lastMessage.data)
            const obj1 = Object.values(obj)
            //console.log(obj1)
            if (messageEURUSDandGBPUSD.length <= 10) { //test için 10 adet
                if (obj1[0] === 'EURUSD' || obj1[0] === 'GBPUSD') {
                    //console.log(obj)
                    setmessageEURUSDandGBPUSD(prev => prev.concat(obj));
                    console.log('messageEURUSDandGBPUSD',messageEURUSDandGBPUSD)
                }
            }
        }
    }, [lastMessage]);
    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="bg-danger">
                        <th scope="col">#</th>
                        <th scope="col">SYMBOL</th>
                        <th scope="col">BID</th>
                        <th scope="col">ASK</th>
                    </tr>
                </thead>
                <tbody>
                    {messageEURUSDandGBPUSD && messageEURUSDandGBPUSD.map((message, idx) => <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{message.symbol}</td>
                        <td>{message.bid}</td>
                        <td>{message.ask}</td>
                    </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};