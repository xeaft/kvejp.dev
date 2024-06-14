function doStringThing(str) {
    let data = new TextEncoder().encode(str);
    let input = new Uint8Array(data);
    let output = "<~";
    for (let i = 0; i < input.length; i += 4) {
        let chunk = input.slice(i, i + 4);
        let value = 0;
        for (let j = 0; j < chunk.length; j++) {
            value |= chunk[j] << ((3 - j) * 8);
        }
        let encoded = "";
        for (let j = 4; j >= 0; j--) {
            encoded = String.fromCharCode((value % 85) + 33) + encoded;
            value = Math.floor(value / 85);
        }
        output += encoded;
    }
    output += "~>";
    return output;
}

function undoStringThing(str) {
    if (!str.startsWith("<~")) {
        return str
    }

    let input = str.slice(2, -2).replace(/\s/g, '');
    let output = "";
    for (let i = 0; i < input.length; i += 5) {
        let chunk = input.slice(i, i + 5);
        let value = 0;
        for (let j = 0; j < chunk.length; j++) {
            value = value * 85 + (chunk.charCodeAt(j) - 33);
        }
        for (let j = 3; j >= 0; j--) {
            output += String.fromCharCode((value >> (j * 8)) & 0xFF);
        }
    }
    return output.replace(/\x00+$/, '');
}