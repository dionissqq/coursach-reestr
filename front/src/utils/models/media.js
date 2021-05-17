import Server from '../server';

export default class Media {
    static async save (body) {
        return Server.makeARequest("/media", Server.Method.POST, body);
    }

    static async getById (id) {
        return Server.makeARequest("/media/" + id, Server.Method.GET);
    }

    static async delete (id) {
        return Server.makeARequest("/media/" + id, Server.Method.DELETE);
    }
}