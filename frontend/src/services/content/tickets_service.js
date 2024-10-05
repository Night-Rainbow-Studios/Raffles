import axios from "axios";

export default class ticketsService {
    constructor() {

    }

    async getContent() {
        try {
            const response = await axios.get("http://localhost:8080/api/tickets");
            return response.data
        } catch {
            return ""
        }
    }

}