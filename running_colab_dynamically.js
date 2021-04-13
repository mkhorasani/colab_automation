//Creating log to store error/warning messages
var logOfConsole = [];

var _log = console.log,
    _warn = console.warn,//new
    _error = console.error;//new

//Logging errors function
console.error = function() {
    logOfConsole.push({method: 'error', arguments: 'Arguments ["No output window available", callee: ƒ, Symbol(Symbol.iterator): ƒ]'});
    return _error.apply(console, arguments);
};

//Logging warning function
console.warn = function() {
    logOfConsole.push({method: 'warn', arguments: 'Arguments ["Ignoring benign restart error: CustomError:", callee: ƒ, Symbol(Symbol.iterator): ƒ]'});
    return _warn.apply(console, arguments);
};

//Sleep function
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//Start function
const start = async () => {

  //Click on connect button
  document.querySelector("#top-toolbar > colab-connect-button").shadowRoot.querySelector("#connect").click();
  //Wait for the VM to connect
  await sleep(10000);

  //Run script
  document.querySelector("colab-run-button").click();
 }
 
//End function
const end = async () => {

  if (logOfConsole.length > 0) {
  
    //Click on menu button
    document.querySelector("#top-toolbar > colab-connect-button").shadowRoot.querySelector("#connect-button-resource-display > colab-usage-bar.disk").click();
    await sleep(5000);

    //Click on manage sessions
    document.querySelector("body > div.notebook-vertical > div.notebook-horizontal > div.layout.vertical.grow > colab-tab-layout-container > colab-tab-pane > colab-resizer > div.layout.vertical.grow > iron-pages > colab-tab > colab-shaded-scroller > colab-usage-display").shadowRoot.querySelector("div:nth-child(4) > paper-button:nth-child(1)").click();
    await sleep(5000);

    //Click on terminate session
    document.querySelector("body > colab-dialog > paper-dialog > colab-sessions-dialog").shadowRoot.querySelector("div.dialog-main-content > div.sessions-content.layout.vertical > div.dialog-table > colab-session > div.button-action-column > paper-button").click();
    await sleep(2000);

    //Click on okay buttom if prompted
    try {
      document.querySelector("#ok").click();
      await sleep(2000);
    }
    catch(err) {
      console.log('No okay button')
    }
  }
}

//Run start function
start();

//Run end function
setInterval(end,5000);
