function Player(income){
    function pbtnAction(){
        const playing = document.getElementById("ap");
        const pbtn = document.getElementById("pbtn");
        if (playing.paused){
            playing.play();
            pbtn.children[0].style.animation = "playing 5s infinite linear"
            pbtn.children[1].style.animation = "playing_back 5s infinite linear"
        }else{
            playing.pause();
            pbtn.children[0].style.animation = "unset";
            pbtn.children[1].style.animation = "unset";
        }
    }
    function playerAction(){
        const bar = document.getElementById("bar");
        const dur = document.getElementById("dur");
        const playing = document.getElementById("ap");

        let Tsec = (playing.currentTime).toFixed(0);
        let Tmin = Math.floor(Tsec / 60);
        let sec = Tsec % 60;
        let min = Tmin % 60;
        dur.innerText = min+":"+sec;
        bar.style.width = Math.floor((playing.currentTime / playing.duration)*100)+"%"
    }
    function timebarAction(Event){
        const playing = document.getElementById("ap");
        const p = (Event.offsetX / Event.target.clientWidth)*100;
        playing.currentTime = Math.floor((playing.duration * p) / 100);
    }
    function endedAction(){
        const pbtn = document.getElementById("pbtn");
        pbtn.children[0].style.animation = "unset";
        pbtn.children[1].style.animation = "unset";
    }


    function next_s(){
        for (let li_e of document.getElementsByClassName("win")){
            li_e.style.background = "unset"
        }

        income.back();
        const playing = document.getElementById("ap");
        playing.play();
    }
    function back_s(){
        for (let li_e of document.getElementsByClassName("win")){
            li_e.style.background = "unset"
        }
        income.next();
        const playing = document.getElementById("ap");
        playing.play();
    }

    function playAction(Event){
        const pbtn = document.getElementById("pbtn");
        pbtn.children[0].style.animation = "playing 5s infinite linear"
        pbtn.children[1].style.animation = "playing_back 5s infinite linear"

        const name = Event.target.currentSrc.split("/").pop().replaceAll("%20", " ").split(".")[0];
        for (let li_e of document.getElementsByClassName("win")){
            // console.log(name);
            // console.log(li_e.textContent);
            for (let li_e of document.getElementsByClassName("win")){
                li_e.style.background = "unset";
            }
            for (let i in income.ml()){
                if (parseInt(i)%2 != 0){
                    document.querySelector("li:nth-child("+(parseInt(i)+1)+")").style.background = "rgba(0,0,0,0.3)"
                }
            }
            if (li_e.textContent == name){
                li_e.style.background = "rgba(255,255,255,0.2)"
                break
            }
        }
    }
    return(
        <div class="player">
        <audio src={income.al} id="ap" onPlay={playAction} onEnded={endedAction} onTimeUpdate={playerAction}></audio>
        <div id="pbtn" onclick={pbtnAction}>
            <div class="green"></div>
            <div class="purple"></div>
            <div class="state"><h1></h1></div>
        </div>
        <div class="controller">
            <div class="back_for" onclick={next_s}><h2>◄</h2></div>
            <div id="timebar" onclick={timebarAction}><div id="bar"></div></div>
            <div id="dur">0:0</div>
            <div class="back_for" onclick={back_s}><h2>►</h2></div>
        </div>
        </div>
    )
}

export default Player