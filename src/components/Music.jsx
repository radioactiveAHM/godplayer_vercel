import { createSignal, onMount } from "solid-js"
import Player from "./player/Player";

import { Icon } from "solid-heroicons";
import {bars_3} from "solid-heroicons/solid-mini"

function Music(){
    const [musics, SetMusics] = createSignal(JSON.parse("[\"DBMK - City.mp3\",\"Gorillaz - Feel Good Inc..mp3\",\"LSD ft. Sia & Diplo & Labrinth - Audio.mp3\",\"Post Malone - Circles.mp3\",\"SALES - Pope Is a Rockstar.mp3\",\"Swedish House Mafia, The Weeknd - Moth To A Flame (with The Weeknd).mp3\",\"The Weeknd - Blinding Lights.mp3\",\"The Weeknd - Call Out My Name.mp3\",\"Trevor Daniel - Falling.mp3\"]"));
    const [current, SetCurrent] = createSignal("");
    const [listing, SetListing] = createSignal(0);
    const [theme, SetTheme] = createSignal(0);
    const server = ""

    onMount( async()=>{
        for (let i in musics()){
            if (parseInt(i)%2 != 0){
                document.querySelector("li:nth-child("+(parseInt(i)+1)+")").style.background = "rgba(0,0,0,0.3)"
            }
        }
    });

    function play(song){
        SetCurrent(song);
        document.getElementById("ap").play();
    }

    function ShowAction(Event){
        const s = Event.target.style;
        if (listing()==0){
            SetListing(1);
            s.transform = "rotate(90deg)";
        }
        else if (listing()==1){
            SetListing(0);
            s.transform = "rotate(0deg)";
        }
    }

    function next_s(){
        const songs_list = musics();
        for (let i in songs_list){
            if (songs_list[i] == current()){
                SetCurrent(musics()[parseInt(i)+1]);
                break
            }
        }
    }
    function back_s(){
        const songs_list = musics();
        for (let i in songs_list){
            if (songs_list[i] == current()){
                SetCurrent(musics()[parseInt(i)-1]);
                break
            }
        }
    }

    function themer(){
        const color = document.querySelector(":root")
        switch (theme()){
            case 0:
                color.style.setProperty("--c1", "#455d7a");
                color.style.setProperty("--c2", "#a2a8d3");
                color.style.setProperty("--m2", "#f95959");
                SetTheme(1);
                break;
            case 1:
                color.style.setProperty("--c1", "#a393eb");
                color.style.setProperty("--c2", "#5e63b6");
                color.style.setProperty("--m2", "#f5c7f7");
                SetTheme(2);
                break;
            case 2:
                color.style.setProperty("--c1", "#5b446a");
                color.style.setProperty("--c2", "purple");
                color.style.setProperty("--m2", "black");
                SetTheme(3);
                break;
            case 3:
                color.style.setProperty("--c1", "rgb(80, 64, 109)");
                color.style.setProperty("--c2", "rgb(69, 162, 95)");
                color.style.setProperty("--m2", "rgb(80, 64, 109)");
                SetTheme(0);
                break;
        }
    }

    // ▼ ►
    return(
        <div class="music">
            <div class="songs">
                <div class="show">
                    <div class="theme" onclick={themer}>
                        <div></div>
                        <div></div>
                    </div>
                    <Icon onclick={ShowAction} path={bars_3}/>
                </div>
                <ol onLoad={()=>console.log("nigga")} class={listing()==0 ? "none" : "containerwin"}>
                    <For each={musics()}>
                        {
                            (song)=> <li class="win" onclick={[play, song]}>
                                <img src={server+"/cover/"+song.split(".")[0]+".jpg"} alt="" />
                                <p>{song.split(".")[0]}</p>
                            </li>
                        }
                    </For>
                </ol>
            </div>
            <Player al={current() ? server+"/music/"+current() : ""} next={next_s} back={back_s} ml={musics}/>
        </div>
    )
}

export default Music