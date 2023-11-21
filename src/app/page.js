"use client";

// import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { useState } from "react";
import { ValidTaskStatesEnum } from "@/utils/task";
import { BarsLoaderSpinner } from "./loader-spinners";
import { robotoMono, montserrat } from "./fonts";
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"

import classes from "./page.module.css";
import VideoMetadata from "./components/VideoMetadata";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [taskStatus, setTaskStatus] = useState(ValidTaskStatesEnum.INITIAL);
  const [transcriptionDocsList, setTranscriptionDocsList] = useState(undefined);
  const [isTranscribeButtonDisabled, setIsTranscribeButtonDisabled] = useState(false);
  const [output, setOutput] = useState('sample output')

  const openAIApiKey = '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'
  const llm = new ChatOpenAI({ openAIApiKey })

  const queryTemplate = 'Summarize this yoube video subtitle: {subtitle}'

  const queryPrompt = PromptTemplate.fromTemplate(queryTemplate)

  const queryChain = queryPrompt.pipe(llm)

  console.log("Output: " + output)
  function onInputChange(changeEvent) {
    if (changeEvent.target.name === "video-url") {
      setVideoUrl(changeEvent.target.value);
    }
  }

  async function onTranscribe(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    setIsTranscribeButtonDisabled(true); // disable transcribe button

    // const loader = YoutubeLoader.createFromUrl(videoUrl, {
    //   language: "en",
    //   addVideoInfo: true,
    // });

    const formData = new FormData();
    formData.append("videoUrl", videoUrl);

    setTaskStatus(ValidTaskStatesEnum.LOADING);

    // const transcribedDocs = await loader.load();
    // setTaskStatus(ValidTaskStatesEnum.FINISHED);
    // setTranscriptionDocsList(transcribedDocs);
    // setIsTranscribeButtonDisabled(false); // re-enable transcribe button
    // console.log(docs);

    const youtubeVideoTranscriptionResponse = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const transcribedDocs = await youtubeVideoTranscriptionResponse.json();
    setTranscriptionDocsList(transcribedDocs);
    setTaskStatus(ValidTaskStatesEnum.FINISHED);
    setIsTranscribeButtonDisabled(false); // re-enable transcribe button
    const response = await queryChain.invoke({subtitle: transcribedDocs['0'].pageContent})
    setOutput(response.content)
    console.log("output:" + output)
    // console.log(transcribedDocs['0'].pageContent)
  }

  return (
    <div className={classes.formAndContentContainer}>
      <h1 className={`${classes.pageHeader} ${robotoMono.className}`}>
        YouTube Video Transcription
      </h1>
      <form className={classes.videoTranscriptionForm} onSubmit={onTranscribe}>
        <input
          name="video-url"
          value={videoUrl}
          className={classes.videoUrlInput}
          onChange={onInputChange}
          placeholder="Enter YouTube Video Url"
          disabled={isTranscribeButtonDisabled}
        />
        <button
          name="video-transcribe"
          className={classes.transcribeButton}
          type="submit"
          disabled={isTranscribeButtonDisabled}
        >
          Transcribe
        </button>
      </form>
      {taskStatus === ValidTaskStatesEnum.LOADING && <BarsLoaderSpinner />}
      <textarea
        value={output}
        name="output"
        readOnly
        >
      </textarea>
      {transcriptionDocsList && (
        <>
          <hr className={classes.dottedHr} />
          <ul>
            {transcriptionDocsList.map((doc, idx) => {
              const docMetadata = doc?.metadata;

              return (
                <li key={idx}>
                  {/* <VideoMetadata videoMetadataObj={docMetadata ?? {}} /> */}
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
      )}
    </div>
  );
}
