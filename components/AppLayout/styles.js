import css from "styled-jsx/css"
import { fonts, colors, breakPoints } from "../../styles/theme"
import { addOpacity } from "../../styles/utils"

const backgroundColor = addOpacity(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #fdfdfdfd 1px),
      radial-gradient(${backgroundColor} 1px, #09f 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
    overflow: hidden;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }

  * {
    box-sizing: border-box;
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: ${breakPoints.mobile}) {
    main {
      width: ${breakPoints.mobile};
      height: 90vh;
    }
  }
`
