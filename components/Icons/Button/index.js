import { colors } from "../../../styles/theme"

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>

      <style jsx>
        {`
          button {
            align-items: center;
            background: ${colors.black};
            border-radius: 9999px;
            border: 0;
            color: ${colors.white};
            cursor: pointer;
            display: flex;
            font-size: 16px;
            font-weight: 700;
            padding: 8px 24px;
            transition: opacity 0.3s ease;
          }

          button > :global(svg) {
            margin-right: 8px;
          }
          button:hover {
            opacity: 0.7;
          }

          button[disabled] {
            pointer-events: none;
            opacity: 0.2;
          }
        `}
      </style>
    </>
  )
}
