import CommandRunner from './core/CommandRunner/CommandRunner';
import parser from './core/Parser/Parser';
import Term from './core/Terminal/Terminal';

const el_terminal = document.getElementById('terminal');

const Terminal = new Term(el_terminal);

Terminal.toggle('main');
Terminal.newPrompt();



// ! Main block, this is where the action begins
document.addEventListener('keydown', (e)=>{
    let stat;
    let mode = Terminal.getMode();
    
    if(mode == 'main'){
        stat = Terminal.readKey(e);
        if(stat == 'submit'){
            let parsed = parser.parse(Terminal.getInput());
            CommandRunner.run(parsed);
            Terminal.toggle('main');
            Terminal.newPrompt();
        }
    }else if(mode == 'sub'){

    }
    
    if(mode != 'null'){
        Terminal.specialKeys(e);
    }
})




console.log(Terminal);