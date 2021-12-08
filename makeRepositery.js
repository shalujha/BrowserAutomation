const puppeteer=require("puppeteer");
const browserPromise=puppeteer.launch({headless:false,
    args: ['--start-maximized'],
    defaultViewport: null,
slowMo:20});
let page;
const nameOfRepositery="BrowserAutomations";
browserPromise.then((browser)=>{
    console.log("browser opened");
    let pageArrayPromise=browser.pages();
    return pageArrayPromise;
}).then((pageArray)=>{
    page=pageArray[0];
    let redirectPromise=page.goto("https://www.github.com/");
    return redirectPromise;
}).then(()=>{
  let waitForSignin=page.waitForSelector(`a[href="/login"]`);
  return waitForSignin;
}).then(()=>{
   let clickOnSignIn=page.click(`a[href="/login"]`);
   return clickOnSignIn;
}).then(()=>{
let waitForInputPromise=page.waitForSelector(`input[id="login_field"]`);
return waitForInputPromise;
}).then(()=>{
let userNameEnterPromise=page.type(`input[id="login_field"]`,"shalujha219999@gmail.com");
return userNameEnterPromise;
}).then(()=>{
let passwordPromise=page.type(`input[type="password"]`,"One2Three45Six");
return passwordPromise;
}).then(()=>{
    let SignInPromise=page.click(`input[value="Sign in"]`);
    return SignInPromise;
})
.then(()=>{
    let waitForAddIconPromise=page.waitForSelector(`svg[class="octicon octicon-plus"]`,{visible:true});
    return waitForAddIconPromise;
}).then(()=>{
   let clickOnAddPromise=page.click(`svg[class="octicon octicon-plus"]`);
   return clickOnAddPromise;

}).then(()=>{
    let chooseNewRepositeryWait=page.waitForSelector(`a[data-ga-click="Header, create new repository"]`);
    return chooseNewRepositeryWait;
}).then(()=>{
  let chooseNewRepositery=page.click(`a[data-ga-click="Header, create new repository"]`);
  return chooseNewRepositery;
}).then(()=>{
  let elementWaitPromise=page.waitForSelector(`input[id="repository_name"]`,{visible:true});
  return elementWaitPromise;
}).then(()=>{
   let EnterrepoNamePromise=page.type(`input[id="repository_name"]`,nameOfRepositery);
   return EnterrepoNamePromise;
}).then(()=>{
   let clickCreateRepoPromise=page.click(`button[data-disable-with="Creating repository&hellip;"]`);
   return clickCreateRepoPromise;
}).then(()=>{
 console.log("Repositery Created");
}).catch((err)=>{
    console.log(err);
})