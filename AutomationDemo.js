const puppeteer=require("puppeteer");
const browserPromise=puppeteer.launch({headless:false,args: ['--start-maximized'],defaultViewport: null,});
let page;
browserPromise.then((browser)=>{
    console.log("browser opened");
    let pageArrayPromise=browser.pages();
    return pageArrayPromise;
}).then((pageArray)=>{
    page=pageArray[0];
    let redirectPromise=page.goto("https://www.google.com/");
    return redirectPromise;
}).then(()=>{
    let elementWaitPromise=page.waitForSelector(".gLFyf.gsfi",{visible:true});
    return elementWaitPromise;
}).then(()=>{
   const keyWillSendPromise=page.type(".gLFyf.gsfi","pepcoding");
   return keyWillSendPromise;
}).then(()=>{
  const pressEnterPromise=page.keyboard.press("Enter");
  return pressEnterPromise;
}).then(()=>{
  let elementWaitPromise=page.waitForSelector(".eKjLze .g .yuRUbf>a>.LC20lb.MBeuO.DKV0Md",{visible:true});
  return elementWaitPromise;
}).then(()=>{
   let finalLinkClickPromise=page.click(".eKjLze .g .yuRUbf>a>.LC20lb.MBeuO.DKV0Md");
   return finalLinkClickPromise;
}).then(()=>{
   console.log("Welcome");
}).catch((err)=>{
    console.log(err);
})