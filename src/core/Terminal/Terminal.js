function Terminal(terminal){
    this.m_status = null;
    this.m_terminal = terminal;
    this.m_prompt = null;
    this.m_prompt_text = null;
    this.m_input = '';
    this.m_blinker = null;

    this.m_MODES = ['null','main', 'sub'];
}

// * getters / setters

Terminal.prototype.getMode = function () {return this.m_status};
Terminal.prototype.getInput = function (){return this.m_input};

Terminal.prototype.newPrompt = function (){
    if(this.m_status != 'main') {
        console.log("Terminal is toggled off.");
        return;
    }
    const prompt = document.createElement('p');
    const content = document.createElement('span');
    content.classList.add('prompt_text');
    prompt.classList.add("prompt");
    prompt.innerHTML = "$";
    prompt.appendChild(content);
    this.m_prompt = prompt;
    this.m_prompt_text = content;
    this.m_terminal.appendChild(prompt);
    this.add_blinker();
}

Terminal.prototype.readKey = function(e){
    if (e.ctrlKey) return;
    if (e.keyCode == 13) { //Enter
        this.submit();
        this.toggle('null');
        return 'submit';
    }
    if(e.keyCode == 8){
        this.backSpace();
        return;
    }
    if (e.key.length > 1) return;
    this.m_prompt_text.innerText += e.key;
}

Terminal.prototype.specialKeys = function(e){
    if(!(e.keyCode > 36 && e.keyCode < 41)) return;

    if(e.key == "ArrowLeft"){
        this.move_blinker_left();
    }else if(e.key == "ArrowRight"){
        this.move_blinker_right();
    }



}

Terminal.prototype.backSpace = function(){
    var length = this.m_prompt_text.innerText.length;
    var text = this.m_prompt_text.innerText.slice(0,length - 1);
    this.m_prompt_text.innerText = text;
}

Terminal.prototype.removePrompt = function(){
    this.m_prompt.classList.remove("prompt");
    this.m_prompt = null;
}

Terminal.prototype.toggle = function(val){
    let pos = this.m_MODES.indexOf(val);
    if(pos < 0){
        throw new Error("Terminal.toggle -> Invalid mode specified.");
        return;
    }
    this.m_status = val;
}

Terminal.prototype.submit = function(){
    this.m_input = this.m_prompt_text.innerText + this.m_blinker.innerText;
    this.m_prompt_text.innerText += this.m_blinker.innerText;
    this.remove_blinker();
    this.removePrompt();

}

// * Blinker

Terminal.prototype.add_blinker = function(){
    let el = document.createElement('span');
    el.classList.add('blink');
    el.innerText = "";
    this.m_blinker = el;
    this.m_prompt.appendChild(el);
}

Terminal.prototype.remove_blinker = function(){
    this.m_blinker.remove();
    this.m_blinker = null;
}

Terminal.prototype.move_blinker_left = function(){
    console.log("running");
    this.m_blinker.innerText = this.m_prompt_text.innerText.slice(-1,) + this.m_blinker.innerText;
    this.m_prompt_text.innerText = this.m_prompt_text.innerText.slice(0,-1);
}

Terminal.prototype.move_blinker_right = function(){
    this.m_prompt_text.innerText +=   this.m_blinker.innerText.slice(0,1);
    this.m_blinker.innerText = this.m_blinker.innerText.slice(1);
}

export default Terminal;