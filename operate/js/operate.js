    disabled();
    openWindow('../show/title_only.html', 'child_window2');
    function openWindow(url, name) {
      window.open(url, name, 'width=1000,height=1000');
    }
    //CSVファイルを読み込む関数getCSV()の定義
    function getCSV(){
        var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
        req.open("get", "../data/Data.csv", true); // アクセスするファイルを指定
        req.send(null); // HTTPリクエストの発行
        
        // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
        req.onload = function(){
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
        }
    }
    var result = []; // 最終的な二次元配列を入れるための配列
    // 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
    function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
        
        var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
    
        // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
        for(var i=0;i<tmp.length;++i){
            result[i] = tmp[i].split(',');
        }
    }
    getCSV(); //最初に実行される

    function rule(place) {
        const syou = document.getElementById('syou');
        const setu = document.getElementById('setu');
        while(syou.firstChild){
            syou.removeChild(syou.firstChild);
        }
        while(setu.firstChild){
            setu.removeChild(setu.firstChild);
        }
        if(place=='nt') {
          document.F.nt[0].selected="true";
          position = document.F.ot;
          syokan = position.options[position.selectedIndex].value;
          var place = document.F.ot.value;
          dis_syou(place);
        }
        if(place=='ot') {
          document.F.ot[0].selected="true";
          position = document.F.nt;
          syokan = position.options[position.selectedIndex].value;
          var place = document.F.nt.value;
          dis_syou(place);
        }
        document.getElementById('syou').disabled = false;
        document.getElementById('setu').disabled = true;
        document.getElementById('syou').value = '';
        document.getElementById('setu').value = '';
    }

    function dis_syou(id) {
        var total = lists[id][1];
        const select = document.getElementById('syou_list');
        while(select.firstChild){
            select.removeChild(select.firstChild);
        }
        for( var n = 0; n <= total; n++ ) {
            const option = document.createElement('option');
            if(n!=0){
                option.value = n;
            }
            select.appendChild(option);
        }
    }

    function get_setu( syokan, syou ) {
        let setu = '';
        pattern = syokan+syou+':';
        for( var n=1,j=1;n<31104;n++){
            if(result[n][3].includes(pattern)) {
                setu = j;
                j++;
            }
        }
        max_setu = setu;
        return setu;
    }

    function query( syokan, syou, setu ) {
        let table = '';
        let td = '';
        pattern = syokan+syou+':'+setu;
        const getKeywordIndex = keyword => {
            const target = result.find(v => v.includes(keyword))
            return target && result.indexOf(target)
        }
        let index_num = getKeywordIndex(pattern);
        output = '<div id="master"><div id="jp"><div id="setu'+index_num+'"><b><u id="'+index_num+'">' +result[index_num][3] + '</u></b></div>';
        output += '<div class="target_jp" id="jp'+index_num+'">'+result[index_num][4]+'</div></div>';
        output += '<div id="ch"><div id="setu'+index_num+'"><b><u id="'+index_num+'">' +result[index_num][1] + '</u></b></div>';
        output += '<div class="target_ch" id="ch'+index_num+'">'+result[index_num][2]+'</div></div></div><br>';
    }

    function dis_setu() {
        var syou = hankaku2Zenkaku(document.getElementById('syou').value);
        let table = get_setu(jp_Abbre[syokan],syou); //table[0]->節数、table[1]->table中身
        const select = document.getElementById('setu_list');
        while(select.firstChild){
            select.removeChild(select.firstChild);
        }
        for( var n = 1; n <= table; n++ ) {
            const option = document.createElement('option');
            option.value = n;
            select.appendChild(option);
        }
        document.getElementById('setu').disabled = false;
    }

    function show() {
        num = hankaku2Zenkaku(document.getElementById('setu').value);
        var syou = hankaku2Zenkaku(document.getElementById('syou').value);
        try {
            query(jp_Abbre[syokan],syou,num);
        
            // 親ウィンドウの存在チェック
            if(!window.opener || window.opener.closed){
                window.alert('親ウィンドウがありません。');
                return false;
            }
            window.opener.document.getElementById("out").innerHTML = output;
        } catch(e) {
            window.opener.document.getElementById("out").innerHTML = '';
        }
    }
    
    function disabled() {
        document.getElementById('syou').disabled = true;
        document.getElementById('setu').disabled = true;
    }

    function clear_con() {
        document.getElementById('syou').value = '';
        document.getElementById('setu').value = '';
        show();
    }

    let fontsize = 1.8;
    function sizechange( option ){
        if( option == 'plus'){
            fontsize += 0.3;
            window.opener.document.getElementById('out').style.fontSize = fontsize + 'em';
        } else {
            fontsize -= 0.3;
            window.opener.document.getElementById('out').style.fontSize = fontsize + 'em';
        }
    }

    var output = '';
    var syokan = '';
    var lists = [["0", "50"], ["1", "40"], ["2", "27"], ["3", "36"], ["4", "34"], ["5", "24"], ["6", "21"], ["7", "4"], ["8", "31"], ["9", "24"], ["10", "22"], ["11", "25"], ["12", "29"], ["13", "36"], ["14", "10"], ["15", "13"], ["16", "10"], ["17", "42"], ["18", "150"], ["19", "31"], ["20", "12"], ["21", "8"], ["22", "66"], ["23", "52"], ["24", "5"], ["25", "1"], ["26", "12"], ["27", "14"], ["28", "3"], ["29", "9"], ["30", "1"], ["31", "4"], ["32", "7"], ["33", "3"], ["34", "3"], ["35", "3"], ["36", "2"], ["37", "14"], ["38", "4"], ["39", "28"], ["40", "16"], ["41", "24"], ["42", "21"], ["43", "28"], ["44", "16"], ["45", "16"], ["46", "13"], ["47", "6"], ["48", "6"], ["49", "4"], ["50", "4"], ["51", "5"], ["52", "3"], ["53", "6"], ["54", "4"], ["55", "3"], ["56", "1"], ["57", "13"], ["58", "5"], ["59", "5"], ["60", "3"], ["61", "5"], ["62", "1"], ["63", "1"], ["64", "1"], ["65", "22"]];
    var jp_Abbre = ["創", "出エジ", "レビ", "民", "申", "ヨシュ", "士", "ルツ", "サム上", "サム下", "列王上", "列王下", "歴代上", "歴代下", "エズ", "ネヘ", "エス", "ヨブ", "詩", "箴", "伝", "雅", "イザ", "エレ", "哀", "エゼ", "ダニ", "ホセ", "ヨエ", "アモ", "オバ", "ヨナ", "ミカ", "ナホ", "ハバ", "ゼパ", "ハガ", "ゼカ", "マラ", "マタ", "マル", "ルカ", "ヨハ", "使徒", "ロマ", "Ⅰコリ", "Ⅱコリ", "ガラ", "エペ", "ピリ", "コロ", "Ⅰテサ", "Ⅱテサ", "Ⅰテモ", "Ⅱテモ", "テト", "ピレ", "ヘブ", "ヤコ", "Ⅰペテ", "Ⅱペテ", "Ⅰヨハ", "Ⅱヨハ", "Ⅲヨハ", "ユダ", "黙"];
    var list = ["01 創世記", "02 出エジプト記", "03 レビ記", "04 民数記", "05 申命記", "06 ヨシュア記", "07 士師記", "08 ルツ記", "09 サムエル記上", "10 サムエル記下", "11 列王記上", "12 列王記下", "13 歴代志上", "14 歴代志下", "15 エズラ記", "16 ネヘミヤ記", "17 エステル記", "18 ヨブ記", "19 詩篇", "20 箴言", "21 伝道の書", "22 雅歌", "23 イザヤ書", "24 エレミヤ書", "25 哀歌", "26 エゼキエル書", "27 ダニエル書", "28 ホセア書", "29 ヨエル書", "30 アモス書", "31 オバデア書", "32 ヨナ書", "33 ミカ書", "34 ナホム書", "35 ハバクク書", "36 ゼパニヤ書", "37 ハガイ書", "38 ゼカリヤ書", "39 マラキ書", "40 マタイによる福音書", "41 マルコによる福音書", "42 ルカによる福音書", "43 ヨハネによる福音書", "44 使徒行伝", "45 ローマ人への手紙", "46 コリント人への第一の手紙", "47 コリント人への第二の手紙", "48 ガラテヤ人への手紙", "49 エペソ人への手紙", "50 ピリピ人への手紙", "51 コロサイ人への手紙", "52 テサロニケ人への第一の手紙", "53 テサロニケ人への第二の手紙", "54 テモテへの第一の手紙", "55 テモテへの第二の手紙", "56 テトスへの手紙", "57 ピレモンへの手紙", "58 ヘブル人への手紙", "59 ヤコブの手紙", "60 ペテロの第一の手紙", "61 ペテロの第二の手紙", "62 ヨハネの第一の手紙", "63 ヨハネの第二の手紙", "64 ヨハネの第三の手紙", "65 ユダの手紙", "66 ヨハネの黙示録"];
    var title_font  = 1.0;
    var person_font = 1.0;
    var max_setu = 1;

    function change(type){
        if(type=="plus"){
            const setu = document.getElementById('setu');
            let num = Number(setu.value);
            if( num >= max_setu ) num = max_setu;
            else num += 1;
            setu.value = num;
        } else {
            const setu = document.getElementById('setu');
            let num = Number(setu.value);
            if( num <= 1 ) num = 1;
            else num -= 1;
            setu.value = num;
        }
        show();
    }
    function commit() {
        const thema_ja   = document.getElementById('thema_ja').value;
        const thema_ch   = document.getElementById('thema_ch').value;
        const speech     = (document.getElementById('speech').value != '') ? '説教者：'+document.getElementById('speech').value : '';
        const translator = (document.getElementById('translator').value != '') ? '通訳者：'+document.getElementById('translator').value : '';
        const hymn_1nd   = document.getElementById('hymn_1nd').value;
        const hymn_2nd   = document.getElementById('hymn_2nd').value;
        let output = '<div id="thema"><div id="thema-jp">'+thema_ja+'</div><div id="thema-ch">'+thema_ch+'</div></div>';
        output += '<div id="people"><div id="speech">'+speech+'<br>'+translator+'</div>';
        output += '<div id="hymn">';
        output += (hymn_1nd!='') ? '讃美歌：'+hymn_1nd : '';
        output += (hymn_2nd!='') ? '/'+hymn_2nd : '';
        
        window.opener.document.getElementById("title").innerHTML = output;
        window.opener.document.getElementById('thema').style.fontSize = title_font+'em';
        window.opener.document.getElementById('people').style.fontSize = person_font+'em';
    }
    function adjust(id,opt){
        if(id=='thema'){
            const thema = window.opener.document.getElementById('thema');
            const input = document.getElementById('themavalue');
            if(opt=='plus'){
                title_font += 0.1;
                thema.style.fontSize = title_font+'em';
                input.innerHTML = title_font;
            } else {
                title_font -= 0.1;
                thema.style.fontSize = title_font+'em';
                input.innerHTML = title_font;
            }
        } else {
            const people = window.opener.document.getElementById('people');
            const input = document.getElementById('peoplevalue');
            if(opt=='plus') {
                person_font += 0.1;
                people.style.fontSize = person_font+'em';
                input.innerHTML = person_font;
            } else {
                person_font -= 0.1;
                people.style.fontSize = person_font+'em';
                input.innerHTML = person_font;
            }
        }
    }

    function hankaku2Zenkaku(str) {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    window.addEventListener('resize',function (e) {
        window.resizeTo(550,610);
    }, false);