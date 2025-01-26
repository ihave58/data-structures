const distance = (word1, word2) => {
    let matchCount = 0;

    if (word1.length !== word2.length) {
        return false;
    }

    for (let index = 0; index < word1.length; index++) {
        if (word1[index] === word2[index]) {
            matchCount++;
        }
    }

    return word1.length - matchCount;
}

const findLadders = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    const queue = new Array([beginWord]);
    const visited = new Set([beginWord]);
    const paths = [];

    while (queue.length) {
        // console.log('#', queue);

        const queueSize = queue.length;
        const wordVisited = new Set();

        for (let index = 0; index < queueSize; index++) {
            const sentence = queue.shift();
            const lastWord = sentence[sentence.length - 1];

            if (lastWord === endWord) {
                paths.push(sentence);
            }

            wordList.forEach(newWord => {
                if (!visited.has(newWord) && distance(newWord, lastWord) === 1) {
                    queue.push([...sentence, newWord]);
                    wordVisited.add(newWord);
                }
            });
        }

        wordVisited.forEach(value => visited.add(value));
    }

    return paths;
};

// const beginWord = 'hit',
//     endWord = 'cog',
//     wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

// const beginWord = 'hot',
//     endWord = 'dog',
//     wordList = ['hot', 'dog', 'dot'];

// const beginWord = 'hog',
//     endWord = 'cog',
//     wordList = ['cog'];
//
// const beginWord = 'ta',
//     endWord = 'if',
//     wordList = ['ts', 'sc', 'ph', 'ca', 'jr', 'hf', 'to', 'if', 'ha', 'is', 'io', 'cf', 'ta'];

const beginWord = 'qa',
    endWord = 'sq',
    wordList = ['si', 'go', 'se', 'cm', 'so', 'ph', 'mt', 'db', 'mb', 'sb', 'kr', 'ln', 'tm', 'le', 'av', 'sm', 'ar', 'ci', 'ca', 'br', 'ti', 'ba', 'to', 'ra', 'fa', 'yo', 'ow', 'sn', 'ya', 'cr', 'po', 'fe', 'ho', 'ma', 're', 'or', 'rn', 'au', 'ur', 'rh', 'sr', 'tc', 'lt', 'lo', 'as', 'fr', 'nb', 'yb', 'if', 'pb', 'ge', 'th', 'pm', 'rb', 'sh', 'co', 'ga', 'li', 'ha', 'hz', 'no', 'bi', 'di', 'hi', 'qa', 'pi', 'os', 'uh', 'wm', 'an', 'me', 'mo', 'na', 'la', 'st', 'er', 'sc', 'ne', 'mn', 'mi', 'am', 'ex', 'pt', 'io', 'be', 'fm', 'ta', 'tb', 'ni', 'mr', 'pa', 'he', 'lr', 'sq', 'ye'];

