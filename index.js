
const puppeteer=require('puppeteer');
const browserOpen=puppeteer.launch({headless:false,args:['--start-maximized'],
defaultViewport:null,slowMo:10});
const dotenv = require("dotenv")
dotenv.config()
let page;
const email=process.env.email;
const password=process.env.password;
let codesObj=require("./codes.js");
let loginUrl="https://www.hackerrank.com/auth/login";
browserOpen.then((browserObj)=>{
   let newpagePromise=browserObj.newPage();
   return newpagePromise;
}).then((newPage)=>{
    console.log("new Page assigned");
   page=newPage;
   let openHackerRank=page.goto(loginUrl);
   return openHackerRank;
}).then(()=>{
    return page.waitForSelector(`input[id='input-1']`,{visible:true});
}).then(()=>{
    let enterEmail=page.type(`input[id='input-1']`,email);
    return enterEmail;
}).then(()=>{
    let enterPassword=page.type(`input[id='input-2']`,password);
    return enterPassword;
}).then(()=>{
    let loginClick=page.click(`button[data-analytics="LoginPassword"]`);
    return loginClick;
}).then(()=>{
    console.log("login clicked");
 return page.waitForSelector(".card-content h3[title='Interview Preparation Kit']",{visible:true});
 //console.log("return hua ");
 //console.log(waitForAlgorithm);
 //return waitForAlgorithm;   
}).then(()=>{
     //console.log("seen kra ");
     let AlgorithmClick=page.click(`a[href="/domains/algorithms"]`);
     return AlgorithmClick;
}).then(()=>{
    let warmuplick=waitAndClick(`input[value="warmup"]`);
    return warmuplick;
}).then(()=>{
  let waitForQuestions=page.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled  .ui-btn-icon",{visible:true});
  return waitForQuestions;
}).then(()=>{
    let questionArray=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled .ui-btn-icon");
     return questionArray;
}).then((questionArray)=>{
    let question=questionArray[0].click();
     return question;
}).then(()=>{
let waitFor3Seconds=page.waitFor(5000);
return waitFor3Seconds;
}).then(()=>{
    let waitForTestCaseCheckBox=waitAndClick(".checkbox-input");
     return waitForTestCaseCheckBox;
 }).then(()=>{
      let waitForTextBox=waitAndClick(`textarea[id="input-4"]`);
      return waitForTextBox;
  }).then(()=>{
    let waitFor3Seconds=page.waitFor(5000);
    return waitFor3Seconds;
  }).then(()=>{
    let typeAndSubmitAnswer=SubmitAnswer(`textarea[id="input-1"]`,codesObj.answers);
    return typeAndSubmitAnswer;
}).then(()=>{
    console.log("Success");
}).catch((err)=>{
    console.log(err);
});
function waitAndClick(selector){
    let waitForWarmup=page.waitForSelector(selector,{visible:true});
    waitForWarmup.then(()=>{
      let Warmupclick=page.click(selector);
      return Warmupclick;
    });
}
function SubmitAnswer(textBox,answer){
        let typeAnswer=page.type(textBox,answer,{delay:10});
        typeAnswer.then(()=>{
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(()=>{
            let AIsPressed=page.keyboard.press("A",{delay:20});
            return AIsPressed;
        }).then(()=>{
            let XIsPressed=page.keyboard.press("X",{delay:30});
            return XIsPressed;
        }).then(()=>{
            let ctrlIsPressed=page.keyboard.up("Control");
            return ctrlIsPressed;
        }).then(()=>{
           let clickEditor=page.click(".hr-monaco-editor-parent");
           return clickEditor;
        }).then(()=>{
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(()=>{
            let AIsPressed=page.keyboard.press("A",{delay:20});
            return AIsPressed;
        }).then(()=>{
            let VIsPressed=page.keyboard.press("V",{delay:20});
            return VIsPressed;
        }).then(()=>{
           let clickSubmit=page.click(`.hr-monaco-submit`);
           return clickSubmit;
        });
}


