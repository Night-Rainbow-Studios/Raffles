import Request from "./Request.js"

export default class Api{

    #options = {}

    constructor(options){

        this.#options = options;

    }


    post(path){

        return new Request({
            path:this.#options.host+"/"+path,
            method:"POST"
        })

    }

    put(path){

        return new Request({
            path:this.#options.host+"/"+path,
            method:"PUT"
        })

    }

    get(path){

        return new Request({
            path:this.#options.host+"/"+path,
            method:"GET"
        })

    }

}