const puppeteer=require('puppeteer');
const dotenv = require("dotenv")
dotenv.config()
let page;
const email=process.env.email;
const password=process.env.password;
let codesObj=require("./codes.js");
let loginUrl="https://www.hackerrank.com/auth/login";

async function Automation(){
    const browserOpen=await puppeteer.launch({headless:false,args:['--start-maximized'],
    defaultViewport:null,slowMo:10});
    let newpage=await browserOpen.newPage();
    await newpage.goto(loginUrl);
    await newpage.type(`input[id='input-1']`,email);
    await newpage.type(`input[id='input-2']`,password);
    await newpage.click(`button[data-analytics="LoginPassword"]`);
    await newpage.waitForSelector(".card-content h3[title='Interview Preparation Kit']",{visible:true});
    await newpage.click(`a[href="/domains/algorithms"]`);
    await waitAndClick(`input[value="warmup"]`,newpage);
    await newpage.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled  .ui-btn-icon",{visible:true});
    let questionArray=await newpage.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled .ui-btn-icon");
    await questionArray[0].click();
    await newpage.waitFor(5000);
    await waitAndClick(".checkbox-input",newpage);
    await waitAndClick(`textarea[id="input-1"]`,newpage);
    await newpage.waitFor(5000);
    await SubmitAnswer(`textarea[id="input-1"]`,codesObj.answers,newpage);
}
async function waitAndClick(selector,page){
    await page.waitForSelector(selector,{visible:true});
    await page.click(selector);
}
async function SubmitAnswer(textBox,answer,page){
    await page.type(textBox,answer,{delay:10});
    await page.keyboard.down("Control");
    await page.keyboard.press("A",{delay:20});
    await page.keyboard.press("X",{delay:30});
    await page.keyboard.up("Control");
    await page.click(".hr-monaco-editor-parent");
    await page.keyboard.down("Control");
    await page.keyboard.press("A",{delay:20});
    await page.keyboard.press("V",{delay:30});
    await page.click(`.hr-monaco-submit`);
}
Automation();
