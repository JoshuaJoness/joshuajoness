import React from "react"
import { Link } from "gatsby"
import Emoji from "react-emoji-render";
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Header from "../../components/header"


const ZenChat = () => (
  <Layout>
    <SEO title="Calorie Cam" />
    <div style={{ display:'grid', gridTemplateColumns:'50% 50%', height:'80vh', backgroundColor:'#525252', paddingRight:'2.5%' }}>
      <img src="./zenChat0.png" alt="" style={{ width:'90%', margin:'auto', paddingBottom:'5%'}}/>
      <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20, paddingTop:'5%'}}>
        <h1 style={{fontFamily:"'Knewave', cursive", color:'#C9D2C5'}}>What This App Does</h1>
        <p>Step 1. Enter your name and select a room.</p>
          <ul style={{fontFamily:'Arial'}}>
            <li>Users are prompted to enter their name and select a room</li>
            <li>If name and room are both present, we redirect the user to the /chat path</li>
            <li>We pass the user's name and selected room to /chat via URL parameters</li>
          </ul>
          <pre style={{width:'100%', marginTop:'2.5%', marginBottom:'2.5%', background:'#EEE', color:'#000'}}>
            <code>
                { 
                `<Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={\n\`/chat?name=\n\${name}&room=\n\${room}\n\`}>;`
                    }
            </code>
        </pre>
      </div>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'50% 50%', backgroundColor:'#EEE', paddingTop:'5%', paddingLeft:'3%', paddingBottom: '5%' }}>
        <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20}}>
          <p style={{fontFamily:"'Knewave', cursive", color:'#2F3F46', fontSize:50, lineHeight: 1.5}}>On the server is where the magic happens!</p>
          <ul style={{color:'black', marginTop:'3%', fontFamily:'Arial'}}>
            <li>First we set up our app with Express</li>
            <li>We then create an HTTP server, passing it our app that we created with Express</li>
            <li>Finally we attach socket.io to our server. Sockets allow us to transfer data instantaneously as opposed to HTTP requests</li>
          </ul>
          <pre style={{marginTop:'3%'}}>
            <code style={{color:'black'}}>
           { 
           `
           const app = require('express')()
           const server = require('http').createServer(app);
           const io = require('socket.io')(server);
            `}
            </code>
          </pre>
        </div>
        <img src="./zenChat1.png" alt="" style={{ width:'90%', margin:'auto', marginTop:'1%'}}/>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'50% 50%', backgroundColor:'#525252', paddingRight:'2.5%' }}>
      <img src="./zenChat2.png" alt="" style={{ width:'90%', margin:'auto', paddingBottom:'5%'}}/>
      <div style={{fontFamily:"'Knewave', cursive",display:'flex', flexDirection:'column', color:'#FFF', fontSize: 20, paddingTop:'5%'}}>
        <h1 style={{fontFamily:"'Knewave', cursive", color:'#C9D2C5'}}>Sockets in action</h1>
          <ul style={{fontFamily:'Arial'}}>
            <li>On the client-side, we also connect to socket.io and 'emit' messages via sockets</li>
          </ul>
          <pre style={{width:'100%', marginTop:'2.5%', marginBottom:'2.5%', background:'#EEE', color:'#000'}}>
            <code>
                { 
                `const socket = io(process.env.REACT_APP_API, {name:'name'});
                    ...  
                    const emitMessage = async () => {
                    setMessage('')
                    await socket.emit('msg', message, name, room)
                    await axios.post(\n\`\n\${process.env.REACT_APP_API}/message\n\`, 
                    {name, message, room})
                    .then(res => {console.log(res.data)})
                    .catch(err => {console.log(err)})  
                   }`
                    }
            </code>
        </pre>
        <ul style={{fontFamily:'Arial'}}>
            <li>We handle these messages on the server, listening for 'msg' emits and in turn emitting these to the correct room</li>
        </ul>
        <pre style={{width:'100%', marginTop:'2.5%', marginBottom:'2.5%', background:'#EEE', color:'#000'}}>
            <code>
                { 
                `  socket.on('msg', (message, name, room) => {
                    io.emit('msg', formatMessage(name, message, room))
                  })`
                    }
            </code>
        </pre>
        <ul style={{fontFamily:'Arial'}}>
            <li>We also listen for 'join' and 'disconnect' events</li>
        </ul>
        <pre style={{width:'100%', marginTop:'2.5%', marginBottom:'2.5%', background:'#EEE', color:'#000'}}>
            <code>
                { 
                `   // Handles join even
                socket.on('join', (name,room) => {
                  const Message = require('./models/Message')
                  Message.find({ room:room }).then(data => {
                    io.emit('history', data)
                    io.emit('msg', formatMessage('zen-bot', \n\`\n\${name} has entered the room\n\`))
                  })
                })
                // Handles disconnect event 
                socket.on('disconnect', () => {
                  io.emit('msg', formatMessage('zen-bot',\n\`A user has left the chat\n\`))
                });`
                    }
            </code>
        </pre>
      </div>
    </div>
    </Layout>
)

export default ZenChat

// messages are stored in MongoDB and function called to retrieve these everytime app laods