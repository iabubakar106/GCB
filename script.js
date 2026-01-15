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

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000); // Change image every 2 seconds
}

//SlideShow Home
var slideIndex = 1;
          showDivs(slideIndex);

          function plusDivs(n) {
            showDivs(slideIndex += n);
          }

          function currentDiv(n) {
            showDivs(slideIndex = n);
          }

          function showDivs(n) {
            var i;
            var x = document.getElementsByClassName("mySlide");
            var dots = document.getElementsByClassName("demo");
            if (n > x.length) {slideIndex = 1}    
            if (n < 1) {slideIndex = x.length}
            for (i = 0; i < x.length; i++) {
              x[i].style.display = "none";  
            }
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" w3-theme-d4", "");
            }
            x[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " w3-theme-d4";
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

