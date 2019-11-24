export class D3WordcloucPhrases {

  constructor() {
  }

  get_top_phrases(_list_text, top_n, remove_these){

    var common = "poop,i,me,my,myself,we,us,our,ours,ourselves,you,your,yours,yourself,yourselves,he,him,his,himself,she,her,hers,herself,it,its,itself,they,them,their,theirs,themselves,what,which,who,whom,whose,this,that,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,will,would,should,can,could,ought,i'm,you're,he's,she's,it's,we're,they're,i've,you've,we've,they've,i'd,you'd,he'd,she'd,we'd,they'd,i'll,you'll,he'll,she'll,we'll,they'll,isn't,aren't,wasn't,weren't,hasn't,haven't,hadn't,doesn't,don't,didn't,won't,wouldn't,shan't,shouldn't,can't,cannot,couldn't,mustn't,let's,that's,who's,what's,here's,there's,when's,where's,why's,how's,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,upon,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,say,says,said,shall";

    var text = "";
    for(var i in _list_text){
      text+= _list_text[i]+" ";
    }

    var atLeast = 2;       // Show results with at least .. occurrences
    var numWords = 5;      // Show statistics for one to .. words
    var ignoreCase = true; // Case-sensitivity
    var REallowedChars = /[^a-zA-Z']+/g;
     // RE pattern to select valid characters. Invalid characters are replaced with a whitespace

    var i, j, k, textlen, len, s;
    // Prepare key hash
    var keys = [null]; //"keys[0] = null", a word boundary with length zero is empty
    var results = [];
    var phrase_count = [];
    numWords++; //for human logic, we start counting at 1 instead of 0
    for (i=1; i<=numWords; i++) {
        keys.push({});
    }

    // Remove all irrelevant characters
    text = text.replace(REallowedChars, " ").replace(/^\s+/,"").replace(/\s+$/,"");

    // Create a hash
    if (ignoreCase) text = text.toLowerCase();
    text = text.split(/\s+/);
    for (i=0, textlen=text.length; i<textlen; i++) {
        s = text[i];
        keys[1][s] = (keys[1][s] || 0) + 1;
        for (j=2; j<=numWords; j++) {
            if(i+j <= textlen) {
                s += " " + text[i+j-1];
                keys[j][s] = (keys[j][s] || 0) + 1;
            } else break;
        }
    }

    // Prepares results
    for (var k=1; k<=numWords; k++) {
        results[k] = [];
        var key = keys[k];
        for (var i in key) {

          var is_ok = true;

          var words = i.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);

          words.forEach(function(word){
            var word = word.toLowerCase();
            if (word != "" && common.indexOf(word)==-1 && word.length>1){

            }else{
              is_ok = false;
            }
          });

          if(is_ok){
            if(key[i] >= atLeast && words.length > 1){
              results[k].push({"word":words.join(" "), "count":key[i]});
              phrase_count.push({"word":words.join(" "), "count":key[i]});
            }
          }

        }
    }

    var f_sortAscending = function(x,y) {return y.count - x.count;};
    for (k=2; k<numWords; k++) {
      results[k].sort(f_sortAscending);

      var words = results[k];
      if (words.length){
        for (i=0,len=words.length; i<len; i++) {
          phrase_count[words[i].word] = words[i].count;
        }
      }

    }

    var list_phrases = [];
    var vocab = [];
    var phrases_count = {};
    var phrase_count_sorted = phrase_count.sort(f_sortAscending);
    for(var i=0;i<top_n;i++){
      var phrase = phrase_count_sorted[i].word;
      phrases_count[phrase_count_sorted[i].word] = phrase_count_sorted[i].count;
      list_phrases.push(phrase);
    }


    var phrases_onehot = this.phrases_to_onehot(list_phrases);
    var phrases_remove_subset = this.remove_subset(list_phrases, phrases_onehot);

    var output = {};
    for(var p in phrases_remove_subset){
      if(phrases_remove_subset[p] && remove_these.indexOf(p) == -1)
        output[p] = phrases_count[p];
    }

    return output;
  }



  //////////////////

  fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

  a_is_subset_of_b (a, b) {
    var a_b_same = true;
    for(var i in a){
      var t = a[i] - b[i];
      if(t == 1){
        a_b_same = false;
      }
    }
    return a_b_same;
  };

  phrases_to_onehot(list_phrases){
    var row = [];
    var vocab = [];

    for(var i=0;i<list_phrases.length;i++){
      var words = list_phrases[i].split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
      words.forEach(function(word){
        if(vocab.indexOf(word)==-1){
          vocab.push(word);
        }
      })
    }
    for(var i=0;i<list_phrases.length;i++){
      var this_row = this.fillArray(0, vocab.length);
      var words = list_phrases[i].split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
      words.forEach(function(word){
        this_row[vocab.indexOf(word)] = 1;
      });
      row.push(this_row);
    }
    return row;
  }

  remove_subset(list_phrases, row){
    var results = {};

    for(var i=0;i<row.length;i++){
      var this_is_unique = true;
      for(var j=0;j<row.length;j++){
        if(i!=j && this.a_is_subset_of_b(row[i], row[j])){
          // console.log(row[i], row[j], a_is_subset_of_b(row[i], row[j]));
          this_is_unique = false;
        }
      }
      results[list_phrases[i]] = this_is_unique
      // console.log(list_phrases[i], row[i], this_is_unique)
    }
    return results;
  }

}
