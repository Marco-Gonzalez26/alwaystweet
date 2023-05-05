import Button from "components/Icons/Button"
import useUser from "../../../hooks/useUser"
import Avatar from "components/Avatar"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { addAlweet, uploadImage } from "../../../firebase/client"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"
import Picture from "components/Icons/Picture"
import { colors } from "styles/theme"
import { X, ArrowLeft } from "lucide-react"
import Header from "components/Header"

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

  const [imgURLS, setImgURLS] = useState([])

  const router = useRouter()
  const user = useUser()

  // Refs to dom elements
  const inputRef = useRef()
  const textareaRef = useRef()

  console.log({ imgURLS })
  useEffect(() => {
    textareaRef.current.focus()
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(task.task.snapshot.ref).then((imgUrl) => {
          setImgURLS((prev) => [...prev, imgUrl])
        })
      }
      task.task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }
  const handleImageDeletion = (imageURL) => {
    setImgURLS((prev) => prev.filter((image) => imageURL !== image))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addAlweet({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      imgs: imgURLS
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
    const files = Object.values(e.dataTransfer.files)

    files.forEach(async (file) => {
      const task = await uploadImage(file)
      console.log(task.task)
      setTask(task)
    })
  }
  const handleFileInputChange = (e) => {
    const files = Object.values(e.target.files)

    files.forEach(async (file) => {
      const task = await uploadImage(file)
      console.log(task.task)
      setTask(task)
    })
  }

  // // const handleFiles = (e) => {
  // //   e.preventDefault()
  // //   const data = inputRef.current.value
  // //   if (data) {
  // //     data.substring(12)
  // //     setImgURL(data)
  // //   }

  //   const task = uploadImage(inputRef.current.value)
  //   setTask(task)

  //   // const task = uploadImage()
  // }
  return (
    <>
      <Head>
        <title>Make an Alweet / AlwaysTweet</title>
      </Head>
      <Header>
        <ArrowLeft onClick={() => router.push("/home")} />
      </Header>
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
            ref={textareaRef}
          ></textarea>
          <div className="images-container">
            {imgURLS &&
              imgURLS.map((imgURL) => {
                return (
                  <section className="remove-img" key={imgURL}>
                    <button onClick={() => handleImageDeletion(imgURL)}>
                      <X />
                    </button>
                    <img src={imgURL} />
                  </section>
                )
              })}
          </div>
          <div className="button-container">
            <Button disabled={isButtonDisabled}>Alweet</Button>
            <div className="image-upload">
              <label htmlFor="file-input">
                <Picture />
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-input"
                name="files[]"
                onChange={handleFileInputChange}
                ref={inputRef}
                multiple
                maxLength={3}
              />
            </div>
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
            display: flex;
            justify-content: center;
            align-items: center;
          }
          form {
            padding: 10px;
          }

          .avatar-container {
            padding-top: 15px;
            padding-left: 15px;
          }

          .form-container {
            display: flex;
            align-items: flex-start;
          }
          .remove-img {
            position: relative;
          }

          .images-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }
          
          textarea {
            min-width: 100%;
            border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"};
            border-radius: 10px;
            padding: 10px;
            resize: none;
            font-size: 21px;
            outline: 0;
          }
          .button-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          :global(svg):hover {
            background: radial-gradient(#0099ff33 0%, transparent 15%);
            background-size: 180px 180px;
            background-position: right;
            cursor: pointer;
            color: ${colors.primary};
          }
          img {
            border-radius: 10px;
            width: 100%;
            height: auto;
          }
          .image-upload > input {
            opacity: 0;
            pointer-events: none;
          }

          .header {
            display: flex;
            justify-content: flex-start;
            height: 55px;
            align-items: center;
            border-bottom: 2px solid #eee;
            margin: 5px;
          }
        `}
      </style>
    </>
  )
}
