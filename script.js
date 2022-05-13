console.log('PostMan clone')

// Utility function to get DOM element from string
function getElementFromStr(string){
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;
}


// initialize parameter count
let addedParamCount = 0;

// hide the paramsbox initially
let paramBox = document.getElementById('paramBox');
paramBox.style.display = 'none';

// if user click on params box, hide the json box
let paramsRadio = document.getElementById('params')
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('paramBox').style.display = 'block'
})



// if user click on json box, hide the params box
let jsonRadio = document.getElementById('json')
jsonRadio.addEventListener('click',()=>{
    document.getElementById('paramBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})


// if the user clicks on + button add mor parameters

let addParams = document.getElementById('addParams')
addParams.addEventListener('click',()=>{
    let addedParams = document.getElementById('addedparams');
    let Str = `<div class="row my-3">
                    <label for="parameters" class="col-sm-2 col-form-label">Parameter${addedParamCount +2}</label>
                    <div class="col">
                        <input type="text" id="key${addedParamCount +2}" class="form-control" placeholder="Enter Parameter${addedParamCount +2} key">
                    </div>
                    <div class="col">
                        <input type="text" id="value${addedParamCount +2}" class="form-control" placeholder="Enter Parameter${addedParamCount +2} value">
                    </div>
                    <div class="col">
                        <button class="btn btn-primary removeParams">-</button>
                    </div>
                </div>`
    // Convert the element string to DOm node
    let paramElement = getElementFromStr(Str)
    addedParams.appendChild(paramElement)

    // Add an event listner to remove parameter on clicking - button
    let removeParam = document.getElementsByClassName('removeParams')
    for(let item of removeParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove()

        })
    }
                addedParamCount++;
})


// if user clicks on submit button

let submit = document.getElementById('submit')
submit.addEventListener('click',()=>{
    document.getElementById('responsePrism').innerHTML = "Fetching Response... Please wait..."


    // fetch all the values that user entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value
    // if user used params option insted of json collect all the params
    if(contentType == 'params'){
        data = {}
        for(let i =0;i<addedParamCount+1;i++){
            if(document.getElementById('key' + (i+1)) != undefined){
                let key = document.getElementById('key' + (i+1)).value
                let value = document.getElementById('value'+ (i+1)).value
                data[key] = value
            }
        }
        data = JSON.stringify(data)
    }else{
        data = document.getElementById('jsonRequesttext').value
    }
    


    // if requesttype is GET invoke fetch api
    if(requestType == 'get'){
        fetch(url,{
            method:'GET'
        })
        .then(response=>response.text())
        .then(text=>{
            document.getElementById('responsePrism').innerHTML = text
            Prism.highlightAll();
        })
    }else{
        fetch(url,{
            method:'POST',
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            },
            body: data
        })
        .then(response=>response.text())
        .then(text=>{
            document.getElementById('responsePrism').innerHTML = text
            Prism.highlightAll();
        })
    }

})