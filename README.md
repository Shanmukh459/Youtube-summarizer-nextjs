# TypeError: URL is not a constructor
## Debug and Fix - YoutubeLoader error (🦜️🔗 Lanchain JS Library)

This is the repo of a simple [Next.js](https://nextjs.org/) app to transcribe YouTube videos with a given URL, using [YoutubeLoader (document loader) from LangChain JS library](https://js.langchain.com/docs/modules/data_connection/document_loaders/integrations/web_loaders/youtube) . It has been created as part of a [YouTube video](https://youtu.be/oxJ7PYmx6V4) that discusses the process of debugging and fixing the "TypeError: URL is not a constructor" error encountered while using the YoutubeLoader to carry out the video transcription task. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional Notes

- Google fonts: [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono?query=roboto+mono), [Montserrat](https://fonts.google.com/specimen/Montserrat?query=montserrat), that are natively hosted on Nextjs server have been used to style
the text content in the app.
- ENUM data structure has been implemented in Javascript to model different api request states (initial, loading, finished). Corresponding code can be found in src/utils/converted-enum.js
- Bars loader spinner from [react-loader-spinner npm package](https://mhnpd.github.io/react-loader-spinner/docs/components/bars) has been used in the app to render UI that is representative of the loading state of video transcription/api request to the back-end.

