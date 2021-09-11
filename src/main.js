import CommandRunner from './core/CommandRunner/CommandRunner';
import CommandTable from './core/CommandTable/CommandTable';
import parser from './core/Parser/Parser';
import Term from './core/Terminal/Terminal';

const el_terminal = document.getElementById('terminal');

const Terminal = new Term(el_terminal);

// init Terminal
Terminal.toggle('main');
Terminal.newPrompt();

CommandTable.register_command('echo',"ECho",async function (){
    console.log("fucker");
    await Terminal.readline();
    alert(Terminal.getInput());
})


// ! Main block, this is where the action begins
document.addEventListener('keydown', async (e)=>{
    let stat;
    let mode = Terminal.getMode();
    console.log(mode);
    if(mode == 'main'){
        stat = Terminal.readKey(e);
        if(stat == 'submit'){
            let parsed = parser.parse(Terminal.getInput());
            await CommandRunner.run(parsed);
            Terminal.toggle('main');
            Terminal.newPrompt();
        }
    }else if(mode == 'sub'){
        Terminal.readKey(e);
        console.log("I'm reading"); 
    }
    
    if(mode != 'null'){
        Terminal.specialKeys(e);
    }
})




console.log(Terminal);