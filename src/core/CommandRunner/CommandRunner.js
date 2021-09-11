const CommandRunner = (function (){

    // test comands
    let _commands = {
        echo: function(){
            alert("echo");
        }
    }

    function run(command){
        let args = undefined;
        if(typeof(command) == "object"){
            if(command.length > 1){
                args = command[1];
            }

            if(_commands[command[0]]){
                _commands[command[0]](args);
            }else{
                //TODO invalid command
            }
        }else{
            if(command == ''){
                return;
            }
        }
    }

    return {
        run
    }

})();

export default CommandRunner;