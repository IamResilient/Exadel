function FormItem(obj) {
    this.name = obj.name;
    this.class = obj.class;
    this.type = obj.type;
}
``
function Form(obj) { 

    this.form = document.createElement('form');
    this.form.id = obj.id;
    this.form.method = obj.method;
    document.body.appendChild(this.form);

    this.array = [];

    this.add = function() {
        this.form = document.getElementById(this.form.id);
        for(var i = 0; i<arguments.length; i++) { 
            if(arguments[i] instanceof Select) {
                this.elem = document.createElement('select');
            } else if(arguments[i] instanceof Button) {
                this.elem = document.createElement('button');
                this.elem.type = arguments[i].type;
                this.elem.className = arguments[i].class;
                this.elem.innerHTML = arguments[i].name;
            } else if(arguments[i] instanceof CheckBox) {
                this.elem = document.createElement('input');
                this.elem.type = 'checkbox';          
            } else if(arguments[i] instanceof Radio) {
                this.elem = document.createElement('input');
                this.elem.type = 'radio';
            } else if(arguments[i] instanceof Text) {
                this.elem = document.createElement('input');
                this.elem.className = arguments[i].class;
            }
            this.elem.name = arguments[i].name;
            arguments[i].elem = this.elem;
            this.array.push(arguments[i]);
        }
    }

    this.delete = function() {
        for(var i = 0; i < arguments.length; i++){
            for(var j = 0; j < this.array.length; j++) {
                if(arguments[i].elem == this.array[j].elem) {
                    this.array.splice(j, 1);
                }
            }
        }     
    }

    this.move = function(obj, num) {
        this.obj = obj;
        this.num = num;
        this.index = this.array.indexOf(this.obj);
        for(var j = 0; j < this.array.length; j++) {
            if(num == j) {
                this.array.splice(num, 0, this.obj);
                this.array.splice(this.index+1, 1);
            }    
        }
    }

    this.hide = function() {
        for(var i = 0; i < arguments.length; i++) {
            for(var j = 0; j < this.array.length; j++) {
                if(arguments[i].elem == this.array[j].elem) {
                    this.array[j].elem.style.visibility = "hidden";    
                }        
            }
        }
    }

    this.render = function() {
        this.form = document.getElementById(this.form.id);
        this.form.innerHTML = "";
        for(var i = 0; i<this.array.length; i++) {
            this.form.appendChild(this.array[i].elem);
        }
    }


    this.send = function() {
        var form = document.getElementById(1);
        var childs = form.childNodes;
        form.addEventListener('click', function(button) {
            if (button.target.name == 'Send') {
                var someArray = [];
                for(var i = 0; i < childs.length; i++) {
                    if(childs[i].tagName == 'INPUT') {
                        someArray.push(childs[i].value);
                    } 
                }
                var data = JSON.stringify(someArray); 

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://example.com", true)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        alert("Все хорошо!");  
                        for(var i = 0; i < childs.length; i++) {
                            childs[i].value = "";
                        }                   
                    } else if (xhr.status != 200) {
                        alert( xhr.status + ': ' + xhr.statusText );
                    }
                }
                xhr.send(data);
            }           
        })
    }
}

var form1 = new Form({
    id: 1,
})


function Select() {
    FormItem.apply(this, arguments);
}

var select1 = new Button({
    name: 'someSelect1',
    class: 'select1'
})

var select2 = new Button({
    name: 'someSelect2',
    class: 'select2'
})

function Button() {
    FormItem.apply(this, arguments);
}

var button1 = new Button({
    name: 'Send',
    class: 'send',
    type: 'button'
})

var button2 = new Button({
    name: 'Reset',
    class: 'reset',
    type: 'reset'

})

function CheckBox() {
    FormItem.apply(this, arguments);
}

var checkbox1 = new CheckBox({
    name: 'someCheckBox1',
    class: 'checkbox1'
})

var checkbox2 = new CheckBox({
    name: 'someCheckBox2',
    class: 'checkbox2'
})

function Radio() {
    FormItem.apply(this, arguments);
}

var radio1 = new CheckBox({
    name: 'someRadio1',
    class: 'radio1'
})

var radio2 = new CheckBox({
    name: 'someRadio2',
    class: 'radio2'
})

function Text() {
    FormItem.apply(this, arguments);
}

var text1 = new Text({
    name: 'someText1',
    class: 'text1'
})

var text2 = new Text({
    name: 'someText1',
    class: 'text1'
})

form1.add(text1, text2, button1, button2);
// form1.delete(button1, checkbox2);
// form1.move(checkbox1, 0);
// form1.hide(button2);
form1.render();
form1.send();

