import { RAGApplicationBuilder } from "@llm-tools/embedjs";
import { Ollama, OllamaEmbeddings } from "@llm-tools/embedjs-ollama";
import { HNSWDb } from "@llm-tools/embedjs-hnswlib";
import { PdfLoader } from "@llm-tools/embedjs-loader-pdf";

let arr = ["info.pdf", "3.pdf"];

const ragApplication = await new RAGApplicationBuilder()
  .setModel(
    new Ollama({
      modelName: "deepseek-r1:1.5b",
      baseUrl: "http://ollama.local.com:11434",
    })
  )
  .setEmbeddingModel(
    new OllamaEmbeddings({
      model: "deepseek-r1:1.5b",
      baseUrl: "http://ollama.local.com:11434",
    })
  )
  .setVectorDatabase(new HNSWDb())
  .build();

for (let i = 0; i < arr.length; i++) {
  await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: arr[i] }));
}

//await ragApplication.addLoader(new PdfLoader({ filePathOrUrl: "info.pdf" }));
let output = await ragApplication.query("Summarize 3.pdf");

console.log(await ragApplication.getLoaders());

console.log(output);

