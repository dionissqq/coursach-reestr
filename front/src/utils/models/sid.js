import Server from '../server';

export default class SID {
    static getAll (query) {
        return Server.makeARequest(`/${query.kind}?name=${query.name}&type=${query.type}`);
    }
}