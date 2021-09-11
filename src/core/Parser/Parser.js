const parser = {
    parse: function (value){
        const val_trimmed = value.trim();
        if(val_trimmed.length == 0) return '';
        const val_split = val_trimmed.split(/\s*\s/g);
        return [val_split[0],val_split.slice(1).join(" ")];
    }
}

export default parser;