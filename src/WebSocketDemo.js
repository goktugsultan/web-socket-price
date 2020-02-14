import React, { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

export const WebSocketDemo = () => {
    const socketUrl = 'ws://quotise.com:10010/price/'
    const [sendMessage, lastMessage] = useWebSocket(socketUrl)
    const [messageEURUSDandGBPUSD, setmessageEURUSDandGBPUSD] = useState([])
    const [defaultPrice, setDefaultPrice] = useState({})


    useEffect(() => {
        if (lastMessage !== null) {
            const message = JSON.parse(lastMessage.data)
            //console.log(message)
            const messageValues = Object.values(message)
            //console.log(messageValues)
            if (messageValues[0] === 'EURUSD' || messageValues[0] === 'GBPUSD') {
                setDefaultPrice(message)
                //console.log('Default Price',defaultPrice)
                const idx = messageEURUSDandGBPUSD.findIndex(item => item.symbol === message.symbol)
                //console.log(idx)
                //console.log('messageEUR',messageEURUSDandGBPUSD)
                if (idx === -1) {
                    setmessageEURUSDandGBPUSD(prev => [...prev, message])
                }
                messageEURUSDandGBPUSD.map(item => {
                    if (item.symbol === message.symbol) {
                        item.ask = message.ask
                        item.bid = message.bid
                    }
                    //console.log('item',item)
                    //console.log('message',message)
                    return item
                })
                //console.log('message',messageEURUSDandGBPUSD)
                //addStyleFeature('bid')
                //addStyleFeature('ask')

            }

        }
    }, [lastMessage])


    // function addStyleFeature(type) {
    //     messageEURUSDandGBPUSD.map(item => {
    //         if (item[`${type}`] < defaultPrice[`${type}`]) {
    //             item['style'] = 'red'
    //         } else if (item[`${type}`] > defaultPrice[`${type}`]) {
    //             item['style'] = 'green'
    //         } else {
    //             item['style'] = 'black'
    //         }
    //         console.log('item-->', item)
    //         return item

    //     })
    // }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="bg-danger">
                        <th scope="col">SYMBOL</th>
                        <th scope="col">BID</th>
                        <th scope="col">ASK</th>
                    </tr>
                </thead>
                <tbody style={{ backgroundColor: '#15202B', color: 'white', fontWeight: 'bold' }}>
                    {
                        messageEURUSDandGBPUSD &&
                        messageEURUSDandGBPUSD.map((message, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{message.symbol}</td>
                                    <td>{message.bid}</td>
                                    <td>{message.ask}</td>
                                    {/* <td><p style={{ color: `${message.style}`, transition: 'color 0.5s' }}>{message.bid}</p></td>
                                    <td><p style={{ color: `${message.style}`, transition: 'color 0.5s' }}>{message.ask}</p></td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}