// Toggle sidebar menu on mobile/tablet
document.getElementById('menu-btn').addEventListener('click', function () {
  const sidebar = document.getElementById('mySidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar.classList.contains('w3-show')) {
    sidebar.classList.remove('w3-show');
    overlay.style.display = 'none';
  } else {
    sidebar.classList.add('w3-show');
    overlay.style.display = 'block';
  }
});

document.getElementById('overlay').addEventListener('click', function () {
  document.getElementById('mySidebar').classList.remove('w3-show');
  this.style.display = 'none';
});

// Accordion toggle function (only one open at a time)
function toggleAccordion(id) {
  const acc = document.querySelectorAll('#services > div.w3-hide.w3-show');
  acc.forEach(section => {
    if (section.id !== id) section.classList.remove('w3-show');
  });

  const element = document.getElementById(id);
  if (element.classList.contains('w3-show')) {
    element.classList.remove('w3-show');
  } else {
    element.classList.add('w3-show');
  }
}
//Home Slideshow
var myIndex1 = 0;
carousel1();

function carousel1() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex1++;
  if (myIndex1 > x.length) {myIndex1 = 1}    
  // Display slide
  x[myIndex1-1].style.display = "block";  
  setTimeout(carousel1, 3000); 
}

//Staff Slideshow
var myIndex2 = 0;
carousel2();

function carousel2() {
  var i;
  var x = document.getElementsByClassName("headSlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex2++;
  if (myIndex2 > x.length) {myIndex2 = 1}    
  
  // Display slide
  x[myIndex2-1].style.display = "block";   
  setTimeout(carousel2, 5000); 
}

//Drop down
function myFunction() {
  var x = document.getElementById("Drop");
  if (x.className.indexOf("w3-show") == -1) { 
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
function myFunction1() {
  var x = document.getElementById("Drop1");
  if (x.className.indexOf("w3-show") == -1) { 
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
//mission_vision
function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("motto");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


