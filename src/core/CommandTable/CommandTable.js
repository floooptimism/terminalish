const CommandTable = (function() {
    let m_commands = {

    }

    let m_commands_description = {

    }

    function get_command_handler(command){
        return m_commands[command];
    }

    function run_command(command){
            if(m_commands[command]){
                return m_commands[command]([...arguments].slice(1));
            }
            return null;
    }

    function get_command_info(command){
        return m_commands_description[command];
    }

    function is_command_exist(command){
        if(m_commands[command]) return true;
        return false;
    }

    function get_commands(){
        return m_commands;
    }

    function register_command(command, description, handler){
        m_commands[command] = handler;
        m_commands_description[command] = description;
    }

    return {
        register_command,
        get_command_handler,
        get_command_info,
        get_commands,
        is_command_exist,
        run_command,

    }

})()

export default CommandTable;