// https://observablehq.com/@d3/word-cloud@236
import define1 from "../wordcloud/define.js";

function _1(md){return(
md`# Word Cloud`
)}

function _2(WordCloud,words,width,invalidation){return(
WordCloud(words, {
  width,
  height: 1500,
  invalidation // a promise to stop the simulation when the cell is re-run
})
)}

function _3(howto){return(
howto("WordCloud")
)}

async function _source(Inputs,FileAttachment,width){return(
Inputs.textarea({
  value: (await FileAttachment("dream.txt").text()).trim(),
  rows: 20,
  width
})
)}

function _5(md){return(
md``
)}

function _WordCloud(d3,d3Cloud){return(
function WordCloud(text, {
  size = group => group.length, // Given a grouping of words, returns the size factor for that word
  word = d => d, // Given an item of the data array, returns the word
  marginTop = 0, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 0, // bottom margin, in pixels
  marginLeft = 0, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  maxWords = 100, // maximum number of words to extract from the text
  fontFamily = "sans-serif", // font family
  fontScale = 14, // base font size
  padding = 5, // amount of padding between the words (in pixels)
  rotate = 0, // a constant or function to rotate the words
  invalidation // when this promise resolves, stop the simulation
} = {}) {
  const words = typeof text === "string" ? text.split(/\W+/g) : Array.from(text);
  
  const data = d3.rollups(words, size, w => w)
    .sort(([, a], [, b]) => d3.descending(a, b))
    .slice(0, maxWords)
    .map(([key, size]) => ({text: word(key), size}));
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("font-family", fontFamily)
      .attr("text-anchor", "middle")
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);

  const cloud = d3Cloud()
      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
      .words(data)
      .padding(padding)
      .rotate(rotate)
      .font(fontFamily)
      .fontSize(d => Math.sqrt(d.size) * fontScale)
      .on("word", ({size, x, y, rotate, text}) => {
        g.append("text")
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text);
      });

  cloud.start();
  invalidation && invalidation.then(() => cloud.stop());
  return svg.node();
}
)}

function _7(md){return(
md``
)}

function _words(source,stopwords){return(
//source.split(/[\s]+/g)
source.split(/[\n]+/g)       //完整字詞
  .map(w => w.replace(/^[“‘"\-—()\[\]{}]+/g, ""))
  .map(w => w.replace(/[;:.!?()\[\]{},"'’”\-—]+$/g, ""))
  .map(w => w.replace(/['’]s$/g, ""))
  .map(w => w.substring(0, 50))
  //.map(w => w.toLowerCase())
  .filter(w => w && !stopwords.has(w))
)}

function _9(words){return(
words.filter(w => /\W/.test(w))
)}

function _stopwords(){return(
new Set("target,SDG 1,SDG 2,SDG 3,SDG 4,SDG 5,SDG 6,SDG 7,SDG 8,SDG 9,SDG 10,SDG 11,SDG 12,SDG 13,SDG 14,SDG 15,SDG 16,SDG 17,the,and,to,of,from,on,as,in".split(","))
)}

function _11(WordCloud){return(
WordCloud("Hello, World! This is a small cloud for your enjoyment", {
  width: 250,
  height: 100,
  size: () => .3 + Math.random(),
  rotate: () => (~~(Math.random() * 6) - 3) * 30
})
)}

function _d3Cloud(require){return(
require("d3-cloud@1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["dream.txt", {url: new URL("../Csv/Keyword/KW20102020.csv", import.meta.url), mimeType: "text/plain", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  //main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["WordCloud","words","width","invalidation"], _2);
  //main.variable(observer()).define(["howto"], _3);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs","FileAttachment","width"], _source);
  main.variable(("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  //main.variable(observer()).define(["md"], _5);
  main.variable(("WordCloud")).define("WordCloud", ["d3","d3Cloud"], _WordCloud);
  //main.variable(observer()).define(["md"], _7);
  main.variable(("words")).define("words", ["source","stopwords"], _words);
  //main.variable(observer()).define(["words"], _9);
  main.variable(observer("stopwords")).define("stopwords", _stopwords);
  //main.variable(observer()).define(["WordCloud"], _11);
  main.variable(("d3Cloud")).define("d3Cloud", ["require"], _d3Cloud);
  const child1 = runtime.module(define1);
  //main.import("howto", child1);
  return main;
}
