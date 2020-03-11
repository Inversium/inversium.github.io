

let days = document.querySelectorAll('#calendar td.CorrectMonth');
var d = new Date();
var num = d.getDate();
var bool = 1;

for (let day of days) {
	let date = '_' + day.innerText;

	if(data[date] == undefined) continue;

	if(data[date].length  === 1) {

		if(day.innerText >= num && bool) {
			let body = document.querySelector('body');
			body.style.backgroundImage = 'url(' + data[date][0].image_path + ')';
			bool = 0;
		}

		day.style.backgroundImage = 'url(' + data[date][0].image_path + ')';
		day.classList.add('hasRelease');
			
		let title = document.createElement('h');
		title.innerText = data[date][0].name;
		title.classList.add('game_title');
		day.appendChild(title);

		let div = document.createElement('div');
		div.classList.add('iconset');
		day.appendChild(div);

		for(let logo of data[date][0].devices) {
			let img = document.createElement('img');
			img.src = 'images/logos/' + logo + '.png';
			img.height = 20;
			img.width = 20;
			img.classList.add('icon');
			img.onload = function() {
				day.querySelector('.iconset').appendChild(img);
			}
		}
	}

	if(data[date].length === 2) {

		if(day.innerText >= num && bool) {
			let body = document.querySelector('body');
			body.style.backgroundImage = 'url(' + data[date][0].image_path + ')';
			bool = 0;
		}

		day.style.backgroundImage = 'url(' + data[date][0].image_path + ')';

		prev = day.previousElementSibling;
		day.classList.add('FirstRelease');
		day.classList.add('hasRelease');
		let iconset = document.createElement('div');
		iconset.classList.add('iconset');


		for(let logo of data[date][0].devices) {
			let img = document.createElement('img');
			img.src = 'images/logos/' + logo + '.png';
			img.height = 20;
			img.width = 20;
			img.classList.add('icon');
			iconset.style.visibility = "hidden";
			img.onload = function() {
				iconset.appendChild(img);
			}
		}		
		iconset.style.transition = "all .3s ease-in-out";
		day.appendChild(iconset);

		let title = document.createElement('h');
		title.innerText = data[date][0].name;
		title.classList.add('game_title');
		title.style.visibility = "hidden";
		title.style.transition = "all .3s ease-in-out";
		day.appendChild(title);

		day.onmouseover = function(event) {
			day.querySelector('.iconset').style.visibility = "visible";
			day.querySelector('.iconset').style.transform = "translateX(0px)";
			day.querySelector('.iconset').style.opacity = "1";	
			day.querySelector('.game_title').style.visibility = "visible";
			day.querySelector('.game_title').style.transform = "translateX(0px)";
			day.querySelector('.game_title').style.opacity = "1";
		};

		day.onmouseout = function(event) {
			day.querySelector('.iconset').style.visibility = "hidden";
			day.querySelector('.iconset').style.transform = "translateX(-25px)";
			day.querySelector('.iconset').style.opacity = "0";
			day.querySelector('.game_title').style.visibility = "hidden";
			day.querySelector('.game_title').style.transform = "translateX(-25px)";
			day.querySelector('.game_title').style.opacity = "0";
		};


		let td = document.createElement('td');
		td.innerHTML = '<p class = "day">' + date.slice(1) + '</p>';
		td.classList.add('CorrectMonth');
		td.classList.add('SecondRelease');
		td.classList.add('hasRelease');
		td.style.backgroundImage = 'url(' + data[date][1].image_path + ')';
		let iconset1 = document.createElement('div');
		iconset1.classList.add('iconset');
		
		for(let logo of data[date][1].devices) {
			let img = document.createElement('img');
			img.src = 'images/logos/' + logo + '.png';
			img.height = 20;
			img.width = 20;
			img.classList.add('icon');
			iconset1.style.visibility = "hidden";
			img.onload = function() {
				iconset1.appendChild(img);
			}
		}
		iconset1.style.transition = "all .3s ease-in-out";
		td.appendChild(iconset1);

		let title1 = document.createElement('h');
		title1.innerText = data[date][1].name;
		title1.classList.add('game_title');
		title1.style.visibility = "hidden";
		title1.style.transition = "all .3s ease-in-out";
		td.appendChild(title1);

		td.onmouseover = function(event) {
			td.querySelector('.iconset').style.visibility = "visible";
			td.querySelector('.iconset').style.transform = "translateX(0px)";
			td.querySelector('.iconset').style.opacity = "1";
			td.querySelector('.game_title').style.visibility = "visible";
			td.querySelector('.game_title').style.transform = "translateX(0px)";
			td.querySelector('.game_title').style.opacity = "1";
		};

		td.onmouseout = function(event) {
			td.querySelector('.iconset').style.visibility = "hidden";
			td.querySelector('.iconset').style.transform = "translateX(-25px)";
			td.querySelector('.iconset').style.opacity = "0";
			td.querySelector('.game_title').style.visibility = "hidden";
			td.querySelector('.game_title').style.transform = "translateX(-25px)";
			td.querySelector('.game_title').style.opacity = "0";
		};

		let div = document.createElement('div');
		div.classList.add('CorrectMonth');
		div.classList.add('hasRelease')
		div.appendChild(day);
		div.appendChild(td);		
		prev.insertAdjacentElement('afterend', div);
	}


}