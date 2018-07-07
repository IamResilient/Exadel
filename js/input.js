function Input(options) {
    FormItem.call(this, options);
    this.domElem = document.createElement("div");
    this.addLabel(options.label);
    this.targetDomElement = document.createElement("input");
    this.targetDomElement.setAttribute("id", this.id);
    this.targetDomElement.setAttribute("name", this.name);
    this.targetDomElement.setAttribute("type", this.type);
    this.targetDomElement.value = options.value || "";
    this.domElem.append(this.targetDomElement);
}
Input.prototype = Object.create(FormItem.prototype);
Input.prototype.constructor = Input;
Input.prototype.validator = function() {
    if (this.targetDomElement.id == "email") {
        this.email = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        this.match = this.targetDomElement.value.match(this.email);
        if (this.match){
            if (this.span) {
                this.span.remove();
            }
            return true;
        } else {
            if (this.span) {

            } else {
                this.span = document.createElement('span');
                this.span.style.color = "red"
                this.span.innerHTML = 'Email is not correct!';
                this.targetDomElement.after(this.span);
            } 
            return false;
        }              
    } else if (this.targetDomElement.id == "num") {
        this.num = "[0-9]";
        this.match = this.targetDomElement.value.match(this.num);
        if (this.match && this.targetDomElement.value <= 100){
            if (this.span) {
                this.span.remove();
            }
            return true;
        } else {
            if (this.span) {

            } else {
                this.span = document.createElement('span');
                this.span.style.color = "red"
                this.span.innerHTML = 'Email is not correct!';
                this.targetDomElement.after(this.span);
            }   
            return false;
        }
    }
}
Input.prototype.getValue = function(callback) {
    return {
        name: this.name,
        value: this.targetDomElement.value
    }
}
Input.prototype.reset = function(callback) {
    this.targetDomElement.value = "";
}