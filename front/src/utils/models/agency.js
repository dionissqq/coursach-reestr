import Server from '../server';

export default class Agency {
    static async save (body) {
        return Server.makeARequest("/agencies", Server.Method.POST, body);
    }

    static async getById (id) {
        return Server.makeARequest("/agencies/" + id, Server.Method.GET);
    }

    static async delete (id) {
        return Server.makeARequest("/agencies/" + id, Server.Method.DELETE);
    }
}