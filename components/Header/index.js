
function Header({ text, children, styles }) {
  return (
    <>
      <header style={styles}>
        {/* <div className="avatar-container">
          <Avatar withText={false} alt={user?.username} src={user?.avatar} />
        </div> */}
        {children}
        <h2>{text}</h2>
      </header>

      <style jsx>
        {`
          header {
            position: sticky;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            top: 0;
            width: 100%;
            background: #ffffffaa;
            backdrop-filter: blur(5px);
            padding: 10px;
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
