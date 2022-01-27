const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');

const music=document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');
//ARRAY OF OBJECTS OF SONGS
const songs=[
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Jacinto Desgin'
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army(Remix)',
        artist:'Jacinto Desgin'
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight Disco Queen',
        artist:'Jacinto Desgin'
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Metric/Jacinto Desgin'
    }
];

//Play
let isplay=false;

function playSong(){
    isplay=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

//pause
function pauseSong(){
    isplay=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

//play or pause event listener
playBtn.addEventListener('click',()=>(isplay?pauseSong():playSong()));

//update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    //template string -always enclosed in backticks with the variable part
    //part in the curly braces
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.name}.jpg`;
}
let songindex=0;
//function for prev song 
function prevSong(){
    songindex--;
    if(songindex<0){
        songindex=songs.length-1;
    }
    loadSong(songs[songindex]);
    playSong();
}
//function for next song 

function nextSong(){
    songindex++;
    if(songindex>songs.length-1)
    {
        songindex=0;
    }
    loadSong(songs[songindex]);
    playSong();
}


//on load select first song
loadSong(songs[songindex]);
function updateProgressBar(e){
    if(isplay){
        //by destructuring getting total duration of the song 

        const{duration,currentTime}=e.srcElement;
        // console.log(duration,currentTime);
        const progressPercent=(currentTime/duration)*100;
        progress.style.width=`${progressPercent}%`;
        const durationMinutes=Math.floor(duration/60);
        console.log(durationMinutes)
        let durationSeconds=Math.floor(duration % 60);
        if(durationSeconds<10)
        {
          durationSeconds=`0${durationSeconds}`; 
        }
        console.log(durationSeconds)
      
        //delay switching duration element to avoid NAan
        if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
        //calculate the display for currenttime
        const currentMinutes=Math.floor(currentTime/60);
        // console.log(currentMinutes)
        let currentSeconds=Math.floor(currentTime % 60);
        if(currentSeconds<10)
        {
          currentSeconds=`0${currentSeconds}`; 
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}
function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration}=music;
    music.currentTime=((clickX/width)*duration);

}

//event listeners 
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);