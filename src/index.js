let LittleLearn = (function () {
    class node {
        constructor(value) {
            this.value = value;
            this.children = {};
            this.keys = [];
        }
        push(value) {
            this.children[value] = new node(value);
            this.keys.push(value);
            return this.children[value];
        }
        find(value) {
            let n = this.children[value];
            if (!n) {
                n = this.push(value);
            }
            return n;
        }
        get(value) {
            return this.keys[value];
        }
        len() {
            return this.keys.length;
        }
    }
    class LittleLearn {
        constructor(...texts) {
            this.root = new node("");
            for (let i = 0; i < texts.length; i++) {
                this.parse(texts[i]);
            }
        }
        parse(txt) {
            let str = "";
            let now = this.root;
            for (let i = 0; i < txt.length; i++) {
                str += txt[i];
                if (isWordFinish(txt[i]) || i == txt.length - 1) {
                    now = now.find(str);
                    str = "";
                }
            }
            now.push("");
        }
        write() {
            let str = "";
            let now = this.root;
            while (true) {
                if (now.len() < 1) break;
                let index = Math.floor(Math.random() * now.len());
                now = now.find(now.get(index));
                str += now.value;
            }
            return str;
        }
        static split(txt) {
            let txts = [];
            let str = "";
            for (let i = 0; i < txt.length; i++) {
                str += txt[i];
                if (isSentenceFinish(txt[i]) || i == txt.length - 1) {
                    txts.push(str);
                    str = "";
                }
            }
            return txts;
        }
        static create(txts) {
            return new LittleLearn(...this.split(txts));
        }
    }
    function isWordFinish(c) {
        return (c == ' ' || c == '\t' || c == '.' || c == ',' || c == ';' || c == '.' || c == '?' || c == '!');
    }
    function isSentenceFinish(c) {
        return (c == '.' || c == '?' || c == '!');
    }
    LittleLearn.__node = node;
    return LittleLearn;
})();