interface ImpUser {
    user: String
}

class User implements ImpUser {
    user: String = ""
}


class State extends User {

}

const state = new State()

export default state;