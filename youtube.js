const puppeteer=require("puppeteer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();

const { answers } = require("./codes");
let link="https://www.youtube.com/playlist?list=PL-Jc9J83PIiEeD3I4VXETPDmzJ3Z1rWb4";
async function Automation(){
     let browserInstance=await puppeteer.launch(
         {
             headless:false,
             args:['--start-maximized'],
             defaultViewport:null,
             slowMo:10
         }
     );
     let newPage=await browserInstance.newPage();
     await newPage.goto(link);
     let playlistTitle=await newPage.evaluate((selector)=>{return document.querySelector(selector).innerText},`#title a[class="yt-simple-endpoint style-scope yt-formatted-string"]`);
     console.log(playlistTitle);   
     let playListData=await newPage.evaluate((selector)=>{let playlistData=document.querySelectorAll(selector);let totalVideos=playlistData[0].innerText;let totalViews=playlistData[1].innerText;return {totalVideos,totalViews} },`div[id="stats"] yt-formatted-string[class="style-scope ytd-playlist-sidebar-primary-info-renderer"]`);
     let totalVideos=playListData.totalVideos.split(" ")[0];
     let totalViews=playListData.totalViews;
     console.log("totalVideos : "+totalVideos+" totalViews "+totalViews);
     await newPage.waitForSelector(".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer");
     let currentVideoLength=await getVideoLength(newPage);
    // console.log("current video length "+currentVideoLength);
         
     // scroll after every 100 videos
     
     while(totalVideos!=currentVideoLength){
         await scrollToBottom(newPage,currentVideoLength);
         currentVideoLength=await getVideoLength(newPage);
        // console.log("within while loop");
       //  console.log("current length "+currentVideoLength);   
     }
     
   // await scrollToBottom(newPage);
   //  console.log("ab call hoga");
     let titles=await newPage.evaluate((selector)=>{
         let videoData= document.querySelectorAll(selector);
         let titleData=[];
         for(var i=0;i<videoData.length;i++){
            titleData.push(videoData[i].innerText.trim());
        }
        return titleData;
        },".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer");
     console.log("titles : "+titles);
     //#overlays  ytd-thumbnail-overlay-time-status-renderer  #text
     let timings=await newPage.evaluate((selector)=>{
        let videoData= document.querySelectorAll(selector);
        let timingData=[];
        for(var i=0;i<videoData.length;i++){
           timingData.push(videoData[i].innerText.trim());
       }
      return timingData;
    //  return videoData.length;
       },"#overlays  ytd-thumbnail-overlay-time-status-renderer  #text");
  //  console.log("timings : "+timings);

    console.log("timings len "+timings.length +" title length "+titles.length);

   let data=[];
   for(var i=0;i<totalVideos;i++){
       let videoElement={
           "title": titles[i],
           "time":timings[i]
       }
       data.push(videoElement);
   }

   doc.pipe(fs.createWriteStream('output.pdf'));
   doc.text(JSON.stringify(data));
   doc.end();




}
async function scrollToBottom(page){
     await page.evaluate(()=>{
       window.scrollBy(0,window.innerHeight);
    //   //  window.scrollBy(0,600);
    //   window.scrollTo(0, document.body.scrollHeight);
     })
        
}

async function getVideoLength(page){
    let length=await page.evaluate((selector)=>{
        return document.querySelectorAll(selector).length;
    },".yt-simple-endpoint.style-scope.ytd-playlist-video-renderer");
    return length;
}
Automation();