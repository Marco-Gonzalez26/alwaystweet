import Button from "components/Icons/Button"
import useUser from "../../../hooks/useUser"
import Avatar from "components/Avatar"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { addAlweet, uploadImage } from "../../../firebase/client"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeAlweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addAlweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)

    const task = uploadImage(e.dataTransfer.files[0])
    setTask(task)
  }

  return (
    <>
      <Head>
        <title>Make an Alweet / AlwaysTweet</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} alt={user.username} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="What's happening?"
            value={message}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Alweet</Button>
          </div>
        </form>
      </section>
      <style jsx>
        {`
          div {
            padding: 15px;
          }
          button {
            position: absolute;
            right: 15px;
            top: 15px;
            border: 0;
            border-radius: 99999px;
            color: #fff;
            width: 32px;
            height: 32px;
            background: rgba(0, 0, 0, 0.3);
            cursor: pointer;
          }
          form {
            padding: 10px;
          }

          .avatar-container{
            padding-top: 15px;
            padding-left: 15px
          }

          .form-container{
            display: flex;
            align-items: flex-start;

          }
          .remove-img {
            position: relative;
          }
          textarea {
            min-width:100%;
            border: ${
              drag === DRAG_IMAGES_STATES.DRAG_OVER
                ? "3px dashed #09f"
                : "3px solid transparent"
            };
            border-radius: 10px;
            padding: 10px;
            resize: none;
            font-size: 21px;
            outline: 0;

          }

          textarea:focus {

          img {
            border-radius: 10px;
            width: 100%;
            height: auto;
          }
        `}
      </style>
    </>
  )
}
