export default function Subtitles({ transcriptionDocsList, output }) {
    console
    return (
        <div className="output-container">
            { transcriptionDocsList && (
                <div className="output-sub-container">
                    <h2>Transcriptions</h2>
                    <textarea
                        value={transcriptionDocsList && transcriptionDocsList[0].pageContent}
                        readOnly
                    >
                    </textarea>
                </div>
            )}
            { output && (
                <div className="output-sub-container">
                    <h2>Summarized Transcription</h2>
                    <textarea
                        value={output}
                        name="output"
                        readOnly
                    >
                    </textarea>
                </div>
            )}
        </div>
    )
}