// JavaScript source code
function chatViewModel() {
    var self = this;
    var dateTime = new Date().toString();
    self.users = ko.observableArray();
    self.chat = ko.observableArray();
    self.newUserName = ko.observable("");
    self.addUser = function () {
        if (self.newUserName() != "") {
            self.users.push(new User(self.newUserName(), self.users().length + 1));
            self.newUserName("");
        }
    }

    self.messageAll = function (userFrom) {
        if(userFrom.newText() !=""){
            self.users().forEach(function (userTo) {
                userTo.receiveMessage(userFrom.name, userFrom.newText(), dateTime);
            });
            self.chat.push(new Message(userFrom.name, userFrom.newText(), dateTime))
            userFrom.newText("");
        }
    };
    self.sendFullHistory = function (user) {
        console.info("historico", self.chat());
        user.history(self.chat().slice(0));
    }

}

function User(name, id) {
    var self = this;
    if (isMe(name)) {
        name += " the wizard";
    }
    self.name = name;
    self.id = id;
    self.history = ko.observableArray();
    self.newText = ko.observable("");
    self.receiveMessage = function (userFrom, text, dateTime) {
        self.history.push(new Message(userFrom, text, dateTime));
    }
}
function Message(userFrom, text, dateTime) {
    var self = this;
    self.userFrom = userFrom;
    self.text = text;
    self.dateTime = dateTime;
}
function isMe(name) { return (name == 'Mike') }