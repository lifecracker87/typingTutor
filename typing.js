var Typing = {
    typingIndex: 0,
    charsToType: 0,
    charsTyped: 0,
    misTyped: 0,
    typingTextArray: null,
    textContainerid: null,
    accuracy:0,
    totalCorrect:0,
    totalIncorrect:0,
    startTime:null,
    endTime:null,
    
    constructor: function (typingText, divid) {
        this.typingTextArray = typingText.split("");
        this.textContainerid = divid;
        var txtContainer = document.getElementById(this.textContainerid);
        for (var i in this.typingTextArray)
        {
            var span = this.createSpan(i, this.typingTextArray[i]);
            txtContainer.appendChild(span);
            this.charsToType++;
        }
        this.moveCursor(this.typingIndex);
    },
    
    moveCursor : function (id){
        var cursoron = document.getElementById(id);
        //cursoron.innerHTML = cursoron.innerHTML.trim()
        cursoron.setAttribute("class","cursor");
       ///var value =cursoron.innerHTML;
        //cursoron.innerHTML=" "+value;
    },
    
    createSpan: function (id, value) {
        var span = document.createElement("span");
        span.id = id;
        span.innerHTML = value;
        return span;
    },
    keyHandler: function (evnt) {
        var e = evnt || window.event;
        var charCode = e.keyCode || e.which;
        if (this.checkForValidKey(charCode)) {
            this.handleTyping(charCode);
        }
        else {
            return false;
        }

    },
    
    checkForValidKey: function (charCode) {
        switch (charCode)
        {
            default:
                return true;
        }
    },
    
    handleTyping: function (charCode) {
        var charStrig = String.fromCharCode(charCode);
        // check if he key is backpace
        //console.log("a");
        if(this.typingIndex == 0){
                this.setStartTime();
        }
        if (charCode == "8")
        {
            //check if typingIndex is 0 or not
            if (this.typingIndex == 0)
                return false;
            var prevCnt = this.typingIndex - 1;
            var span = document.getElementById(this.typingIndex);
            var span_previous = document.getElementById(prevCnt);
            if(span_previous.getAttribute("class")=="correct")
                this.totalCorrect--;
            if(span_previous.getAttribute("class")=="incorrect")
                this.totalIncorrect--;
            span.setAttribute("class", "");
            this.moveCursor(prevCnt);
            this.typingIndex--;
            this.charsTyped++;
            
            
        }
        else if (charStrig == this.typingTextArray[this.typingIndex])
        {
           
            var span = document.getElementById(this.typingIndex);
            span.setAttribute("class", "correct");
            if(this.typingIndex < this.charsToType-1 )
                this.moveCursor(this.typingIndex+1);
            this.typingIndex++;
            this.charsTyped++;
            this.totalCorrect++;
            
        }
        else
        {
            var span = document.getElementById(this.typingIndex);
            span.setAttribute("class", "incorrect");
            if(this.typingIndex < this.charsToType-1 )
                this.moveCursor(this.typingIndex+1);
            this.typingIndex++;
            this.charsTyped++;
            this.misTyped++;
            this.totalIncorrect++;
        }
        
        if(this.typingIndex == this.charsToType)
        {
            this.SetEndTime();
            this.showResult();
            return;
        }
        //console.log(this.totalCorrect +"::"+ this.totalIncorrect);
        //console.log("Total To Type : " + this.charsToType + ", Toal Chars Typed : " + this.charsTyped + " Total Errors : " + this.misTyped +" Accuracy : "+this.getAccuracy());
    },
    
    setStartTime : function()
    {
        //console.log("a");
        this.startTime = Date.now();
    },
    
    SetEndTime : function()
    {
        this.endTime = Date.now();
    },
    
    getTime : function()
    {
        var milliSeconds = this.endTime - this.startTime ;
        var seconds = milliSeconds/1000;
        var minute = seconds/60;
        return minute;
    },
    
    getAccuracy : function()
    {
        this.accuracy = (this.totalCorrect * 100)/this.charsToType;
        return this.accuracy;
    },
    
    getWordPerMinute : function ()
    {
        var typed_words = this.charsTyped / 5;
        var uncorrectedErrors = this.totalIncorrect;
        if(typed_words < uncorrectedErrors)
        {
            return 0;
        }
        var wpm = (typed_words - uncorrectedErrors) / this.getTime();
        return wpm;       
    },
    
    getWordPerMinuteRaw : function()
    {
        var typed_words = this.charsTyped / 5;
        return typed_words / this.getTime();
        
    },
    
    showResult : function ()
    {
        var div = document.getElementById(this.textContainerid);
        var result = "Accuracy: "+ this.getAccuracy()+"<br/>";
        result += "Total Chars To Type: "+this.charsToType+"<br/>";
        result += "Total Chars Typed: "+this.charsTyped+"<br/>";
        result += "Total Correct: "+this.totalCorrect+"<br/>";
        result += "Total Errors: "+this.totalIncorrect+"<br/>";
        result += "Time Taken: "+this.getTime()+ " Minute(s)<br/>";
        result += "Word Per Minute (Productive) : "+this.getWordPerMinute()+ " W/M<br/>";
        result += "Word Per Minute (Raw) : "+this.getWordPerMinuteRaw()+ " W/M";
        div.innerHTML = result;
    }

};