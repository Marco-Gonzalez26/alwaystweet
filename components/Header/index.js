import React from "react"

function Header({ text, children, styles }) {
  return (
    <>
      <header style={styles}>
        {children}
        <h2>{text}</h2>
      </header>

      <style jsx>
        {`
          header {
            position: sticky;
            display: flex;
            align-items: center;
            height: 49px;
            border-bottom: 1px solid #eee;
            top: 0;
            width: 100%;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            padding: 16px;
            z-index: 100;
          }
          h2 {
            font-size: 20px;
            font-weight: 800;
            padding-left: 15px;
          }
        `}
      </style>
    </>
  )
}

export default Header
