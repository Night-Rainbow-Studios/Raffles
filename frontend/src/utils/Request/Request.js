export default class Request{

    #options = {}
    #query=""

    constructor(options){

        this.#options = options

    }

    query(params){

        var result =""

        Object.keys(params).forEach((key)=>{
            if(result!="")result+="&"
            result+=key+"="+params[key];

        })

        if(result!="")this.#query="?"+result;

        return this;

    }

    send(body){

        return new Promise((resolve,reject)=>{

            const xml = new XMLHttpRequest();

            xml.open(this.#options.method,this.#options.path+this.#query);

            xml.setRequestHeader("Content-Type","application/json")

            xml.addEventListener("load",(response)=>{
                console.log("Request result:");
                console.log(response);
                if(response.currentTarget.status>=400){
                    reject({error:response.currentTarget.status});
                    return 
                }

                resolve(JSON.parse(response.currentTarget.responseText));

            },false);

            xml.addEventListener("error",()=>{
                console.log("Error while sending request")
                reject({error:"Something goes wrong"})
            })

            xml.send(body)

        })

    }

}