import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"
import useDateTimeFormat from "hooks/useDateTimeFormat"

export default function Alweet({
  avatar,
  imgs,
  userName,
  content,
  id,
  createdAt,
  border
}) {
  const timeago = useTimeAgo(createdAt)

  const router = useRouter()
  const title = useDateTimeFormat(createdAt)

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <Link href={`/status/${id}`}>
              <a className="time">
                <time title={title} className="date">
                  {timeago}
                </time>
              </a>
            </Link>
          </header>

          <p>{content}</p>
          <div className="alweet-img-container">
            {imgs && imgs.map((img) => <img src={img} key={img} />)}
          </div>
        </section>
      </article>
      <style jsx>
        {`
          section {
            width: 100%;
          }
          article {
            border-bottom: 2px solid #eee;
            padding: 10px 10px;
            display: flex;
            border-top: ${border};
          }

          article:hover {
            background-color: #f5f8fa;
            cursor: pointer;
          }
          div {
            padding-right: 10px;
          }

          .alweet-img-container {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        
            gap: 6px;
          }
          .alweet-img-container > img {
            flex: 1 1 0;
            border-radius: 9px;
            max-width: 270px;
            width: 100%;
            object-fit: contain;
            margin-top: 10px;
          }
          p {
            margin: 0;
            line-height: 1.3125;
          }
          .date {
            padding-left: 8px;
            font-size: 14px;
            color: #555;
          }
          .time {
            color: #555;
            text-decoration: none;
            font-size: 15px;
          }

          .time:hover {
            text-decoration: wavy underline #09f;
          }

          @media (min-width: 640px) {
            img {
              max-height: 500px;
              max-width: 500px;
            }
          }
        `}
      </style>
    </>
  )
}
