import axios from "axios";

export default class contentService {
    constructor() {

    }

    async getContent() {
        try {
            const response = await axios.get("http://localhost:8080/api/hero");
            return response.data
        } catch {
            return ""
        }
    }

}