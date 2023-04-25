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
    background: black;
    display: grid;
    height: 100vh;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
  }

  main {
    background: #fff;
    grid-column: 2 / span 2;
    height: 100%;
    min-width: 100%;
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-left: 1px #d3d3d3 solid;
    border-right: 1px #d3d3d3 solid;
  }

  @media (max-width: ${breakPoints.mobile}) {
    div {
      grid-template-columns: repeat(1, 1fr);
    }
    main {
      width: 100%;
      height: 100vh;
    }
  }
`
