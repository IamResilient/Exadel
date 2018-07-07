var buttonSend = new Button({
    id: "b1",
    name: "b1",
    label: "Send",
    callback: function() {
        this.getParentForm().send();
    }
})

var buttonReset = new Button({
    id: "b2",
    name: "b2",
    label: "Reset",
    callback: function() {
        this.getParentForm().reset();
    }
})

var num = new Input({
    id: "num",
    name: "num",
    type: "text",
    value: "90",
    label: "Enter number (0-100)",
})

var email = new Input({
    id: "email",
    name: "email",
    type: "text",
    value: "address@gmail.com",
    label: "Enter address",
})

var sex = new Select({
    id: "sex",
    name: "sex",
    value: "male",
    label: "Sex",
    optionsArray: [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"}
    ]
})

var form1 = new Form({
    id: "m1",
    name: "m1",
    containerSelector: "body",
    targetUrl: "http://example.com",
    className: "form form1"
})
form1.add(num, email, buttonSend, buttonReset);
// form1.move(buttonReset, 0);