// const beginWord = 'aaaaa',
//     endWord = 'ggggg',
//     wordList = [
//         'aaaaa', 'caaaa', 'cbaaa', 'daaaa', 'dbaaa', 'eaaaa', 'ebaaa', 'faaaa', 'fbaaa', 'gaaaa', 'gbaaa', 'haaaa', 'hbaaa', 'iaaaa', 'ibaaa', 'jaaaa', 'jbaaa', 'kaaaa', 'kbaaa', 'laaaa', 'lbaaa', 'maaaa', 'mbaaa', 'naaaa', 'nbaaa', 'oaaaa', 'obaaa', 'paaaa', 'pbaaa', 'bbaaa', 'bbcaa', 'bbcba', 'bbdaa', 'bbdba', 'bbeaa', 'bbeba', 'bbfaa', 'bbfba', 'bbgaa', 'bbgba', 'bbhaa', 'bbhba', 'bbiaa', 'bbiba', 'bbjaa', 'bbjba', 'bbkaa', 'bbkba', 'bblaa', 'bblba', 'bbmaa', 'bbmba', 'bbnaa', 'bbnba', 'bboaa', 'bboba', 'bbpaa', 'bbpba', 'bbbba', 'abbba', 'acbba', 'dbbba', 'dcbba', 'ebbba', 'ecbba', 'fbbba', 'fcbba', 'gbbba', 'gcbba', 'hbbba', 'hcbba', 'ibbba', 'icbba', 'jbbba', 'jcbba', 'kbbba', 'kcbba', 'lbbba', 'lcbba', 'mbbba', 'mcbba', 'nbbba', 'ncbba', 'obbba', 'ocbba', 'pbbba', 'pcbba', 'ccbba', 'ccaba', 'ccaca', 'ccdba', 'ccdca', 'cceba', 'cceca', 'ccfba', 'ccfca', 'ccgba', 'ccgca', 'cchba', 'cchca', 'cciba', 'ccica', 'ccjba', 'ccjca', 'cckba', 'cckca', 'cclba', 'cclca', 'ccmba', 'ccmca', 'ccnba', 'ccnca', 'ccoba', 'ccoca', 'ccpba', 'ccpca', 'cccca', 'accca', 'adcca', 'bccca', 'bdcca', 'eccca', 'edcca', 'fccca', 'fdcca', 'gccca', 'gdcca', 'hccca', 'hdcca', 'iccca', 'idcca', 'jccca', 'jdcca', 'kccca', 'kdcca', 'lccca', 'ldcca', 'mccca', 'mdcca', 'nccca', 'ndcca', 'occca', 'odcca', 'pccca', 'pdcca', 'ddcca', 'ddaca', 'ddada', 'ddbca', 'ddbda', 'ddeca', 'ddeda', 'ddfca', 'ddfda', 'ddgca', 'ddgda', 'ddhca', 'ddhda', 'ddica', 'ddida', 'ddjca', 'ddjda', 'ddkca', 'ddkda', 'ddlca', 'ddlda', 'ddmca', 'ddmda', 'ddnca', 'ddnda', 'ddoca', 'ddoda', 'ddpca', 'ddpda', 'dddda', 'addda', 'aedda', 'bddda', 'bedda', 'cddda', 'cedda', 'fddda', 'fedda', 'gddda', 'gedda', 'hddda', 'hedda', 'iddda', 'iedda', 'jddda', 'jedda', 'kddda', 'kedda', 'lddda', 'ledda', 'mddda', 'medda', 'nddda', 'nedda', 'oddda', 'oedda', 'pddda', 'pedda', 'eedda', 'eeada', 'eeaea', 'eebda', 'eebea', 'eecda', 'eecea', 'eefda', 'eefea', 'eegda', 'eegea', 'eehda', 'eehea', 'eeida', 'eeiea', 'eejda', 'eejea', 'eekda', 'eekea', 'eelda', 'eelea', 'eemda', 'eemea', 'eenda', 'eenea', 'eeoda', 'eeoea', 'eepda', 'eepea', 'eeeea', 'ggggg', 'agggg', 'ahggg', 'bgggg', 'bhggg', 'cgggg', 'chggg', 'dgggg', 'dhggg', 'egggg', 'ehggg', 'fgggg', 'fhggg', 'igggg', 'ihggg', 'jgggg', 'jhggg', 'kgggg', 'khggg', 'lgggg', 'lhggg', 'mgggg', 'mhggg', 'ngggg', 'nhggg', 'ogggg', 'ohggg', 'pgggg', 'phggg', 'hhggg', 'hhagg', 'hhahg', 'hhbgg', 'hhbhg', 'hhcgg', 'hhchg', 'hhdgg', 'hhdhg', 'hhegg', 'hhehg', 'hhfgg', 'hhfhg', 'hhigg', 'hhihg', 'hhjgg', 'hhjhg', 'hhkgg', 'hhkhg', 'hhlgg', 'hhlhg', 'hhmgg', 'hhmhg', 'hhngg', 'hhnhg', 'hhogg', 'hhohg', 'hhpgg', 'hhphg', 'hhhhg', 'ahhhg', 'aihhg', 'bhhhg', 'bihhg', 'chhhg', 'cihhg', 'dhhhg', 'dihhg', 'ehhhg', 'eihhg', 'fhhhg', 'fihhg', 'ghhhg', 'gihhg', 'jhhhg', 'jihhg', 'khhhg', 'kihhg', 'lhhhg', 'lihhg', 'mhhhg', 'mihhg', 'nhhhg', 'nihhg', 'ohhhg', 'oihhg', 'phhhg', 'pihhg', 'iihhg', 'iiahg', 'iiaig', 'iibhg', 'iibig', 'iichg', 'iicig', 'iidhg', 'iidig', 'iiehg', 'iieig', 'iifhg', 'iifig', 'iighg', 'iigig', 'iijhg', 'iijig', 'iikhg', 'iikig', 'iilhg', 'iilig', 'iimhg', 'iimig', 'iinhg', 'iinig', 'iiohg', 'iioig', 'iiphg', 'iipig', 'iiiig', 'aiiig', 'ajiig', 'biiig', 'bjiig', 'ciiig', 'cjiig', 'diiig', 'djiig', 'eiiig', 'ejiig', 'fiiig', 'fjiig', 'giiig', 'gjiig', 'hiiig', 'hjiig', 'kiiig', 'kjiig', 'liiig', 'ljiig', 'miiig', 'mjiig', 'niiig', 'njiig', 'oiiig', 'ojiig', 'piiig', 'pjiig', 'jjiig', 'jjaig', 'jjajg', 'jjbig', 'jjbjg', 'jjcig', 'jjcjg', 'jjdig', 'jjdjg', 'jjeig', 'jjejg', 'jjfig', 'jjfjg', 'jjgig', 'jjgjg', 'jjhig', 'jjhjg', 'jjkig', 'jjkjg', 'jjlig', 'jjljg', 'jjmig', 'jjmjg', 'jjnig', 'jjnjg', 'jjoig', 'jjojg', 'jjpig', 'jjpjg', 'jjjjg', 'ajjjg', 'akjjg', 'bjjjg', 'bkjjg', 'cjjjg', 'ckjjg', 'djjjg', 'dkjjg', 'ejjjg', 'ekjjg', 'fjjjg', 'fkjjg', 'gjjjg', 'gkjjg', 'hjjjg', 'hkjjg', 'ijjjg', 'ikjjg', 'ljjjg', 'lkjjg', 'mjjjg', 'mkjjg', 'njjjg', 'nkjjg', 'ojjjg', 'okjjg', 'pjjjg', 'pkjjg', 'kkjjg', 'kkajg', 'kkakg', 'kkbjg', 'kkbkg', 'kkcjg', 'kkckg', 'kkdjg', 'kkdkg', 'kkejg', 'kkekg', 'kkfjg', 'kkfkg', 'kkgjg', 'kkgkg', 'kkhjg', 'kkhkg', 'kkijg', 'kkikg', 'kkljg', 'kklkg', 'kkmjg', 'kkmkg', 'kknjg', 'kknkg', 'kkojg', 'kkokg', 'kkpjg', 'kkpkg', 'kkkkg', 'ggggx', 'gggxx', 'ggxxx', 'gxxxx', 'xxxxx', 'xxxxy', 'xxxyy', 'xxyyy', 'xyyyy', 'yyyyy', 'yyyyw', 'yyyww', 'yywww', 'ywwww', 'wwwww', 'wwvww', 'wvvww', 'vvvww', 'vvvwz', 'avvwz', 'aavwz', 'aaawz', 'aaaaz'
//     ];

console.log(wordList.length);
console.dir(findLadders(beginWord, endWord, wordList));
