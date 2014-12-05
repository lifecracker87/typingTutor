<!DOCTYPE Html>
<html>
    <head>
        <title>Typing Practice- Lessions</title>
        <meta charset="UTF-8">
        <script src="typing.js" type="text/javascript"></script>
    </head>
    <body>
        <style>
            .text_cntnr {
                font-family: Courier;
                background-color: rgba(238, 255, 65, 0.4);
                border: 1px solid #CCCFA0;
                white-space: pre-wrap;
                padding: 4px;
                position: relative;
                border-radius: 5px;
                min-height: 70px;
            }
            .correct {
                color: #20A080;
            }
            .incorrect {
                background-color: #FFC0C0;
                color: #F00;
            }
            .cursor {
                background-color:#20A080;
            }
        </style>
        <p>Keyboard Typing speed and Practice</p>
        <div id="typing_content" class="text_cntnr">
        </div>
        <audio src="ding.wav" id="aud" preload="preload">
        </audio>
        <script>
            var charFromServer = "this is for typing test, Thank You!..";
            //var charFromServer = "मेरो नाम बहिम हो";
                var typing = Typing;
                typing.constructor(charFromServer,"typing_content");
                document.onkeypress = function (evt) {
                typing.keyHandler(evt);
                };
        </script>

    </body>
</html>