import React from "react"
import { colors } from "styles/theme"

function Tooltip({ handleClick }) {
  return (
    <>
      <section>
        <div>
          <button onClick={handleClick}>logout</button>
          <span />
        </div>
      </section>

      <style jsx>
        {`
          section {
            position: absolute;
            padding: 1rem;
          }
          div {
            width: 250px;
            height: 150px;
            position: relative;
            background: white;
            display: flex;
            flex-direction: column;
            top: -120px;
            border: 2px solid #eee;
            border-radius: 1rem;
            align-items: center;
          }

          span {
            background: ${colors.white};
            width: 20px;
            transform: rotateX(180deg);
            height: 15px;
            position: absolute;
            bottom: -15px;
            border: 2px solid #eee;
            border-top-left-radius: 0px;
            border-top-right-radius: 1000px;
            z-index: 10;
            border-bottom: none;
          }
        `}
      </style>
    </>
  )
}

export default Tooltip
