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
Input.prototype.getValue = function(callback) {
    return {
        name: this.name,
        value: this.targetDomElement.value
    }
}
Input.prototype.reset = function(callback) {
    this.targetDomElement.value = "";
}