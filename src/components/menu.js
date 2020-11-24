import React from "react"
import { Link } from "gatsby"

const Menu = ({ siteTitle }) => (
        <div style={{marginTop:'2.5%'}}>
            <ul style={{listStyle:'none',display:'flex',justifyContent:'space-evenly', alignItems:'center'}}>
                <li><Link to="/blog" style={{ fontFamily:"'Knewave', cursive", color:'#000' }}>Words</Link></li>
                <h1 style={{ fontFamily: "'Knewave', cursive" , fontWeight:'light'}}><Link
          to="/">{siteTitle}</Link></h1>
                <li><Link to="/calorieCam" style={{ fontFamily:"'Knewave', cursive", color:'#000' }}>Work</Link></li>
                <i class="fas fa-moon">MOON</i>
                <p>SHOP</p>
            </ul>
        </div>
    )

export default Menu

// on hover, philosophy & strength,
// domain name
// write
// hover for links
// photo(s) for about
// photo carousel || hover

// animations
// Emojis (yoga, strength, yogi)
// SEO

// style about text, i.e. italize, emphasize, "colourize" some parts
