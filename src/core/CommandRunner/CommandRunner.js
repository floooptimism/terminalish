import CommandTable from "../CommandTable/CommandTable";

const CommandRunner = (function (){

    async function run(command){
        let args = undefined;
        if(typeof(command) == "object"){
            if(command.length > 1){
                args = command[1];
            }

            if(CommandTable.is_command_exist(command[0])){
                await CommandTable.run_command(command[0], args);
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