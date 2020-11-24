import React, {useState, useEffect} from "react"
import { Link } from "gatsby"

import Emoji from "react-emoji-render";

import Layout from "../components/layout"
import Madrid from "../components/madrid"
import SEO from "../components/seo"
import Header from "../components/header"
import './index.css'

const IndexPage = () => {
  const [scrolled, setScrolled] = useState(false)
  const scrollHandler = () => {
    if (window.scrollY !== 0) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }
  window.addEventListener('scroll', scrollHandler)


  return (
  <Layout>
    <SEO title="Home" />
    <div className='bg' style={{ display: 'block', margin:'auto', color: '#F7C18B' }}>
    </div>
    <main style={{ 
            display:'flex', 
            flexDirection:'column', 
            alignItems:'center', 
            paddingLeft:'25%', 
            paddingRight:'25%', 
            textAlign: 'justify',
            marginBottom:'25%',
            marginTop:'4%',
            }}>
            <h1 style={{ fontFamily:"'Knewave', cursive", color:'#000' }}>Hi there, I'm Joshua <Emoji text=":waving_hand:" /></h1>
            <div style={{ fontFamily:'Knewave', color:'#000', fontSize:25, textAlign:'center', lineHeight: 2, width: '60vw' }}>
                <p style={{marginTop:25}}>A software developer currently working with the good folks over at<a href='https://www.boardera.ca/' target='blank' style={{fontFamily:"'Knewave', cursive", fontWeight:'bold', fontSize:30, color:'#3a8d6f'}}> Boardera.</a></p>
                {/* place image here */}
                <p>I create <b style={{fontFamily:"'Knewave', cursive", fontWeight:'bold', fontSize:30}} >web applications</b> that look good and <i>feel</i> great.</p>
                <div style={{display:'flex', justifyContent:'space-between', width: 400, margin:'auto'}}>
                    <Link style={{ fontFamily:"'Knewave', cursive", fontSize: 40, fontWeight:'bold', color:'#D5A021' }}>Work</Link>
                    <Link style={{ fontFamily:"'Knewave', cursive", fontSize: 40, fontWeight:'bold', color:'#D5A021' }}>Words</Link>
                    <Link style={{ fontFamily:"'Knewave', cursive", fontSize: 40, fontWeight:'bold', color:'#D5A021' }}>Services</Link>
                </div>
            </div>
            <p>
              Got an idea? Let's talk!
              email
              number
              IG
            </p>
            nav bar fixed OR move to bottom on scrolls

            Dribble
            {/* style={{color:'#313638'}} */}
        </main>
  </Layout>
)}

export default IndexPage
