"use client";

// import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { useState } from "react";
import { ValidTaskStatesEnum } from "@/utils/task";
import { BarsLoaderSpinner } from "./loader-spinners";
import { robotoMono, montserrat } from "./fonts";
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"

import classes from "./page.module.css";
import "./page.css"
import Subtitles from "./components/Subtitles";
import VideoMetadata from "./components/VideoMetadata";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [taskStatus, setTaskStatus] = useState(ValidTaskStatesEnum.INITIAL);
  const [transcriptionDocsList, setTranscriptionDocsList] = useState(undefined);
  const [isTranscribeButtonDisabled, setIsTranscribeButtonDisabled] = useState(false);
  const [output, setOutput] = useState("")

  const openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  const llm = new ChatOpenAI({ openAIApiKey })

  const queryTemplate = 'Summarize this yoube video subtitle: {subtitle}'

  const queryPrompt = PromptTemplate.fromTemplate(queryTemplate)

  const queryChain = queryPrompt.pipe(llm)

  function onInputChange(changeEvent) {
    if (changeEvent.target.name === "video-url") {
      setVideoUrl(changeEvent.target.value);
    }
  }

  async function onTranscribe(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    setIsTranscribeButtonDisabled(true); // disable transcribe button


    const formData = new FormData();
    formData.append("videoUrl", videoUrl);

    setTaskStatus(ValidTaskStatesEnum.LOADING);

    const youtubeVideoTranscriptionResponse = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const transcribedDocs = await youtubeVideoTranscriptionResponse.json();
    setTranscriptionDocsList(transcribedDocs);
    console.log(transcribedDocs[0].pageContent)
    const response = await queryChain.invoke({subtitle: transcribedDocs['0'].pageContent})
    setOutput(response.content)
    // console.log("output:" + output)
    setTaskStatus(ValidTaskStatesEnum.FINISHED);
    setIsTranscribeButtonDisabled(false); // re-enable transcribe button
    // console.log(transcribedDocs['0'].pageContent)
  }

  return (
    <div>
      <h1 className="header">
        YouTube Video Transcription using LLM
      </h1>
      <div className="hero">
        <form onSubmit={onTranscribe}>
          <input
            name="video-url"
            value={videoUrl}
            className="input-field"
            onChange={onInputChange}
            placeholder="Enter YouTube Video Url"
            disabled={isTranscribeButtonDisabled}
          />
          <button
            name="video-transcribe"
            type="submit"
            disabled={isTranscribeButtonDisabled}
          >
            Summarize
          </button>
        </form>
        {taskStatus === ValidTaskStatesEnum.LOADING && <BarsLoaderSpinner />}
        <Subtitles transcriptionDocsList={transcriptionDocsList} output={output}></Subtitles>
        {/* <textarea
          value={output}
          name="output"
          readOnly
          >
        </textarea>
        <textarea
          value={transcriptionDocsList && transcriptionDocsList[0].pageContent}
          >

        </textarea> */}
        {/* {transcriptionDocsList && (
          <>
            <hr className={classes.dottedHr} />
            <ul>
              {transcriptionDocsList.map((doc, idx) => {
                const docMetadata = doc?.metadata;

                return (
                  <li key={idx}>
                    <VideoMetadata videoMetadataObj={docMetadata ?? {}} />
                    <div className={classes.videoDetailsContainer}>
                      <h2
                        className={`${classes.pageSubHeader} ${robotoMono.className}`}
                      >
                        Video Transcription
                      </h2>
                      <p className={classes.normalText}>{doc?.pageContent}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )} */}
      </div>
    </div>
  );
}
