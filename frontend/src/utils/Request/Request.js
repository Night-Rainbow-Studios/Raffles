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
                if(response.status>=400){
                    reject({error:response.status});
                    return 
                }

                resolve(response);

            },false);

            xml.addEventListener("error",()=>{

                reject({error:"Something goes wrong"})
            })

            xml.send(body)

        })

    }

}