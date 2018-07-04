function FormItem(obj) {
    this.name = obj.name;
    this.class = obj.class;
    this.type = obj.type;
    this.id = obj.id;
    this.function = obj.function;
}

function Form(obj) {
    this.form = document.createElement('form');
    this.form.id = obj.id;
    this.form.className = obj.class;
    document.body.appendChild(this.form);

    this.array = [];

    this.add = function() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] instanceof Text) {
                this.elem = document.createElement('input');
                this.elem.name = arguments[i].name;
                this.elem.className = arguments[i].class;
            } else if (arguments[i] instanceof CheckBox) {
                this.elem = document.createElement('input');
                this.elem.name = arguments[i].name;
                this.elem.className = arguments[i].class;
                this.elem.type = 'checkbox';
            } else if (arguments[i] instanceof Radio) {
                this.elem = document.createElement('input');
                this.elem.name = arguments[i].name;
                this.elem.className = arguments[i].class;
                this.elem.type = 'radio';
            } else if (arguments[i] instanceof Button) {
                this.elem = document.createElement('button');
                this.elem.innerHTML = arguments[i].name;
                this.elem.id = arguments[i].id;
                this.elem.type = arguments[i].type;
                this.elem.className = arguments[i].class;
                this.elem.setAttribute("onclick", arguments[i].function || "");
            }

            this.clone = {};
            this.clone.elem = this.elem;
            this.elem = this.clone.elem;
            var form = this;
            this.clone.elem.getParent = function() {
                return form;
            }
            this.clone.getValue = function() {   
                if (this.elem.tagName == "INPUT" && this.elem.type == "checkbox") {
                    return this.elem.checked;
                } else if (this.elem.tagName == "INPUT" && this.elem.type == "radio") {
                    return this.elem.checked;
                } else if (this.elem.tagName == "INPUT") {
                    return this.elem.value;
                }
            }
            this.clone.resetValue = function() {
                if (this.elem.tagName == "INPUT" && this.elem.type == "checkbox") {
                    return this.elem.checked = false;
                } else if (this.elem.tagName == "INPUT" && this.elem.type == "radio") {
                    return this.elem.checked = false;
                } else if (this.elem.tagName == "INPUT") {
                    return this.elem.value = "";
                }
            }
            this.array.push(this.clone); 
        }
    }

    this.move = function(obj, num) {
        this.obj = obj;
        this.num = num;
        this.index = this.array.indexOf(this.obj);
        for (var j = 0; j < this.array.length; j++) {
            if (num == j) {
                this.array.splice(num, 0, this.obj);
                this.array.splice(this.index + 1, 1);
            }    
        }
    }

    this.delete = function() {
        for (var i = 0; i < arguments.length; i++){
            for (var j = 0; j < this.array.length; j++) {
                if (arguments[i].elem == this.array[j].elem) {
                    this.array.splice(j, 1);
                }
            }
        }     
    }

    this.hide = function() {
        for (var i = 0; i < arguments.length; i++) {
            for (var j = 0; j < this.array.length; j++) {
                if (arguments[i].elem == this.array[j].elem) {
                    this.array[j].elem.style.visibility = "hidden";    
                }        
            }
        }
    }

    this.send = function() {
        var array = this.array;  
        this.someArray = [];
        for (var i = 0; i < array.length; i++) {
            this.someArray.push(array[i].getValue())
        }
        console.log(this.someArray);
        var data = JSON.stringify(this.someArray);         
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://example.com", true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                for (var j = 0; j < array.length; j++) {
                    array[j].resetValue();
                }
                alert("Запрос выполнен успешно!");                   
            } else if (xhr.status != 200) {
            alert( xhr.status + ': ' + xhr.statusText );
            }
        }
        xhr.send(data);
    }

    this.render = function() {
        this.form = document.getElementById(this.form.id);
        this.form.innerHTML = "";
        for (var i = 0; i < this.array.length; i++) {
            this.form.appendChild(this.array[i].elem);
        }
    }
}

var form1 = new Form({
    id: 1,
    class: 'form',
})

var form2 = new Form({
    id: 2,
    class: 'form',
})

function Button() {
    FormItem.apply(this, arguments);
}

var send = new Button({
    id: 'send',
    name: 'Send',
    class: 'send',
    type: 'button',
    function: 'getParent().send()'
})

var reset = new Button({
    id: 'reset',
    name: 'Reset',
    class: 'reset',
    type: 'reset'

})

function CheckBox() {
    FormItem.apply(this, arguments);
}

var checkbox1 = new CheckBox({
    name: 'someCheckBox1',
    class: 'checkbox'
})

var checkbox2 = new CheckBox({
    name: 'someCheckBox2',
    class: 'checkbox'
})

function Radio() {
    FormItem.apply(this, arguments);
}

var radio1 = new Radio({
    name: 'someRadio1',
    class: 'radio'
})

var radio2 = new Radio({
    name: 'someRadio2',
    class: 'radio'
})

function Text() {
    FormItem.apply(this, arguments);
}

var text1 = new Text({
    name: 'someText1',
    class: 'text'
})

var text2 = new Text({
    name: 'someText2',
    class: 'text'
})

form1.add(text1, text2, checkbox1, checkbox2, radio1, radio2, send, reset);
form1.render();

form2.add(text1, text2, checkbox1, checkbox2, radio1, radio2, send, reset);
form2.render();