function Button(options) {
    FormItem.call(this, options);
    this.domElem = document.createElement("button");
    this.domElem.setAttribute("id", this.id);
    this.domElem.innerText = options.label || "Button";
    if (typeof options.callback === "function") {
        this.domElem.addEventListener("click", options.callback.bind(this));
    }
}
Button.prototype = Object.create(FormItem.prototype);
Button.prototype.constructor = Button;