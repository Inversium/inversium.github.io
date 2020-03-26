

var days = document.querySelectorAll('tr > td.CorrectMonth, tr > div.CorrectMonth');
var d = new Date();
var num = d.getDate();
var bool = 1;

function getBrowserDimensions() {
  return {
    width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  };
}

var buildTrailer = function(date, index) {
	let iframe = document.createElement('iframe');
	iframe.src = data[date][index].YT_link;
	iframe.setAttribute('allowfullscreen', 'true');
	iframe.setAttribute('frameborder', '0');
	return iframe;
}

var buildDescription = function(date, index) {
	let div = document.createElement('div');
	let desc = document.createElement('p');
	let header = document.createElement('h1');
	desc.innerText = data[date][index].description;
	header.innerText = 'Description';
	header.classList.add('infoheader');
	div.appendChild(header);
	div.appendChild(desc);
	return div;
}

var buildDetails = function(date, index) {
	let publisher = document.createElement('p');
	let developer = document.createElement('p');
	let genres = document.createElement('p');
	let stores = document.createElement('p');
	let div = document.createElement('div');

	publisher.classList.add('publisher');
	developer.classList.add('developer');
	genres.classList.add('genres');
	stores.classList.add('stores');

	let StoreText = '<b>Store(s): </b>';
	for(let store in data[date][index].stores) {
		StoreText += '<a class="commonref" href = "' + data[date][index].stores[store] + '">' + store + '</a>' + ', ';
	}
	StoreText = StoreText.slice(0, -2);

	stores.innerHTML = StoreText;
	genres.innerHTML = '<b>Genre(s):</b> ' + data[date][index].genres;
	if(data[date][index].pub_wiki != undefined) publisher.innerHTML = '<b>Publisher: </b><a class="commonref" href ="' + data[date][index].pub_wiki + '">' + data[date][index].publisher + '</a>';	
	else publisher.innerHTML = '<b>Publisher: </b>' + data[date][index].publisher;
	if(data[date][index].dev_wiki != undefined) developer.innerHTML = '<b>Developer: </b><a class="commonref" href ="' + data[date][index].dev_wiki + '">' + data[date][index].developer + '</a>';
	else developer.innerHTML = '<b>Developer: </b>' + data[date][index].developer;

	div.appendChild(publisher);
	div.appendChild(developer);
	div.appendChild(genres);
	div.appendChild(stores);
	div.classList.add('details');
	return div;
}

var buildInfoBlock = function(date, index) {
	date = '_' + date;
	let div = document.createElement('div');
	div.classList.add('infoblock');
	let details = buildDetails(date, index);
	let description = buildDescription(date, index);
	let closebutton = document.createElement('button');
	closebutton.classList.add('closeinfo');
	closebutton.innerHTML = '<p class = "buttontext">' + 'CLOSE' + '</p>';
	closebutton.onclick = deleteInfoBlock;
	description.classList.add('description');
	if(data[date][index].YT_link != null) 
		{
			let trailer = buildTrailer(date, index);
			div.appendChild(trailer);
		}
	div.appendChild(description);
	div.appendChild(details);
	div.appendChild(closebutton);
	return div;
}

var showInfo = function() {
	let elem = document.querySelector('.checked');
	if(elem != null) elem.classList.remove('checked');
	this.classList.add('checked');
	let date = this.querySelector('.day').innerText;
	let index;

	if(this.parentNode.classList.contains('CorrectMonth')) 
		index = this.parentNode.querySelector('.checked_cell').getAttribute('data-index');
	else 
		index = 0;

	if(elem !== this) {
		let prevInfo = document.querySelector('.infoblock');
		if(prevInfo != null) document.querySelector('body').removeChild(prevInfo);		
		let infoblock = buildInfoBlock(date, index);
		document.querySelector('body').appendChild(infoblock);
	}
	
}

var createTableCell = function(release, date) {
	let cell = document.createElement('td');

	cell.style.backgroundImage = 'url(' + release.image_path + ')';
	cell.classList.add('hasRelease');
	cell.classList.add('CorrectMonth');
	cell.innerHTML = '<p class = "day">' + date + '</p>';

	let title = document.createElement('h');
	title.innerText = release.name;
	title.classList.add('game_title');
	cell.appendChild(title);

	let iconset = document.createElement('div');
	for(let logo of release.devices) {
		let img = document.createElement('img');
		img.src = 'images/logos/' + logo + '.png';
		img.height = 20;
		img.width = 20;
		img.classList.add('icon');
		img.onload = function() {
			iconset.appendChild(img);
		}
	}
	iconset.classList.add('iconset');
	cell.appendChild(iconset);

	cell.onclick = showInfo;

	return cell;
}

var deleteInfoBlock = function() {
	let infoblock = document.querySelector('.infoblock');
	document.querySelector('body').removeChild(infoblock);
	let elem = document.querySelector('.checked');
	elem.classList.remove('checked');
}

var showNewCell = function() {
	if (this.classList.contains('checked_cell')) return -1;
	this.parentNode.querySelector('.checked_cell').classList.remove('checked_cell');
	this.classList.add('checked_cell');
	let i = this.getAttribute('data-index');
	let date = '_' + this.parentNode.parentNode.querySelector('.day').innerText;
	let cell = createTableCell(data[date][i], date.slice(1));
	this.parentNode.parentNode.replaceChild(cell, this.parentNode.parentNode.querySelector('td.hasRelease'));
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

for (let day of days) {
	let date = '_' + day.innerText;

	if(data[date] == undefined) continue;

	if(data[date].length  === 1) {

		if(day.innerText >= num && bool) {
			let body = document.querySelector('body');
			body.style.backgroundImage = 'url(' + data[date][0].image_path + ')';
			bool = 0;
		}
		
		let newcell = createTableCell(data[date][0], date.slice(1));
		day.parentNode.replaceChild(newcell, day);

	}

	if(data[date].length > 1) {

		if(day.innerText >= num && bool) {
			let body = document.querySelector('body');
			body.style.backgroundImage = 'url(' + data[date][getRandomInt(data[date].length)].image_path + ')';
			bool = 0;
		}

		let radioset = document.createElement('div');
		radioset.classList.add('radioset');		
		for (var i = 0; i < data[date].length; i++) {
			let radio = document.createElement('div');
			radio.classList.add('radio');
			radio.onclick = showNewCell;
			radio.setAttribute('data-index', i);
			radioset.appendChild(radio);
		}
		radioset.firstChild.classList.add('checked_cell');

		let div = document.createElement('div');
		div.classList.add('hasRelease');
		div.classList.add('CorrectMonth');
		div.appendChild(radioset);
		div.appendChild(createTableCell(data[date][0], date.slice(1)));
		day.parentNode.replaceChild(div, day);
		
		
	}


}