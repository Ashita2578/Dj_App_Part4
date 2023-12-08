music="";
song="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function preload()  {
music= loadSound("Shiv Tandav Stotram.mp3");
song= loadSound("English song.mp3");
}
function setup()    {
    canvas= createCanvas(600,600);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()  {
    console.log(" Pose Net has been initialized");
}
function draw() {
    image(video,0,0,500,600);
    fill('blue');
    stroke('blue');
    circle(leftWristX,leftWristY,30);
if (leftWristY> 0.2){
    numbofleftwristY= Number(leftWristY);
    remove_decimals= floor(numbofleftwristY);
    volume1 =remove_decimals/500;
    document.getElementById("label_eng").innerHTML= "Playing English song with volume "+ volume1;   
    song.setVolume(volume1);
}
if(rightWristY>0.2){
    circle(rightWristX,rightWristY,40);
    numbofRY= Number(rightWristY);
    remove_decimals= floor(numbofRY);
    hind =remove_decimals/500;
    document.getElementById("label_hind").innerHTML= "Playing energetic Stotram with volume "+ hind;   
    music.setVolume(hind);
}

}

function gotPoses(results)  {
    if (results.length >0)  {
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
    }
}