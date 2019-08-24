//Entry Object
//Each Section of Video Should have an entry
//Should be new Entry(string, float, float, [string]/null)

function Entry(text, startTime, endTime, child){
	this.text = text;
	this.startTime = startTime;
	this.endTime = endTime;
	this.child = child;
}
//Create an Object/Dictionary with Each Entry which can be called
var Entries = {};

Entries['OptionA'] = new Entry('Choose This', 5.881, 7.966, ['OptionC', 'OptionF']);
Entries['OptionB'] = new Entry('Choose That', 8.008, 10.302, ['OptionG', 'OptionD']);
Entries['OptionC'] = new Entry('Choose a Hat', 13.138, 15.558, ['OptionE', 'OptionI']);
Entries['OptionD'] = new Entry('Choose a Bat', 64.074, 67.494, null);
Entries['OptionE'] = new Entry('Choose Matt', 78.370, 83.960, null);
Entries['OptionF'] = new Entry('Choose Nat', 89.381, 90.966, ['OptionH', 'OptionI']);
Entries['OptionG'] = new Entry('Dopeness', 92.009, 93.969, ['OptionH', 'OptionJ']);
Entries['OptionH'] = new Entry('Awesome Choice', 100.726, 102.185, ['OptionD', 'OptionK']);
Entries['OptionI'] = new Entry('I don\'t know', 103.437, 107.190, null);
Entries['OptionJ'] = new Entry('Any Text You Want', 119.453, 122.414, null);
Entries['OptionK'] = new Entry('Cool Title Card', 137.471, 142.477, null);


$(document).ready(function () {

	var video = document.getElementById('videoclip');
	var overlay = document.getElementById('overlay');
	var playSelection = true;
	var gameOver = false;
	video.currentTime = 3;

	//First Stop
	var stop = 5;

	//Initial Options for Choices
	var selection = [Entries['OptionA'], Entries['OptionB']];
	var leftBox = document.getElementById('atext');
	var rightBox = document.getElementById('btext');

	//Gets Rid of Click Play Button
	$('#startvideo').click(function(){$(self).css('display','none');});

	//Start Stop Feature on click event.  Functions as long as playSelection is true
	$('#video-container').click(function(){

		if (video.paused && playSelection){
			overlay.style.display = "none";
			video.play();

		} else {
			video.pause();
		}
	});

	//Video Listener to check timeline position for Events
	video.addEventListener('timeupdate', function(){

			if(this.currentTime >= stop && playSelection){

				playSelection = false;
				this.pause()
		

				//Checks to see if the game is over
				if (gameOver == false){
					//Brings up Choices in Overlay
					$('#overlay').css('display', 'flex');
					$('#startvideo').css('display','none');
					$('.selection').css('display', 'block');

					//Left Choice
					leftBox.innerText = selection[0].text;

					//Left Box click Event
					$('#pathA').unbind('click').bind('click', function(e){
						console.log('click');
						video.currentTime = selection[0].startTime;
						stop = selection[0].endTime;
						playSelection = true;


						if(selection[0].child){
							var child1 = Entries[(selection[0].child[0])];
							var child2 = Entries[(selection[0].child[1])];

							selection[0] = child1;
							selection[1] = child2

	
						} else{
							gameOver = true;
						}

						$('#overlay').css('display', 'none');

					});

					//Right Choice
					rightBox.innerText = selection[1].text;

					//Right Box click Event
					$('#pathB').unbind('click').bind('click', function(e){
						console.log('click');
						video.currentTime = selection[1].startTime;
						stop = selection[1].endTime;
						playSelection = true;


						if(selection[1].child){
							var child1 = Entries[(selection[1].child[0])];
							var child2 = Entries[(selection[1].child[1])];

							selection[0] = child1;
							selection[1] = child2;

						} else{

							gameOver = true;
						}

						$('#overlay').css('display', 'none');

					});

				} else {
					$('#overlay').css('display', 'grid');
					$('#startvideo').css('display','block');
					$('.selection').css('display', 'none');
					document.getElementById('starttext').innerText = 'Game Over';

					window.addEventListener('click', function(){
						location.reload();
					});
				}
			}
		});


});